import { router, useLocalSearchParams } from "expo-router";
import {
  Form,
  Label,
  ScrollView,
  Spinner,
  Switch,
  View,
  XStack,
} from "tamagui";
import Input from "../../../../../_components/Input";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import BackButton from "../../../../../_components/BackButton";
import PageTitle from "../../../../../_components/PageTitle";
import { useEffect, useState } from "react";
import { getAllCollections } from "../../../../../../database/controllers/collection/getCollections";
import { TCard, TCollection } from "../../../../../../types";
import TextArea from "../../../../../_components/TextArea";
import Button from "../../../../../_components/Button";
import { Select } from "../../../../../_components/Select";
import { Keyboard } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../../../../../auth/context";
import Toast from "react-native-root-toast";
import { updateCard } from "../../../../../../database/controllers/card/updateCard";

type InputTypes = Pick<TCard, "title" | "content">;

export default function EditCard() {
  const { cardId, card: cardInfo } = useLocalSearchParams();
  const [collections, setCollections] = useState<TCollection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    +JSON.parse(cardInfo as string).collection_id
  );
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [card] = useState<TCard>(JSON.parse(cardInfo as string));

  const { control, handleSubmit } = useForm<InputTypes>({
    defaultValues: {
      title: card.title,
      content: card.content,
    },
  });

  useEffect(() => {
    getAllCollections().then((collections) => {
      setCollections(collections);
    });
    setIsFavorite(card.is_favorite);
  }, []);

  const onSubmit: SubmitHandler<InputTypes> = async (data: InputTypes) => {
    setLoading(true);
    const finalData = {
      ...data,
      collection_id: +selectedCollectionId,
      is_favorite: isFavorite,
    };
    const result = await updateCard(+cardId, finalData);
    if (!result) {
      console.error("Failed to edit card");
      Toast.show("Erro ao editar cartão");
      setLoading(false);
      return;
    }

    router.replace({
      pathname: `(tabs)/(cards)/card/${cardId}`,
      params: {
        collectionIcon: collections.find(
          (collection) => collection.id === selectedCollectionId
        )?.icon,
      },
    });
  };

  return (
    <>
      <BackgroundGradient />
      <ScrollView automaticallyAdjustKeyboardInsets>
        <BackButton size="$1" alignSelf="flex-start" />
        <View
          paddingVertical={16}
          paddingHorizontal={36}
          onPress={() => Keyboard.dismiss()}
        >
          <PageTitle
            size="small"
            title="Edite o cartão"
            subtitle="Todo cartão está associado a uma coleção e também pode ser favoritado."
          />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            marginTop={32}
            gap={24}
            width="100%"
          >
            <Controller
              name="title"
              control={control}
              defaultValue={card?.title}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Título do cartão"
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              defaultValue={card?.content}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value ?? ""}
                  placeholder="Conteúdo do cartão"
                />
              )}
            />
            <Select
              title="Coleções"
              values={collections}
              defaultValue={"" + card.collection_id}
              onValueChange={(value) => setSelectedCollectionId(+value)}
            />
            <XStack justifyContent="space-between">
              <Label>Adicionar aos favoritos</Label>
              <Switch
                size={"$2"}
                native
                checked={isFavorite}
                onCheckedChange={() => setIsFavorite(!isFavorite)}
              >
                <Switch.Thumb animation="quicker" />
              </Switch>
            </XStack>
            <Form.Trigger asChild>
              <Button icon={loading ? <Spinner /> : undefined}>
                Salvar edição
              </Button>
            </Form.Trigger>
          </Form>
        </View>
      </ScrollView>
    </>
  );
}