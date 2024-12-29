import { useObservable } from "@legendapp/state/react";
import { syncedDatabase } from "../../../../../lib/legend-state";
import { TableNames, TCard, TCollection } from "../../../../../types";
import { syncState } from "@legendapp/state";
import { useEffect, useState } from "react";

const useCollections = () => {
  const [refreshing, setRefreshing] = useState(false);

  const collections$ = useObservable(
    syncedDatabase({
      collection: TableNames.COLLECTIONS,
      select: (from) => from.select(),
      filter: (from, id) => from.eq("id", id),
      delete: (from, id) => from.update({ deleted: true }).eq("id", id),
      initial: {},
    })
  );
  const collectionIcons$ = useObservable(() => {
    const icons: Record<string, TCollection["icon"]> = {};
    Object.values(collections$.get() as Record<string, TCollection>).forEach(
      (collection) => {
        icons[collection.id] = collection.icon;
      }
    );
    return icons;
  });
  const collectionsState$ = syncState(collections$);

  const deleteCollection = (collectionId: TCollection["id"]) => {
    collections$[collectionId].delete();
    refreshCollections();
  };

  const getCollectionById = (collectionId: TCollection["id"]) => {
    return collections$[collectionId].get();
  };

  const refreshCollections = () => {
    collectionsState$.sync().then(() => setRefreshing(false));
  };

  useEffect(() => {
    if (refreshing) {
      refreshCollections();
    }
  }, [refreshing]);

  return {
    collections$,
    collectionIcons$,
    collectionsState$,
    getCollectionById,
    deleteCollection,
    refreshing,
    setRefreshing,
  };
};

export default useCollections;
