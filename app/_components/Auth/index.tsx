import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spinner, View } from "tamagui";
import { makeRedirectUri } from "expo-auth-session";
import { auth } from "../../../auth";
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    auth.startAutoRefresh();
  } else {
    auth.stopAutoRefresh();
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
    const { error } = await auth.signInWithOtp({
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
    <View>
      <Form onSubmit={onSubmit}>
        <Input value={email} onChangeText={(text) => setEmail(text)} />
        <Form.Trigger disabled={status !== "off"} asChild>
          <Button icon={status === "submitting" ? <Spinner /> : undefined}>
            Submit
          </Button>
        </Form.Trigger>
      </Form>
    </View>
  );
}
