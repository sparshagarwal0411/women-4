import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, Profile } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null;
                throw error;
            }
            return data as Profile;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            // Set a timeout to prevent indefinite loading
            const timeoutId = setTimeout(() => {
                if (mounted && loading) {
                    console.warn('Auth initialization timed out');
                    setLoading(false);
                }
            }, 5000);

            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                if (!mounted) return;

                if (session?.user) {
                    setUser(session.user);
                    const profileData = await fetchProfile(session.user.id);
                    if (mounted) setProfile(profileData);
                } else {
                    setUser(null);
                    setProfile(null);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                clearTimeout(timeoutId);
                if (mounted) setLoading(false);
            }
        };

        initializeAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;

            if (session?.user) {
                setUser(session.user);
                if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                    const profileData = await fetchProfile(session.user.id);
                    if (mounted) setProfile(profileData);
                }
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            localStorage.clear();
            setUser(null);
            setProfile(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return React.createElement(
        AuthContext.Provider,
        { value: { user, profile, loading, signOut } },
        children
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
