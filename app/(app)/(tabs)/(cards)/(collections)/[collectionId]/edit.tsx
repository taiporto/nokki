import { Form, ScrollView, Spinner, Stack, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { router, useLocalSearchParams } from "expo-router";
import { TCollection } from "../../../../../../types";

import Button from "../../../../../_components/Button";
import Input from "../../../../../_components/Input";
import TextArea from "../../../../../_components/TextArea";
import PageTitle from "../../../../../_components/PageTitle";
import { IconChooser } from "../../../../../_components/IconChooser";
import { useState } from "react";
import { collectionIcons } from "../../../../../../assets/collection_icons";
import { useAuth } from "../../../../../../auth/context";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import Toast from "react-native-root-toast";
import BackgroundGradient from "../../../../../_components/BackgroundGradient";
import BackButton from "../../../../../_components/BackButton";
import { updateCollection } from "../../../../../../database/controllers/collection/updateCollection";
type InputTypes = Pick<TCollection, "name" | "description">;

export default function EditCollection() {
  const { collectionId, collection: initialCollection } =
    useLocalSearchParams();
  const [collection] = useState<TCollection>(
    JSON.parse(initialCollection as string)
  );
  const { control, handleSubmit } = useForm<InputTypes>({
    defaultValues: {
      name: collection.name,
      description: collection.description,
    },
  });
  const [loading, setLoading] = useState(false);

  const [icon, setIcon] = useState(
    collectionIcons[
      `Illustration-${Object.values(collectionIcons).findIndex(
        (icon) => icon.url === collection.icon
      )}` as keyof typeof collectionIcons
    ]
  );

  const { user } = useAuth();

  const onSubmit: SubmitHandler<InputTypes> = async (data: InputTypes) => {
    setLoading(true);
    const finalData = { ...data, icon: icon.url, user_uuid: user?.id };
    const result = await updateCollection(+collectionId, finalData);
    if (!result) {
      console.error("Failed to create collection");
      Toast.show("Erro ao criar coleção");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace(`(tabs)/(cards)/(collections)/${collectionId}`);
  };

  return (
    <>
      <BackgroundGradient />
      <ScrollView automaticallyAdjustKeyboardInsets>
        <View padding={16} onPress={() => Keyboard.dismiss()}>
          <BackButton size="$1" alignSelf="flex-start" />
          <Stack paddingHorizontal={20} gap={42}>
            <PageTitle
              size="small"
              title="Edite a sua coleção"
              subtitle="Seus próximos cartões poderão ser guardados nessa coleção."
            />
            <IconChooser setIcon={setIcon} icon={icon} />
            <KeyboardAvoidingView>
              <Form onSubmit={handleSubmit(onSubmit)} gap={24}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Nome da coleção"
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea
                      placeholder="Descrição da coleção"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value ?? ""}
                    />
                  )}
                />
                <Form.Trigger marginTop={16} asChild>
                  <Button icon={loading ? <Spinner /> : undefined}>
                    Salvar edição da coleção
                  </Button>
                </Form.Trigger>
              </Form>
            </KeyboardAvoidingView>
          </Stack>
        </View>
      </ScrollView>
    </>
  );
}
