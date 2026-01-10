import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchBlogs,
  fetchUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  setCurrentBlog,
  setCurrentPage,
  clearBlogError,
} from "../store/slices/blogSlice";
import type { Blog, CreateBlogInput, UpdateBlogInput } from "../types";

export const useBlog = () => {
  const dispatch = useAppDispatch();
  const { blogs, userBlogs, currentBlog, totalCount, currentPage, loading, error } = useAppSelector((state) => state.blog);
  
  const loadBlogs = useCallback(
    (page: number = 1, limit: number = 6) => {
      return dispatch(fetchBlogs({ page, limit })).unwrap();
    },
    [dispatch]
  );

  const loadUserBlogs = useCallback(() => {
    return dispatch(fetchUserBlogs()).unwrap();
  }, [dispatch]);

  const addBlog = useCallback(
    (blogData: CreateBlogInput) => {
      return dispatch(createBlog(blogData)).unwrap();
    },
    [dispatch]
  );

  const editBlog = useCallback(
    (id: string, updates: UpdateBlogInput) => {
      return dispatch(updateBlog({ id, updates })).unwrap();
    },
    [dispatch]
  );

  const removeBlog = useCallback(
    (id: string) => {
      return dispatch(deleteBlog(id)).unwrap();
    },
    [dispatch]
  );

  const selectBlog = useCallback(
    (blog: Blog | null) => {
      dispatch(setCurrentBlog(blog));
    },
    [dispatch]
  );

  const changePage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearBlogError());
  }, [dispatch]);

  return {
    blogs,
    userBlogs,
    currentBlog,
    totalCount,
    currentPage,
    loading,
    error,
    loadBlogs,
    loadUserBlogs,
    addBlog,
    editBlog,
    removeBlog,
    selectBlog,
    changePage,
    clearError,
  };
};
