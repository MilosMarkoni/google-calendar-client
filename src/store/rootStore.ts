import { SessionStore } from './SessionStore';

export class RootStore {
  sessionStore: SessionStore;

  constructor() {
    this.sessionStore = new SessionStore();
  }
}

export const rootStore = new RootStore();
