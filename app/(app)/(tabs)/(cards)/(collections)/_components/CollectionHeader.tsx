import { View, XStack } from "tamagui";
import PageTitle from "../../../../../_components/PageTitle";
import { extractPlaceholderFromIconUrl } from "../../../../../../utils/extractPlaceholderFromIconUrl";
import { TCollection } from "../../../../../../types";
import { CollectionIcon } from "../../../../../_components/CollectionIcon";

export default function CollectionHeader({
  collection,
}: {
  collection: TCollection;
}) {
  return (
    <View gap={12}>
      <XStack justifyContent="space-between" gap={2}>
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
  );
}
