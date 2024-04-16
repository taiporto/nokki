import { Button, Form, Input, Text, TextArea, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { createCollection } from "../../../database/database";
import { Collection } from "../../../types";
import { router } from "expo-router";

type InputTypes = {
  name: Collection["name"];
  description: Collection["description"];
};

export default function CreateCollection() {
  const { control, handleSubmit } = useForm<InputTypes>();

  const onSubmit: SubmitHandler<InputTypes> = (data: Collection) => {
    console.log("Entered onSubmit");
    createCollection(data, (id?: number) => {
      console.log("Done creating");
      if (!id) return;
      router.push(`/collection/[${id}]`);
    });
  };

  return (
    <View>
      <Text>Criar coleção</Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
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
              value={value}
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
