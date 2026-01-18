import { makeAutoObservable } from 'mobx';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';
import type { RootStore } from './rootStore';

export class SessionStore {
  session: Session | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  async initialize() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        this.setSession(session);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
    } finally {
      this.setLoading(false);
    }

    // Listen for auth state changes
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
