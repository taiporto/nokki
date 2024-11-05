import { router } from "expo-router";
import { Card, CardProps, H2 } from "tamagui";
import { TCollection } from "../../../types";
import { Image } from "expo-image";
import { collectionIcons } from "../../../assets/collection_icons";

export const CollectionCard = ({
  collection,
  ...cardProps
}: {
  collection: Pick<TCollection, "id" | "name" | "icon">;
} & CardProps) => {
  return (
    <Card
      bordered
      width={"48%"}
      padding={16}
      paddingTop={12}
      borderRadius={8}
      onPress={() => router.navigate(`(collections)/${collection.id}`)}
      gap={2}
      justifyContent="center"
      alignItems="center"
      pressStyle={{ opacity: 0.6 }}
      {...cardProps}
    >
      <Card.Header>
        <Image
          source={collection.icon}
          style={{
            width: 48,
            height: 48,
          }}
          placeholder={collectionIcons["Illustration-0"].blurHash}
          contentFit="contain"
        />
      </Card.Header>
      <H2 fontSize="$4" lineHeight={"$1"}>
        {collection.name}
      </H2>
    </Card>
  );
};
