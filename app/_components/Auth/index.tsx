import React, { useEffect, useState } from "react";
import { AppState } from "react-native";
import { Button, Form, Input, Spinner, View } from "tamagui";
import { makeRedirectUri } from "expo-auth-session";
import supabase from "../../../lib/supabase";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const redirectTo = makeRedirectUri();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off"
  );

  const onSubmit = async () => {
    setStatus("submitting");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error(error);
      setStatus("off");
      return;
    }

    setStatus("submitted");
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
    <View padding={30}>
      <Form onSubmit={onSubmit}>
        <Input value={email} onChangeText={(text: string) => setEmail(text)} />
        <Form.Trigger disabled={status !== "off"} asChild>
          <Button icon={status === "submitting" ? <Spinner /> : undefined}>
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </View>
  );
}
