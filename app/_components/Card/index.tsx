import { router } from "expo-router";
import {
  Card as TamaguiCard,
  CardProps as TamaguiCardProps,
  H2,
  Text,
  YStack,
} from "tamagui";
import { TCollection, TCard } from "../../../types";
import { Image } from "expo-image";
import { extractPlaceholderFromIconUrl } from "../../../utils/extractPlaceholderFromIconUrl";

export const Card = ({
  card,
  collectionIcon,
  ...cardProps
}: {
  card: Pick<TCard, "id" | "title" | "content">;
  collectionIcon: TCollection["icon"];
} & TamaguiCardProps) => {
  return (
    <TamaguiCard
      bordered
      width={"100%"}
      padding={12}
      paddingTop={16}
      borderRadius={8}
      onPress={() =>
        router.push({
          pathname: `card/${card.id}`,
          params: {
            collectionIcon,
          },
        })
      }
      gap={12}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      pressStyle={{ opacity: 0.6 }}
      {...cardProps}
    >
      <Image
        source={collectionIcon}
        style={{
          width: 40,
          height: 40,
        }}
        placeholder={extractPlaceholderFromIconUrl(collectionIcon)}
        contentFit="contain"
      />
      <YStack>
        <H2 fontSize="$5" lineHeight={"$3"}>
          {card.title}
        </H2>
        <Text textOverflow="ellipsis" fontSize="$2">
          {card.content}
        </Text>
      </YStack>
    </TamaguiCard>
  );
};
