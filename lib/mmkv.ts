import { MMKV } from "react-native-mmkv";

const authStorage = new MMKV({ id: "supabase-storage" });

export const mmkvAuthStorageConfig = {
  setItem: (key: any, data: any) => authStorage.set(key, data),
  getItem: (key: any): string => authStorage.getString(key) || "",
  removeItem: (key: any) => authStorage.delete(key),
};
