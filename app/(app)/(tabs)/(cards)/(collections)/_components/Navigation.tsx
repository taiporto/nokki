import { XStack } from "tamagui";
import BackButton from "../../../../../_components/BackButton";
import IconButton from "../../../../../_components/IconButton";
import { Edit3 } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { TCollection } from "../../../../../../types";

export default function CollectionNavigation({
  collection,
}: {
  collection: TCollection;
}) {
  return (
    <XStack padding={16} justifyContent="space-between">
      <BackButton size="$1" />
      {collection.id !== 0 && (
        <IconButton
          iconElement={<Edit3 />}
          onPress={() =>
            router.navigate({
              pathname: `(app)/(tabs)/(cards)/(collections)/${collection.id}/edit`,
              params: {
                collection: JSON.stringify(collection),
              },
            })
          }
        />
      )}
    </XStack>
  );
}
