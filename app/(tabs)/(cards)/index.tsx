import {
  View,
  Text,
  Stack,
  Card,
  XStack,
  ScrollView,
  Separator,
} from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { getAllCollections } from "../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { TCollection } from "../../../types";
import { EmptyState } from "../../_components/EmptyState";
import BackgroundGradient from "../../_components/BackgroundGradient";
import { CollectionCard } from "../../_components/CollectionCard";
import Button from "../../_components/Button";
import { router } from "expo-router";
import { collectionIcons } from "../../../assets/collection_icons";
import { FlatList, Keyboard } from "react-native";

export default function AllCollections() {
  const [collections, setCollections] = useState<TCollection[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllCollections().then((collections) => {
      if (!collections) {
        return;
      }
      setCollections(collections);
    });
  }, []);

  // set up this useEffect
  useEffect(() => {
    if (refreshing) {
      // do your heavy or asynchronous data fetching & update your state
      getAllCollections().then((collections) => {
        if (!collections) {
          return;
        }
        setCollections(collections);
      });
      // set the refreshing back to false
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <>
      <BackgroundGradient />
      <View height="100%" width="100%" onPress={Keyboard.dismiss}>
        <View
          paddingVertical={24}
          paddingHorizontal={32}
          flex={1}
          alignItems="flex-start"
        >
          <CollectionCard
            width={"100%"}
            collection={{
              id: 0,
              name: "Favoritos",
              icon: collectionIcons["Illustration-38"].url,
            }}
          />
          <Separator
            marginVertical={24}
            height={2}
            backgroundColor={"$neutral1000"}
            width={"100%"}
          />
          <Stack width="100%" alignItems="center" justifyContent="center">
            <FlatList
              style={{ width: "100%", gap: 16 }}
              horizontal={false}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={collections}
              renderItem={({ item }) => <CollectionCard collection={item} />}
              keyExtractor={(item) => item.id.toString()}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
              ItemSeparatorComponent={() => <View height={12} />}
              ListEmptyComponent={
                <View marginVertical="auto">
                  <EmptyState
                    topText="Não tem nenhuma coleção aqui..."
                    bottomText="Que tal criar uma?"
                    button={{
                      text: "Criar coleção",
                      href: "/createCollection",
                      icon: Plus,
                    }}
                  />
                </View>
              }
            />
          </Stack>
        </View>
        <View position="absolute" right={16} bottom={32}>
          <Button
            icon={<Plus />}
            borderRadius={100}
            onPress={() => router.push("/createCollection")}
          >
            Criar coleção
          </Button>
        </View>
      </View>
    </>
  );
}
