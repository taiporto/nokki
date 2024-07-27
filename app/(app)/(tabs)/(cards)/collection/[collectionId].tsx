import { useLocalSearchParams } from "expo-router";
import { getCollectionById } from "../../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../../types";
import { Text } from "tamagui";

export default function CollectionPage() {
  const [collection, setCollection] = useState<Collection>();
  const { collectionId } = useLocalSearchParams();

  useEffect(() => {
    getCollectionById(+collectionId!).then((collection) => {
      if (!collection) {
        console.error("Collection not found");
        return;
      }
      setCollection(collection);
    });
  }, [collectionId]);

  if (!collection) return <Text>Collection not found</Text>;

  return <Text>Collection {collection.name}</Text>;
}
