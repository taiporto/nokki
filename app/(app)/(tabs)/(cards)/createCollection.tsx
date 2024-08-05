import { Form, Stack, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { router } from "expo-router";
import { createCollection } from "../../../../database/controllers/collection/createCollection";
import { Collection } from "../../../../types";
import BackButton from "../../../_components/BackButton";
import BackgroundGradient from "../../../_components/BackgroundGradient";

import Button from "../../../_components/Button";
import Input from "../../../_components/Input";
import TextArea from "../../../_components/TextArea";
import PageTitle from "../../../_components/PageTitle";
import { IconChooser } from "../../../_components/IconChooser";
import { useState } from "react";
import { collectionIcons } from "../../../../assets/collection_icons";
import { useAuth } from "../../../../auth/context";
type InputTypes = Pick<Collection, "name" | "description">;

export default function CreateCollection() {
  const { control, handleSubmit } = useForm<InputTypes>();
  const [icon, setIcon] = useState(collectionIcons["Illustration-38"]);

  const { user } = useAuth();

  const onSubmit: SubmitHandler<InputTypes> = async (data: InputTypes) => {
    console.log("Entered onSubmit");
    const finalData = { ...data, icon: icon.url, user_uuid: user?.id };
    const result = await createCollection(finalData);
    if (!result) {
      console.error("Failed to create collection");
      return;
    }

    router.push(`(tabs)/(cards)/collection/${result.insertedId}`);
  };

  return (
    <>
      <BackgroundGradient />
      <View padding={16}>
        <BackButton size="$1" alignSelf="flex-start" />
        <Stack paddingHorizontal={20} gap={42}>
          <PageTitle
            size="small"
            title="Crie uma nova coleção"
            subtitle="Seus próximos cartões poderão ser guardados nessa coleção."
          />
          <IconChooser setIcon={setIcon} icon={icon} />
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
              <Button>Criar coleção</Button>
            </Form.Trigger>
          </Form>
        </Stack>
      </View>
    </>
  );
}
