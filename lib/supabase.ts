import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { mmkvAuthStorageConfig } from "./mmkv";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  {
    auth: {
      storage: mmkvAuthStorageConfig,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
