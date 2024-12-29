import { db } from "./../../../../../../../database/index";
import { observable } from "@legendapp/state";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { TableNames, TCard } from "../../../../../../../types";

const collectionId = 0;

const cards$ = observable(
  syncedSupabase({
    supabase: db,
    collection: TableNames.CARDS,
    select: (from) => from.select("*").eq("collection_id", collectionId),
    delete: (from, id) => from.delete().eq("id", id),
    fieldCreatedAt: "created_at",
    fieldUpdatedAt: "updated_at",
  })
);

const deleteCard = (cardId: TCard["id"]) => {
  cards$[cardId].delete();
};

const refreshCards = () => {
  return cards$.get();
};

export { cards$, deleteCard, refreshCards };
