import type { Session } from "@supabase/supabase-js";

export interface User {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
  };
}

// export interface Session {
//   access_token: string;
//   expires_at: number;
//   expires_in: number;
//   refresh_token: string;
//   token_type: string;
//   user: User;
//   weakly_password: boolean;
// }

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface BlogState {
  blogs: Blog[];
  userBlogs: Blog[];
  currentBlog: Blog | null;
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}


export interface CreateBlogInput {
  title: string;
  content: string;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
}

export interface FetchBlogsParams {
  page?: number;
  limit?: number;
}

export interface UpdateBlogParams {
  id: string;
  updates: UpdateBlogInput;
}