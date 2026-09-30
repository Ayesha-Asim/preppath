import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  is_admin: boolean;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
};

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  async function loadProfile(userId?: string) {
    const id = userId ?? user?.id;
    if (!id) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, avatar_url, is_admin")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Failed to load profile:", error);
        setProfile(null);
        return;
      }

      setProfile(
        data
          ? {
              id: data.id,
              name: data.name ?? null,
              email: data.email ?? null,
              avatar_url: data.avatar_url ?? null,
              is_admin: data.is_admin === true,
            }
          : null
      );
    } catch (error) {
      console.error("Unexpected profile error:", error);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }

  async function refreshProfile() {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    await loadProfile(user.id);
  }

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!mounted) return;

        if (error) {
          console.error("Failed to get authentication session:", error);
          setUser(null);
          setProfile(null);
          return;
        }

        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await loadProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (nextUser) {
        void loadProfile(nextUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile?.is_admin === true;

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, profileLoading, isAdmin, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
