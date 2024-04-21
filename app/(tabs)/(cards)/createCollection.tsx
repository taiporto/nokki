import { Button, Form, Input, Text, TextArea, View } from "tamagui";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { router } from "expo-router";
import { InsertCollection } from "../../../schema";
import { createCollection } from "../../../database/controllers/collection/createCollection";

type InputTypes = Pick<InsertCollection, "name" | "description">;

export default function CreateCollection() {
  const { control, handleSubmit } = useForm<InputTypes>();

  const onSubmit: SubmitHandler<InputTypes> = (data: InputTypes) => {
    console.log("Entered onSubmit");
    const result = createCollection(data);
    console.log("Result", result);
    console.log(result.all());
    router.push(`collections/${result.insertId}`);
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
