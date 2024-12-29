import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { router, useLocalSearchParams } from "expo-router";
import { getCollectionById } from "../../../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { TCard, TCollection } from "../../../../../../types";
import { Text } from "tamagui";
import { CollectionPage } from "../_components/CollectionPage";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";

export default function Collection() {
  const { collectionId } = useLocalSearchParams();
  const [collection, setCollection] = useState<TCollection>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCollectionById(+collectionId).then((collection) => {
      setLoading(false);
      if (!collection) {
        console.error("Collection not found");
        return;
      }
      setCollection(collection);
    });
  }, [collectionId]);

  if (+collectionId === 0)
    return router.replace("/(app)/(tabs)/(cards)/(collections)/favorites");

  if (loading)
    return (
      <>
        <BackgroundGradient />
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 400 160"
          backgroundColor="#E8E8E9"
          foregroundColor="#F7F7F7"
        >
          <Rect x="48" y="8" rx="3" ry="3" width="88" height="40" />
        </ContentLoader>
      </>
    );
  if (!collection) return <Text>Collection not found</Text>;

  return <CollectionPage collection={collection} />;
}
