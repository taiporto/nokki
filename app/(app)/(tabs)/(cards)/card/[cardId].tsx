import { H1, Text, View, XStack } from "tamagui";
import BackgroundGradient from "../../../../_components/BackgroundGradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TCard } from "../../../../../types";
import { getCardById } from "../../../../../database/controllers/collection/getCards";
import BackButton from "../../../../_components/BackButton";
import IconButton from "../../../../_components/IconButton";
import { StarOff } from "@tamagui/lucide-icons";

export default function CardPage() {
  const [card, setCard] = useState<TCard>();
  const { cardId } = useLocalSearchParams();

  useEffect(() => {
    getCardById(+cardId).then((card) => {
      if (!card) {
        console.error("Card not found");
        return;
      }
      setCard(card);
    });
  }, []);

  return (
    <>
      <BackgroundGradient />
      <View>
        <XStack justifyContent="space-between">
          <BackButton />
          <IconButton iconElement={<StarOff/>} />
        </XStack>
        <H1>{card?.title}</H1>
        <Text>{card?.content}</Text>
      </View>
    </>
  );
}
