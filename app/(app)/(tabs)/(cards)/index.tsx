import { View, Text, Stack, Card, XStack } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { getAllCollections } from "../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../types";
import { EmptyState } from "../../../_components/EmptyState";
import BackgroundGradient from "../../../_components/BackgroundGradient";
import { router } from "expo-router";

export default function AllCollections() {
  const [collections, setCollections] = useState<Collection[] | null>(null);

  useEffect(() => {
    getAllCollections().then((collections) => {
      if (!collections) {
        return;
      }
      setCollections(collections);
    });
  }, []);

  return (
    <>
      <BackgroundGradient />
      <View flex={1} alignItems="flex-start" justifyContent="center">
        <Stack width="100%" alignItems="center" justifyContent="center">
          {collections ? (
            <XStack flexWrap="wrap">
              {collections.map((collection) => (
                <Card
                  key={collection.id}
                  padding={16}
                  onPress={() => router.push(`collection/${collection.id}`)}
                >
                  <Text>{collection.name}</Text>
                </Card>
              ))}
            </XStack>
          ) : (
            <EmptyState
              topText="Não tem nenhuma coleção aqui..."
              bottomText="Que tal criar uma?"
              button={{
                text: "Criar coleção",
                href: "/createCollection",
                icon: Plus,
              }}
            />
          )}
        </Stack>
      </View>
    </>
  );
}
