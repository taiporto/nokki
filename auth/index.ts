import supabase from "../lib/supabase";

export const getSession = supabase.auth.getSession;
export const onAuthStateChange = supabase.auth.onAuthStateChange;
export const signInWithOtp = supabase.auth.signInWithOtp;
export const startAutoRefresh = supabase.auth.startAutoRefresh;
export const stopAutoRefresh = supabase.auth.stopAutoRefresh;

export const auth = {
  getSession,
  onAuthStateChange,
  signInWithOtp,
  startAutoRefresh,
  stopAutoRefresh,
};
