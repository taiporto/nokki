import React from "react";
import { H1, ScrollView, Text, View, XStack, YStack } from "tamagui";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TCard } from "../../../../../../types";
import { getCardById } from "../../../../../../database/controllers/card/getCards";
import BackButton from "../../../../../_components/BackButton";
import IconButton from "../../../../../_components/IconButton";
import { Star, StarFull, StarOff } from "@tamagui/lucide-icons";
import { CollectionIcon } from "../../../../../_components/CollectionIcon";
import Button from "../../../../../_components/Button";
import { updateIsFavorite } from "../../../../../../database/controllers/card/updateCard";
import Toast from "react-native-root-toast";
import useCollections from "../../_hooks/useCollections";

export default function CardPage() {
  const { collectionIcons$ } = useCollections();
  const [card, setCard] = useState<TCard>();
  const { cardId } = useLocalSearchParams<{
    cardId: string;
  }>();
  const [isFavorite, setIsFavorite] = useState<boolean>();

  const icon = isFavorite ? <StarFull size="$2" /> : <Star size="$2" />;

  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    updateIsFavorite(card?.id, newIsFavorite)
      .then(() => {
        Toast.show(
          newIsFavorite ? "Adicionado aos favoritos" : "Removido dos favoritos"
        );
        setIsFavorite(newIsFavorite);
      })
      .catch(() => {
        Toast.show("Erro ao atualizar favorito");
      });
  };

  useEffect(() => {
    getCardById(+cardId).then((card) => {
      if (!card) {
        console.error("Card not found");
        return;
      }
      setCard(card);
      setIsFavorite(card.is_favorite);
    });
  }, []);

  return card ? (
    <>
      <BackgroundGradient />
      <ScrollView padding={16} gap={40}>
        <XStack justifyContent="space-between">
          <BackButton onPress={() => router.navigate("../")} />
          <IconButton
            color="$warning"
            iconElement={icon}
            onPress={toggleFavorite}
          />
        </XStack>
        <YStack gap={100} alignItems="center" justifyContent="space-between">
          <YStack gap={4} alignItems="center" justifyContent="center">
            <CollectionIcon
              imageUrl={collectionIcons$.get()[card.collection_id!] as string}
            />
            <YStack gap={32} alignItems="center" justifyContent="center">
              <H1 fontSize="$6" fontWeight={500}>
                {card?.title}
              </H1>
              <Text
                paddingHorizontal={20}
                fontSize={52}
                lineHeight={56}
                textAlign="center"
                fontFamily="DarkerGrotesque-Medium"
              >
                {card?.content}
              </Text>
            </YStack>
          </YStack>
          <Button
            onPress={() =>
              router.replace({
                pathname: `(app)/(tabs)/(cards)/card/${cardId}/edit`,
                params: {
                  card: JSON.stringify(card),
                },
              })
            }
          >
            Editar cartão
          </Button>
        </YStack>
      </ScrollView>
    </>
  ) : (
    <>Loading</>
  );
}
