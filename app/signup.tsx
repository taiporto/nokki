import React, { useState } from "react";
import { Button, Form, Input, Spinner, View } from "tamagui";
import supabase from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const onSubmit = async () => {
    setStatus("submitting");
    const { error } = await supabase.auth.signUp({
      email,
      password,
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
    <SafeAreaView>
      <View padding={30}>
        <Form onSubmit={onSubmit}>
          <Input
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
          <Input
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
          <Form.Trigger disabled={status !== "off"} asChild>
            <Button icon={status === "submitting" ? <Spinner /> : undefined}>
              Submit
            </Button>
          </Form.Trigger>
        </Form>
      </View>
    </SafeAreaView>
  );
}
