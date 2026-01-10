import {createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import supabase  from '@/utils/supabase';
import type { BlogState, Blog, CreateBlogInput, FetchBlogsParams, UpdateBlogParams } from '../../types';
import type { RootState } from '../store';

export const fetchBlogs = createAsyncThunk<
  { blogs: Blog[]; totalCount: number },
  FetchBlogsParams,
  { rejectValue: string }
>(
  'blog/fetchBlogs',
  async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return { blogs: data as Blog[], totalCount: count || 0 };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserBlogs = createAsyncThunk<
  Blog[],
  void,
  { rejectValue: string; state: RootState }
>(
  'blog/fetchUserBlogs',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { auth } = state;

      if (!auth.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('user_id', auth.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data as Blog[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk<
  Blog,
  CreateBlogInput,
  { rejectValue: string; state: RootState }
>(
  'blog/createBlog',
  async (blogData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      
      if (!auth.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert([
          {
            ...blogData,
            user_id: auth.user.id,
            author: auth.user.user_metadata.full_name || auth.user.email,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Blog;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlog = createAsyncThunk<
  Blog,
  UpdateBlogParams,
  { rejectValue: string }
>(
  'blog/updateBlog',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Blog;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'blog/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: BlogState = {
  blogs: [],
  userBlogs: [],
  currentBlog: null,
  totalCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentBlog: (state, action: PayloadAction<Blog | null>) => {
      state.currentBlog = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearBlogError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
       // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch blogs';
      })
      // Fetch User Blogs
      .addCase(fetchUserBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.userBlogs = action.payload;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user blogs';
      })
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create blog';
      })
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update blog';
      })
       // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete blog';
      });
  },
});

export const { setCurrentBlog, setCurrentPage, clearBlogError } = blogSlice.actions;
export default blogSlice.reducer;
