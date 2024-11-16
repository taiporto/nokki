import { FlatList } from "react-native";
import { TCard, TCollection } from "../../../../../../types";
import { Card } from "../../../../../_components/Card";
import { useEffect, useState } from "react";
import { EmptyState } from "../../../../../_components/EmptyState";
import { router, useLocalSearchParams } from "expo-router";
import { Plus } from "@tamagui/lucide-icons";
import { View } from "tamagui";
import {
  getCardsByCollectionId,
  getFavoriteCards,
} from "../../../../../../database/controllers/card/getCards";

export const CollectionCardsList = ({
  cardsData,
  setCardsData,
  collection,
  isFavoriteCardsList,
}: {
  cardsData?: TCard[];
  setCardsData?: (cards: TCard[]) => void;
  collection: TCollection;
  isFavoriteCardsList: boolean;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { collectionIcons: paramCollectionIcons } = useLocalSearchParams();
  const collectionsIcons = new Map<TCollection["id"], TCollection["icon"]>(
    JSON.parse(paramCollectionIcons as string)
  );

  useEffect(() => {
    if (refreshing) {
      if (isFavoriteCardsList) {
        getFavoriteCards().then((cards) => {
          if (!cards) {
            console.error("Cards not found");
            return;
          }
          setCardsData?.(cards);
        });
      } else {
        getCardsByCollectionId(collection.id).then((cards) => {
          if (!cards) {
            console.error("Cards not found");
            return;
          }
          setCardsData?.(cards);
        });
      }
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <FlatList
      style={{ width: "100%", gap: 16 }}
      data={cardsData}
      renderItem={({ item }) => (
        <Card
          card={item}
          collectionIcon={
            isFavoriteCardsList
              ? collectionsIcons.get(item.collection_id!) ?? ""
              : collection.icon
          }
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      ItemSeparatorComponent={() => <View height={12} />}
      ListEmptyComponent={
        <EmptyState
          topText="Sua coleção está vazia..."
          bottomText="Que tal criar um cartão nela?"
          button={{
            text: "Criar cartão",
            action: () => {
              router.navigate({
                pathname: "/(app)/(tabs)/(cards)/createCard",
                params: {
                  collectionId: collection.id,
                  collectionName: collection.name,
                },
              });
            },
            icon: Plus,
          }}
        />
      }
    />
  );
};
