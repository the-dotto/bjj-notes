import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { ENV } from '~/constants/environment'
import { cookies } from 'next/headers'
import { Database } from './interfaces/database';

export class Clients {
  public forBrowser() {
    return createBrowserClient<Database>(
      ENV.supabase.url, ENV.supabase.key
    )
  };

  public forServer(cookieStore: ReturnType<typeof cookies>) {
    return createServerClient(
      ENV.supabase.url, ENV.supabase.key,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )
  }

  public forServerActions(cookieStore: ReturnType<typeof cookies>) {
    return createServerClient(
      ENV.supabase.url, ENV.supabase.key,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
  }
};
