import { useLocalSearchParams } from "expo-router";

export default function Collection() {
  const { collectionId } = useLocalSearchParams();

  return <div>Collection {collectionId}</div>;
}
