"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { rpc, sb } from "@/lib/supabase";
import type { MyStats } from "@/lib/types";

type Ctx = { ready: boolean; session: Session | null; stats: MyStats; refresh: () => Promise<void> };
const AuthCtx = createContext<Ctx>({ ready: false, session: null, stats: null, refresh: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [stats, setStats] = useState<MyStats>(null);

  const refresh = useCallback(async () => {
    try { setStats(await rpc<MyStats>("my_stats")); } catch { setStats(null); }
  }, []);

  useEffect(() => {
    const client = sb();
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = client.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (session) refresh(); else setStats(null);
  }, [ready, session, refresh]);

  return <AuthCtx.Provider value={{ ready, session, stats, refresh }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
