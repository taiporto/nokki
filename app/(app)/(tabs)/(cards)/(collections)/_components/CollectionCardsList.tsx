import { SwipeListView } from "react-native-swipe-list-view";
import { TCard, TCollection } from "../../../../../../types";
import { Card } from "../../../../../_components/Card";
import { useEffect, useState } from "react";
import { EmptyState } from "../../../../../_components/EmptyState";
import { router, useLocalSearchParams } from "expo-router";
import { Plus, Trash } from "@tamagui/lucide-icons";
import { AlertDialog, View, XStack, YStack } from "tamagui";
import {
  getCardsByCollectionId,
  getFavoriteCards,
} from "../../../../../../database/controllers/card/getCards";
import Button from "../../../../../_components/Button";

export const CollectionCardsList = ({
  cardsData,
  setCardsData,
  deleteCard,
  collection,
  isFavoriteCardsList,
}: {
  cardsData: TCard[];
  setCardsData: (cards: TCard[]) => void;
  deleteCard: (cardId: TCard["id"]) => void;
  collection: TCollection;
  isFavoriteCardsList: boolean;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { collectionIcons: paramCollectionIcons } = useLocalSearchParams();
  const collectionsIcons =
    paramCollectionIcons && Object.keys(paramCollectionIcons).length > 0
      ? new Map<TCollection["id"], TCollection["icon"]>(
          JSON.parse(paramCollectionIcons as string)
        )
      : new Map();

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
    <SwipeListView
      disableRightSwipe
      rightOpenValue={-64}
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
      renderHiddenItem={(data) => (
        <AlertDialog native>
          <AlertDialog.Trigger asChild>
            <View
              pressStyle={{ opacity: 0.9 }}
              borderRadius={8}
              paddingRight={16}
              alignSelf="center"
              width={"99%"}
              height={"100%"}
              backgroundColor="$negative"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Trash size="$2" color="$offwhite" />
            </View>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <AlertDialog.Content
              bordered
              elevate
              key="content"
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack>
                <AlertDialog.Title>Confirmar deleção</AlertDialog.Title>
                <AlertDialog.Description>
                  Você realmente quer deletar esse cartão? Ele não pode ser
                  recuperado depois.
                </AlertDialog.Description>

                <XStack gap="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      onPress={() => {
                        deleteCard(data.item.id);
                      }}
                      theme="danger"
                    >
                      Deletar
                    </Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
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
