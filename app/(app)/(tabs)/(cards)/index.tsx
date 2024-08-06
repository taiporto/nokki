import { View, Text, Stack, Card, XStack } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { getAllCollections } from "../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../types";
import { EmptyState } from "../../../_components/EmptyState";
import BackgroundGradient from "../../../_components/BackgroundGradient";
import { CollectionCard } from "../../../_components/CollectionCard";
import Button from "../../../_components/Button";
import Link from "../../../_components/Link";

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
        <View flex={1} alignItems="flex-start" justifyContent="center">
          <Stack width="100%" alignItems="center" justifyContent="center">
            {collections ? (
              <XStack flexWrap="wrap">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
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
        <Link href="/createCollection" asChild>
          <Button
            position="absolute"
            right={0}
            bottom={0}
            icon={<Plus />}
            borderRadius={100}
          >
            Criar coleção
          </Button>
        </Link>
      </View>
    </>
  );
}
