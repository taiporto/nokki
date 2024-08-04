import { View, Text, Stack } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { getAllCollections } from "../../../../database/controllers/collection/getCollections";
import { useEffect, useState } from "react";
import { Collection } from "../../../../types";
import { EmptyState } from "../../../_components/EmptyState";
import BackgroundGradient from "../../../_components/BackgroundGradient";

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
            <View>
              <Text>THere are collectioasyncns</Text>
            </View>
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
