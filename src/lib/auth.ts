import { supabase } from './supabase';

export const checkAuth = async (cookies) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  if (!accessToken || !refreshToken) {
    return { isAuthenticated: false };
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: true, user: data.user };
};
