import { CalendarStore } from './CalendarStore';
import { SessionStore } from './SessionStore';

export class RootStore {
  sessionStore: SessionStore;
  calendarStore: CalendarStore;
  constructor() {
    this.sessionStore = new SessionStore();
    this.calendarStore = new CalendarStore();
  }
}

export const rootStore = new RootStore();
