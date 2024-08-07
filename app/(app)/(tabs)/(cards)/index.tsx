import { View, Text, Stack, Card, XStack, ScrollView } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { getAllCollections } from "../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../types";
import { EmptyState } from "../../../_components/EmptyState";
import BackgroundGradient from "../../../_components/BackgroundGradient";
import { CollectionCard } from "../../../_components/CollectionCard";
import Button from "../../../_components/Button";
import Link from "../../../_components/Link";
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
      <View height="100%" width="100%">
        <ScrollView>
          <View flex={1} alignItems="flex-start" justifyContent="center">
            <Stack width="100%" alignItems="center" justifyContent="center">
              {collections ? (
                <XStack flexWrap="wrap">
                  {collections.map((collection) => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                    />
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
        </ScrollView>
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
