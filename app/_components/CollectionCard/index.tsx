import { router } from "expo-router";
import { Card, H2, Text } from "tamagui";
import { Collection } from "../../../types";
import { Image } from "expo-image";

export const CollectionCard = ({ collection }: { collection: Collection }) => {
  return (
    <Card
      key={collection.id}
      padding={16}
      borderRadius={8}
      onPress={() => router.push(`collection/${collection.id}`)}
      gap={2}
    >
      <Image source={{ uri: collection.icon, width: 48, height: 48 }} />
      <H2>{collection.name}</H2>
    </Card>
  );
};
