import { makeAutoObservable, reaction, action, runInAction } from 'mobx';
import { getCalendarEventsAPI } from '../config/api';
import type { RootStore } from './rootStore';

export class CalendarStore {
  range: number = 7;
  startDate: Date;
  endDate: Date;
  calendarEvents: any[] = [];
  rootStore: RootStore;
  isLoading = false;

  constructor(rootStore: RootStore) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.startDate = today;

    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.range);
    this.endDate.setHours(23, 59, 59, 999);

    makeAutoObservable(this);
    this.rootStore = rootStore;

    // when session gets loaded, fetch calendar events
    reaction(
      () => ({
        providerToken: this.rootStore.sessionStore.session?.provider_token,
        loading: this.rootStore.sessionStore.loading,
      }),
      ({ providerToken, loading }) => {
        if (providerToken && !loading) {
          this.fetchCalendarEvents();
        }
      },
      { fireImmediately: true },
    );
  }

  private setCalendarEvents = (events: any[]) => {
    this.calendarEvents = events;
  };

  fetchCalendarEvents = action(async () => {
    try {
      this.isLoading = true;
      const params = new URLSearchParams({
        timeMin: this.startDate.toISOString(),
        timeMax: this.endDate.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
      });

      const response = await getCalendarEventsAPI(this.rootStore.sessionStore.session?.provider_token, params);

      if (response && response.items && Array.isArray(response.items)) {
        runInAction(() => {
          this.calendarEvents = response.items;
        });
      } else {
        runInAction(() => {
          this.calendarEvents = [];
        });
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      this.setCalendarEvents([]);
    } finally {
      this.isLoading = false;
    }
  });

  setRange = (range: number) => {
    this.range = range;
    // Update endDate to end of the day after range days
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.range);
    this.endDate.setHours(23, 59, 59, 999);

    // Refetch events when range changes
    if (this.rootStore.sessionStore.session?.provider_token && !this.rootStore.sessionStore.loading) {
      this.fetchCalendarEvents();
    }
  };
}
