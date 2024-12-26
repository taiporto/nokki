import React from "react";
import { TCard, TCollection } from "../../../../../../types";
import { View } from "tamagui";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import CollectionNavigation from "../_components/Navigation";
import CollectionHeader from "./CollectionHeader";
import { CollectionCardsList } from "../_components/CollectionCardsList";
import { router } from "expo-router";
import Button from "../../../../../_components/Button";
import { Plus } from "@tamagui/lucide-icons";
import { useCollectionCards } from "../[collectionId]/_hooks/useCollectionCards";

type CollectionPageProps = {
  collection: TCollection;
};

export const CollectionPage = ({ collection }: CollectionPageProps) => {
  const { collectionCards, setCollectionCards, deleteCard } =
    useCollectionCards({
      collectionId: collection.id,
    });
  return (
    <>
      <BackgroundGradient />
      <CollectionNavigation collection={collection} />
      <View gap={52} paddingHorizontal={32}>
        <CollectionHeader collection={collection} />
        <CollectionCardsList
          deleteCard={deleteCard}
          cardsData={collectionCards}
          collection={collection}
          setCardsData={(newData) => setCollectionCards(newData)}
          isFavoriteCardsList={collection.id === 0}
        />
      </View>
      {collection.id !== 0 && collectionCards.length !== 0 && (
        <View position="absolute" right={16} bottom={32}>
          <Button
            icon={<Plus />}
            borderRadius={100}
            onPress={() => router.navigate("/createCard")}
          >
            Criar cartão
          </Button>
        </View>
      )}
    </>
  );
};
