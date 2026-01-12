import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export const selectIsOwnBlog = createSelector(
  [
    (state: RootState) => state.blog.currentBlog,
    (state: RootState) => state.auth.user,
  ],
  (currentBlog, user): boolean =>
    currentBlog?.user_id === user?.id
);
