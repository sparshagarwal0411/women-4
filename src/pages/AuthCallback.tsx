import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session) {
                navigate('/login');
                return;
            }

            // Check if profile exists and is complete
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role, business_about')
                .eq('id', session.user.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error fetching profile:', profileError);
                navigate('/profile'); // Fallback
                return;
            }

            if (!profile || !profile.role || !profile.business_about) {
                navigate('/complete-profile');
            } else {
                // Set legacy localStorage
                localStorage.setItem("userRole", profile.role);
                localStorage.setItem("username", session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User');

                if (profile.role === 'mentor') navigate('/mentor-profile');
                else if (profile.role === 'admin') navigate('/admin-profile');
                else navigate('/profile');
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
