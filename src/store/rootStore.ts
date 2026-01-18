import { CalendarStore } from './CalendarStore';
import { SessionStore } from './SessionStore';

export class RootStore {
  sessionStore: SessionStore;
  calendarStore: CalendarStore;

  constructor() {
    this.sessionStore = new SessionStore();
    this.calendarStore = new CalendarStore(this);

    this.initialize();
  }

  private async initialize() {
    await this.sessionStore.initialize();
  }
}

export const rootStore = new RootStore();
