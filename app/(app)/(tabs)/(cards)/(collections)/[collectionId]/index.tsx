import { router, useLocalSearchParams } from "expo-router";
import { getCollectionById } from "../../../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { TCard, TCollection } from "../../../../../../types";
import { Text, View, XStack } from "tamagui";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import PageTitle from "../../../../../_components/PageTitle";
import { CollectionIcon } from "../../../../../_components/CollectionIcon";
import { extractPlaceholderFromIconUrl } from "../../../../../../utils/extractPlaceholderFromIconUrl";
import BackButton from "../../../../../_components/BackButton";
import { EmptyState } from "../../../../../_components/EmptyState";
import { Edit3, Plus } from "@tamagui/lucide-icons";
import {
  getCardsByCollectionId,
  getFavoriteCards,
} from "../../../../../../database/controllers/collection/getCards";
import { Card } from "../../../../../_components/Card";
import { FlatList } from "react-native";
import IconButton from "../../../../../_components/IconButton";

export default function CollectionPage() {
  const [collection, setCollection] = useState<TCollection>();
  const [collectionCards, setCollectionCards] = useState<TCard[]>();
  const [refreshing, setRefreshing] = useState(false);
  const { collectionId } = useLocalSearchParams();

  useEffect(() => {
    if (+collectionId === 0) {
      getFavoriteCards().then((cards) => {
        if (!cards) {
          console.error("Cards not found");
          return;
        }
        setCollectionCards(cards);
      });
    } else {
      getCollectionById(+collectionId).then((collection) => {
        if (!collection) {
          console.error("Collection not found");
          return;
        }
        setCollection(collection);
      });
    }
  }, [collectionId]);

  useEffect(() => {
    getCardsByCollectionId(+collectionId).then((cards) => {
      if (!cards) {
        console.error("Cards not found");
        return;
      }
      console.log(cards);
      setCollectionCards(cards);
    });
  }, [collection]);

  useEffect(() => {
    if (refreshing) {
      getCardsByCollectionId(+collectionId).then((cards) => {
        if (!cards) {
          console.error("Cards not found");
          return;
        }
        setCollectionCards(cards);
      });
      setRefreshing(false);
    }
  }, [refreshing]);

  if (+collectionId === 0) return <Text>Favorites</Text>;
  if (!collection) return <Text>Collection not found</Text>;

  console.log(collectionCards);

  return (
    <>
      <BackgroundGradient />
      <XStack padding={16} justifyContent="space-between">
        <BackButton size="$1" />
        <IconButton
          iconElement={<Edit3 />}
          onPress={() =>
            router.push(`(app)/(cards)/(collections)/${collectionId}/edit`)
          }
        />
      </XStack>
      <View gap={52} paddingHorizontal={32}>
        <View gap={12}>
          <XStack justifyContent="space-between">
            <PageTitle
              size="small"
              title={collection.name}
              subtitle={collection.description ?? ""}
            />
            <CollectionIcon
              imageUrl={collection.icon}
              placeholder={extractPlaceholderFromIconUrl(collection.icon)}
            />
          </XStack>
        </View>
        <FlatList
          style={{ width: "100%", gap: 16 }}
          data={collectionCards}
          renderItem={({ item }) => (
            <Card card={item} collectionIcon={collection.icon} />
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
                  router.push({
                    pathname: "/(app)/(tabs)/(cards)/createCard",
                    params: {
                      collectionId,
                      collectionName: collection.name,
                    },
                  });
                },
                icon: Plus,
              }}
            />
          }
        />
      </View>
    </>
  );
}
