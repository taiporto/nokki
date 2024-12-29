import React, { useEffect, useState } from "react";
import { TableNames, TCard, TCollection } from "../../../../../../types";
import { View } from "tamagui";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import CollectionNavigation from "../_components/Navigation";
import CollectionHeader from "./CollectionHeader";
import { CollectionCardsList } from "../_components/CollectionCardsList";
import { router, useLocalSearchParams } from "expo-router";
import Button from "../../../../../_components/Button";
import { Plus } from "@tamagui/lucide-icons";
import { Computed, useObservable } from "@legendapp/state/react";
import { syncedDatabase } from "../../../../../../lib/legend-state";
import { syncState } from "@legendapp/state";

export const CollectionPage = ({ collection }: { collection: TCollection }) => {
  const { collectionId } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  console.log(collection);

  const cards$ = useObservable(
    syncedDatabase({
      collection: TableNames.CARDS,
      select: (from) => {
        if (collection.id === 0) {
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

  return (
    <>
      <BackgroundGradient />
      <CollectionNavigation collection={collection} />
      <View gap={52} paddingHorizontal={32}>
        <CollectionHeader collection={collection} />
        <Computed>
          {() => (
            <CollectionCardsList
              collection={collection}
              refreshing={refreshing}
              setRefreshing={setRefreshing}
              deleteCard={deleteCard}
              cards={Object.values(cards$.get()) as unknown as TCard[]}
              isFavoriteCardsList={collection.id === 0}
            />
          )}
        </Computed>
      </View>
      <Computed>
        {() =>
          collection.id !== 0 && (
            <View position="absolute" right={16} bottom={32}>
              <Button
                icon={<Plus />}
                borderRadius={100}
                onPress={() => router.navigate("/createCard")}
              >
                Criar cartão
              </Button>
            </View>
          )
        }
      </Computed>
    </>
  );
};
