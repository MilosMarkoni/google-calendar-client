import { makeAutoObservable, reaction, action, runInAction } from 'mobx';
import { getCalendarEventsAPI, createCalendarEventAPI } from '../config/api';
import type { RootStore } from './rootStore';

export class CalendarStore {
  range: number = 1;
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

    // Specific case for 1 day, end date will be the same day, other cases are covered
    this.endDate.setDate(this.endDate.getDate() + this.range - 1);
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
    const groupedEventsByDay = events.reduce((acc, event) => {
      const date = new Date(event.start?.dateTime || event.start?.date);
      const day = date.toISOString().split('T')[0];
      acc[day] = acc[day] || [];
      acc[day].push(event);
      return acc;
    }, {});

    let noEventsDays: { [key: string]: any[] } = {};

    // // if the start date is not Monday, add ghost days for the previous days
    for (let i = 1; i < this.startDate.getDay(); i++) {
      const previousDay = new Date(this.startDate);
      previousDay.setDate(previousDay.getDate() - i);
      noEventsDays[previousDay.toISOString().split('T')[0]] = [] as any[];
    }

    // add ghost days for the in between days if there are no events
    for (let i = 1; i <= this.range; i++) {
      const possibleGhostDay = new Date(this.startDate);
      possibleGhostDay.setDate(possibleGhostDay.getDate() + i);
      if (!groupedEventsByDay[possibleGhostDay.toISOString().split('T')[0]]) {
        noEventsDays[possibleGhostDay.toISOString().split('T')[0]] = [] as any[];
      }
    }

    const calendarEvents: { [key: string]: any[] } = { ...groupedEventsByDay, ...noEventsDays };
    // sort calendar events by date
    const sortedCalendarEvents = Object.fromEntries(
      Object.entries(calendarEvents).sort((a: any, b: any) => new Date(a[0]).getTime() - new Date(b[0]).getTime()),
    );

    this.calendarEvents = sortedCalendarEvents as unknown as any[];
  };

  fetchCalendarEvents = action(async () => {
    if (!this.rootStore.sessionStore.session?.provider_token && !this.rootStore.sessionStore.loading) {
      this.setCalendarEvents([]);
      return;
    }

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
          this.setCalendarEvents(response.items);
        });
      } else {
        runInAction(() => {
          this.setCalendarEvents([]);
        });
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      this.setCalendarEvents([]);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  });

  setRange = (range: number) => {
    this.range = range;

    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + this.range - 1);
    this.endDate.setHours(23, 59, 59, 999);

    this.fetchCalendarEvents();
  };

  createEvent = action(async (summary: string, startDateTime: string, endDateTime: string) => {
    try {
      const providerToken = this.rootStore.sessionStore.session?.provider_token;
      if (!providerToken) {
        throw new Error('No provider token available');
      }

      const eventData = {
        summary,
        start: {
          dateTime: startDateTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endDateTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      await createCalendarEventAPI(providerToken, eventData);

      await this.fetchCalendarEvents();
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  });
}
