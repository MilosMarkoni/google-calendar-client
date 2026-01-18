import { makeAutoObservable } from 'mobx';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';

export class SessionStore {
  session: Session | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  async initialize() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    this.setSession(session);
    this.setLoading(false);

    supabase.auth.onAuthStateChange((_event, session) => {
      this.setSession(session);
    });
  }

  setSession(session: Session | null) {
    this.session = session;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  get isAuthenticated() {
    return this.session !== null;
  }
}
