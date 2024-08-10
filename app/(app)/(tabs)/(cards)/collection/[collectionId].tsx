import { router, useLocalSearchParams } from "expo-router";
import { getCollectionById } from "../../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../../types";
import { Text, View, XStack } from "tamagui";
import BackgroundGradient from "../../../../_components/BackgroundGradient";
import PageTitle from "../../../../_components/PageTitle";
import { CollectionIcon } from "../../../../_components/CollectionIcon";
import { extractPlaceholderFromIconUrl } from "../../../../../utils/extractPlaceholderFromIconUrl";
import BackButton from "../../../../_components/BackButton";
import { EmptyState } from "../../../../_components/EmptyState";
import { Plus } from "@tamagui/lucide-icons";

export default function CollectionPage() {
  const [collection, setCollection] = useState<Collection>();
  // const [collectionCards, setCollectionCards] = useState<Collection[]>();
  const { collectionId } = useLocalSearchParams();

  useEffect(() => {
    if (+collectionId === 0) {
      //get favorites
      return;
    } else {
      getCollectionById(+collectionId).then((collection) => {
        if (!collection) {
          console.error("Collection not found");
          return;
        }
        setCollection(collection);
      });

      // get cards related to the collection
    }
  }, [collectionId]);

  if (+collectionId === 0) return <Text>Favorites</Text>;
  if (!collection) return <Text>Collection not found</Text>;

  return (
    <>
      <BackgroundGradient />
      <View padding={16} gap={52}>
        <View gap={12}>
          <XStack>
            <BackButton />
            {/* //inserir edit button */}
          </XStack>
          <XStack justifyContent="space-between" paddingHorizontal={24}>
            <PageTitle
              size="small"
              title={collection.name}
              subtitle={collection.description || ""}
            />
            <CollectionIcon
              imageUrl={collection.icon}
              placeholder={extractPlaceholderFromIconUrl(collection.icon)}
            />
          </XStack>
        </View>
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
      </View>
    </>
  );
}
