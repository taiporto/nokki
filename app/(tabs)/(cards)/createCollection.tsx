import { Form, ScrollView, Spinner, Stack, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { router } from "expo-router";
import { createCollection } from "../../../database/controllers/collection/createCollection";
import { TCollection } from "../../../types";
import BackButton from "../../_components/BackButton";
import BackgroundGradient from "../../_components/BackgroundGradient";

import Button from "../../_components/Button";
import Input from "../../_components/Input";
import TextArea from "../../_components/TextArea";
import PageTitle from "../../_components/PageTitle";
import { IconChooser } from "../../_components/IconChooser";
import { useState } from "react";
import { collectionIcons } from "../../../assets/collection_icons";
import { useAuth } from "../../../auth/context";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import Toast from "react-native-root-toast";
type InputTypes = Pick<TCollection, "name" | "description">;

export default function CreateCollection() {
  const { control, handleSubmit } = useForm<InputTypes>();
  const [loading, setLoading] = useState(false);

  const [icon, setIcon] = useState(
    collectionIcons[
      `Illustration-${Math.floor(
        Math.random() * 40
      )}` as keyof typeof collectionIcons
    ]
  );

  const { user } = useAuth();

  const onSubmit: SubmitHandler<InputTypes> = async (data: InputTypes) => {
    console.log("Entered onSubmit");
    setLoading(true);
    const finalData = { ...data, icon: icon.url, user_uuid: user?.id };
    const result = await createCollection(finalData);
    if (!result) {
      console.error("Failed to create collection");
      Toast.show("Erro ao criar coleção");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace(`(tabs)/(cards)/(collections)/${result.insertedId}`);
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
              title="Crie uma nova coleção"
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
                    Criar coleção
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
