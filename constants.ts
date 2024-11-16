import { collectionIcons } from "./assets/collection_icons";
import { TCollection } from "./types";

export const FAVORITES_COLLECTION: Omit<TCollection, "user_uuid"> = {
  id: 0,
  name: "Favoritos",
  description: "Todos os seus cards favoritados",
  icon: collectionIcons["Illustration-38"].url,
  created_at: new Date().toISOString(),
  uuid: "",
};
