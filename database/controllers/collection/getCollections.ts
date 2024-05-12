import AsyncStorage from "@react-native-async-storage/async-storage";
import { Collection } from "../../../types";

export async function getAllCollections(): Promise<Collection[]> {
  try {
    const collections = JSON.parse(
      (await AsyncStorage.getItem("@collections")) || "[]"
    );
    return collections;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCollectionById(
  collectionId: number
): Promise<Collection | null> {
  try {
    const collections = JSON.parse(
      (await AsyncStorage.getItem("@collections")) ?? "[]"
    );
    return (
      collections.find(
        (collection: Collection) => collection.id === collectionId
      ) || null
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
