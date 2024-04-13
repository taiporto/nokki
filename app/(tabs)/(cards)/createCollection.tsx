import { Button, Form, Input, Text, TextArea, View } from "tamagui";

export default function CreateCollection() {
  const handleSubmit = () => {};

  return (
    <View>
      <Text>Create collection</Text>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="Nome da coleção" />
        <TextArea placeholder="Descrição da coleção" />
        <Form.Trigger asChild>
          <Button>Criar coleção</Button>
        </Form.Trigger>
      </Form>
    </View>
  );
}
