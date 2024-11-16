import { router, useLocalSearchParams } from "expo-router";
import { getCollectionById } from "../../../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { TCard, TCollection } from "../../../../../../types";
import { Text } from "tamagui";
import { getCardsByCollectionId } from "../../../../../../database/controllers/card/getCards";
import { CollectionPage } from "../_components/CollectionPage";

export default function Collection() {
  const [collection, setCollection] = useState<TCollection>();
  const [collectionCards, setCollectionCards] = useState<TCard[]>([]);
  const { collectionId } = useLocalSearchParams();

  useEffect(() => {
    getCollectionById(+collectionId).then((collection) => {
      if (!collection) {
        console.error("Collection not found");
        return;
      }
      setCollection(collection);
    });
  }, [collectionId]);

  useEffect(() => {
    getCardsByCollectionId(+collectionId).then((cards) => {
      if (!cards) {
        console.error("Cards not found");
        return;
      }
      setCollectionCards(cards);
    });
  }, [collection]);

  if (+collectionId === 0)
    return router.replace("/(app)/(tabs)/(cards)/(collections)/favorites");
  if (!collection) return <Text>Collection not found</Text>;

  return (
    <CollectionPage
      collection={collection}
      collectionCards={collectionCards}
      setCollectionCards={setCollectionCards}
    />
  );
}
