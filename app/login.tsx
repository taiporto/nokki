import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spinner, View } from "tamagui";
import supabase from "../lib/supabase";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView>
      <View padding={30}>
        <Link href="/signup">Sign up</Link>
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
