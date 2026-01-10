import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signUp, signIn, signOut, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, session, loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleSignUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      return dispatch(signUp({ email, password, fullName })).unwrap();
    },
    [dispatch]
  );

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      return dispatch(signIn({ email, password })).unwrap();
    },
    [dispatch]
  );

  const handleSignOut = useCallback(async () => {
    return dispatch(signOut()).unwrap();
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    clearError: clearAuthError,
  };
};
