import React, { useState } from "react";
import { Form, Spinner, Stack, View } from "tamagui";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Toast from "react-native-root-toast";

import BackgroundGradient from "./_components/BackgroundGradient";
import PageTitle from "./_components/PageTitle";
import Input from "./_components/Input";
import BackButton from "./_components/BackButton";
import Button from "./_components/Button";
import { PasswordInput } from "./_components/PasswordInput";
import { KeyboardAvoidingView } from "react-native";

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

    if (!firstName || !email || !password || !confirmPassword) {
      Toast.show("Preencha todos os campos.", {
        duration: Toast.durations.SHORT,
      });
      setStatus("off");
      return;
    }

    if (password !== confirmPassword) {
      Toast.show("As senhas não são iguais.", {
        duration: Toast.durations.SHORT,
      });
      setStatus("off");
      return;
    }

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
    <View height="100%">
      <BackgroundGradient />
      <SafeAreaView>
        <KeyboardAvoidingView>
          <Stack padding={16}>
            <BackButton marginTop={18} alignSelf="flex-start" size="$2" />
            <Stack paddingHorizontal={28} gap={40}>
              <PageTitle
                title="Crie sua conta"
                subtitle="Seus cartões e coleções estarão associados à sua conta."
              />
              <Form onSubmit={onSubmit} gap={32} width="100%">
                <Input
                  placeholder="Nome"
                  value={firstName}
                  onChangeText={(text: string) => setFirstName(text)}
                />
                <Input
                  placeholder="E-mail"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(text: string) => setEmail(text)}
                />
                <PasswordInput
                  placeholder="Crie uma senha"
                  value={password}
                  onChangeText={(text: string) => setPassword(text)}
                />
                <PasswordInput
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChangeText={(text: string) => setConfirmPassword(text)}
                />
                <Form.Trigger disabled={status !== "off"} asChild>
                  <Button
                    icon={status === "submitting" ? <Spinner /> : undefined}
                  >
                    Cadastrar
                  </Button>
                </Form.Trigger>
              </Form>
            </Stack>
          </Stack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
