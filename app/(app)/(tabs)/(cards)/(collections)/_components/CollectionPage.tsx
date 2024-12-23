import { TCard, TCollection } from "../../../../../../types";
import { View } from "tamagui";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import CollectionNavigation from "../_components/Navigation";
import CollectionHeader from "./CollectionHeader";
import { CollectionCardsList } from "../_components/CollectionCardsList";
import { useLocalSearchParams } from "expo-router";

type CollectionPageProps = {
  collection: TCollection;
  collectionCards: TCard[];
  setCollectionCards: (cards: TCard[]) => void;
};

export const CollectionPage = ({
  collection,
  collectionCards,
  setCollectionCards,
}: CollectionPageProps) => {
  console.log({ collection });
  return (
    <>
      <BackgroundGradient />
      <CollectionNavigation collection={collection} />
      <View gap={52} paddingHorizontal={32}>
        <CollectionHeader collection={collection} />
        <CollectionCardsList
          cardsData={collectionCards}
          collection={collection}
          setCardsData={(newData) => setCollectionCards(newData)}
          isFavoriteCardsList={collection.id === 0}
        />
      </View>
    </>
  );
};
