import React, { useEffect, useState } from "react";
import { Form, Image, Spinner, Stack } from "tamagui";
import supabase from "../lib/supabase";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundGradient from "./_components/BackgroundGradient";

import Logo from "../assets/logo.png";
import Input from "./_components/Input";
import Button from "./_components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const onSubmit = async () => {
    setStatus("submitting");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setStatus("off");
      return;
    }

    setStatus("submitted");
    router.push("(tabs)");
  };

  useEffect(() => {
    if (status === "submitting") {
      const timer = setTimeout(() => setStatus("off"), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <>
      <BackgroundGradient />
      <SafeAreaView>
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingTop={110}
          gap={110}
        >
          <Image height={50} resizeMode="contain" source={Logo} />
          <Stack
            gap={48}
            alignItems="center"
            justifyContent="center"
            maxWidth={288}
            width="70%"
          >
            <Form onSubmit={onSubmit} width="100%" gap={24}>
              <Input
                value={email}
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
              />
              <Input
                value={password}
                placeholder="Senha"
                onChangeText={(text: string) => setPassword(text)}
                secureTextEntry
              />
              <Form.Trigger asChild>
                <Button
                  icon={status === "submitting" ? <Spinner /> : undefined}
                >
                  Entrar
                </Button>
              </Form.Trigger>
            </Form>
            <Link href="/signup">Não tenho cadastro</Link>
          </Stack>
        </Stack>
      </SafeAreaView>
    </>
  );
}
