import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import supabase from "./supabase";
import { configureSynced } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export const syncedDatabase = configureSynced(syncedSupabase, {
  supabase,
  persist: {
    plugin: ObservablePersistMMKV,
  },
  changesSince: "last-sync",
  fieldCreatedAt: "created_at",
  fieldUpdatedAt: "updated_at",
  fieldDeleted: "deleted",
});
