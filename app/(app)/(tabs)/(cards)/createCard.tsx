import { useLocalSearchParams } from "expo-router";
import {
  Adapt,
  Form,
  Label,
  Select,
  Sheet,
  Switch,
  View,
  XStack,
  YStack,
} from "tamagui";
import Input from "../../../_components/Input";
import BackgroundGradient from "../../../_components/BackgroundGradient";
import BackButton from "../../../_components/BackButton";
import PageTitle from "../../../_components/PageTitle";
import { Check, ChevronUp } from "@tamagui/lucide-icons";
import { useEffect, useMemo, useState } from "react";
import { getAllCollections } from "../../../../database/controllers/collection/getCollections";
import { Collection } from "../../../../types";
import TextArea from "../../../_components/TextArea";
import Button from "../../../_components/Button";

export default function createCard() {
  const { collectionId, collectionName } = useLocalSearchParams();
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    getAllCollections().then((collections) => {
      setCollections(collections);
    });
  }, []);

  return (
    <>
      <BackgroundGradient />
      <View>
        <BackButton />
        <PageTitle
          title="Crie um novo cartão"
          subtitle="Todo cartão está associado a uma coleção e também pode ser favoritado."
        />
        <Form>
          <Input placeholder="Título do cartão" />
          <TextArea placeholder="Conteúdo do cartão" />
          <Select defaultValue={collectionId as string}>
            <Select.Trigger>
              <Select.Value placeholder="Coleção" />
            </Select.Trigger>
            <Adapt platform="touch">
              <Sheet
                // native={!!props.native}
                modal
                dismissOnSnapToBottom
                animationConfig={{
                  type: "spring",
                  damping: 20,
                  mass: 1.2,
                  stiffness: 250,
                }}
              >
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>
              <Select.Viewport>
                <Select.Group>
                  <Select.Label>Coleções</Select.Label>
                  {useMemo(
                    () =>
                      collections.map((collection, index) => {
                        return (
                          <Select.Item
                            index={index}
                            key={collection.name}
                            value={String(collection.id)}
                          >
                            <Select.ItemText>{collection.name}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                              <Check size={16} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      }),
                    [collections]
                  )}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
          <XStack>
            <Label>Adicionar aos favoritos</Label>
            <Switch size={"$2"}>
              <Switch.Thumb animation="quicker" />
            </Switch>
          </XStack>
          <Form.Trigger asChild>
            <Button>Criar cartão</Button>
          </Form.Trigger>
        </Form>
      </View>
    </>
  );
}
