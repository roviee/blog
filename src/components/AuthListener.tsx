import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch } from '../store/hooks';
import supabase from '../utils/supabase';
import { setSession } from '../store/slices/authSlice';

interface AuthListenerProps {
  children: ReactNode;
}

export const AuthListener = ({ children }: AuthListenerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session || null));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};