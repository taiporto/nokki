import { CollectionPage } from "./_components/CollectionPage";
import { useAuth } from "../../../../../auth/context";
import { FAVORITES_COLLECTION } from "../../../../../constants";

export default function Favorites() {
  const { user } = useAuth();

  return (
    <CollectionPage
      collection={{ ...FAVORITES_COLLECTION, user_uuid: user?.id || "" }}
    />
  );
}
