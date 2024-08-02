import React, { useState } from "react";
import { Form, Label, Spinner, Stack, View } from "tamagui";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import BackgroundGradient from "./_components/BackgroundGradient";
import PageTitle from "./_components/PageTitle";
import Input from "./_components/Input";
import BackButton from "./_components/BackButton";
import Button from "./_components/Button";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const onSubmit = async () => {
    setStatus("submitting");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
        },
      },
    });

    if (error) {
      console.error(error);
      setStatus("off");
      return;
    }

    setStatus("submitted");

    router.push("/login");
  };

  return (
    <View>
      {/* <BackgroundGradient /> */}
      <SafeAreaView>
      <Stack paddingHorizontal={16}>
        <BackButton marginBottom={22} />
        <Stack
          paddingHorizontal={34}
          gap={48}
          alignItems="center"
          justifyContent="center"
        >
          <PageTitle
            title="Crie sua conta"
            subtitle="Seus cartões e coleções estarão associados à sua conta."
          />
          <Form onSubmit={onSubmit} gap={24} width="100%">
            <View>
              <Label>Nome</Label>
              <Input
                value={firstName}
                onChangeText={(text: string) => setFirstName(text)}
              />
            </View>
            <View>
              <Label>E-mail</Label>
              <Input
                placeholder="email@exemplo.com"
                value={email}
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
              />
            </View>
            <View>
              <Label>Crie uma senha</Label>
              <Input
                value={password}
                secureTextEntry
                onChangeText={(text: string) => setPassword(text)}
              />
            </View>
            <View>
              <Label>Repita a senha</Label>
              <Input
                value={confirmPassword}
                secureTextEntry
                onChangeText={(text: string) => setConfirmPassword(text)}
              />
            </View>
            <Form.Trigger disabled={status !== "off"} asChild>
              <Button icon={status === "submitting" ? <Spinner /> : undefined}>
                Cadastrar
              </Button>
            </Form.Trigger>
          </Form>
        </Stack>
      </Stack>
      </SafeAreaView>
    </View>
  );
}
