import { useObservable } from "@legendapp/state/react";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { syncedDatabase } from "../../../../../../../lib/legend-state";
import { TableNames, TCard } from "../../../../../../../types";
import { syncState } from "@legendapp/state";

const useCollectionCards = () => {
  const { collectionId } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const cards$ = useObservable(
    syncedDatabase({
      collection: TableNames.CARDS,
      select: (from) => {
        if (+collectionId === 0) {
          return from.select().eq("is_favorite", true);
        }
        return from.select().eq("collection_id", +collectionId);
      },
      delete: (from, id) => from.update({ deleted: true }).eq("id", id),
      initial: {},
    })
  );
  const cardsState$ = syncState(cards$);

  const deleteCard = (cardId: TCard["id"]) => {
    cards$[cardId].delete();
    refreshCards();
  };

  const refreshCards = () => {
    cardsState$.sync().then(() => setRefreshing(false));
  };

  useEffect(() => {
    if (refreshing) {
      refreshCards();
    }
  }, [refreshing]);

  return {
    cards$,
    cardsState$,
    deleteCard,
    refreshing,
    setRefreshing,
  };
};

export default useCollectionCards;
