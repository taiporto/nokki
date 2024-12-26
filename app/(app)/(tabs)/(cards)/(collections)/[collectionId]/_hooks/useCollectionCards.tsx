import { useEffect, useState } from "react";
import { TCard, TCollection } from "../../../../../../../types";
import { getCardsByCollectionId } from "../../../../../../../database/controllers/card/getCards";
import { deleteCardById } from "../../../../../../../database/controllers/card/deleteCard";
import Toast from "react-native-root-toast";

export const useCollectionCards = ({
  collectionId,
}: {
  collectionId: TCollection["id"];
}) => {
  const [collectionCards, setCollectionCards] = useState<TCard[]>([]);

  useEffect(() => {
    getCardsByCollectionId(collectionId).then((cards) => {
      if (!cards) {
        console.error("Cards not found");
        return;
      }
      setCollectionCards(cards);
    });
  }, [collectionId]);

  const deleteCard = (cardId: TCard["id"]) => {
    deleteCardById(cardId).then(() => {
      setCollectionCards((prev) => prev.filter((card) => card.id !== cardId));
      Toast.show("Card deletado");
    });
  };

  return {
    collectionCards,
    setCollectionCards,
    deleteCard,
  };
};
