import { Button, Form, Input, Text, TextArea, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { router } from "expo-router";
import { createCollection } from "../../../database/controllers/collection/createCollection";
import { Collection } from "../../../types";

type InputTypes = Pick<Collection, "name" | "description">;

export default function CreateCollection() {
  const { control, handleSubmit } = useForm<InputTypes>();

  const onSubmit: SubmitHandler<InputTypes> = async (data: InputTypes) => {
    console.log("Entered onSubmit");
    const result = await createCollection(data);
    if (!result) {
      console.error("Failed to create collection");
      return;
    }

    router.push(`(tabs)/(cards)/collection/${result.insertedId}`);
  };

  return (
    <View>
      <Text>Criar coleção</Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              value={value || ""}
            />
          )}
        />
        <Form.Trigger asChild>
          <Button>Criar coleção</Button>
        </Form.Trigger>
      </Form>
    </View>
  );
}
