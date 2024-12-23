import { useEffect, useState } from "react";
import { CollectionPage } from "./_components/CollectionPage";
import { TCard } from "../../../../../types";
import { getFavoriteCards } from "../../../../../database/controllers/card/getCards";
import { useAuth } from "../../../../../auth/context";
import { FAVORITES_COLLECTION } from "../../../../../constants";

export default function Favorites() {
  const [collectionCards, setCollectionCards] = useState<TCard[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    getFavoriteCards().then((cards) => {
      if (!cards) {
        console.error("Cards not found");
        return;
      }
      setCollectionCards(cards);
    });
  }, []);

  return (
    <CollectionPage
      collectionCards={collectionCards}
      setCollectionCards={setCollectionCards}
      collection={{ ...FAVORITES_COLLECTION, user_uuid: user?.id || "" }}
    />
  );
}
