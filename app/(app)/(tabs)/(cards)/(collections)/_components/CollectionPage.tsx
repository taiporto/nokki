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
import { Computed } from "@legendapp/state/react";
import useCollectionCards from "../[collectionId]/_hooks/useCollectionCards";
import { FAVORITES_COLLECTION } from "../../../../../../constants";
import { useAuth } from "../../../../../../auth/context";
import { getCollectionById } from "../../../../../../database/controllers/collection/getCollections";

export const CollectionPage = () => {
  const { user } = useAuth();
  const { collectionId } = useLocalSearchParams();
  const { refreshing, setRefreshing, deleteCard, cards$ } =
    useCollectionCards();

  const [collection, setCollection] = useState<TCollection | null>(null);

  useEffect(() => {
    if (+collectionId === 0) {
      setCollection({
        ...FAVORITES_COLLECTION,
        user_uuid: user?.id || "",
      });
    } else {
      getCollectionById(+collectionId).then((result) => {
        setCollection(result);
      });
    }
  }, [collectionId]);

  return collection ? (
    <>
      <Computed>
        {() => (
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
                    isFavoriteCardsList={+collectionId === 0}
                  />
                )}
              </Computed>
            </View>
            <Computed>
              {() =>
                +collectionId !== 0 && (
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
        )}
      </Computed>
    </>
  ) : (
    <></>
  );
};
