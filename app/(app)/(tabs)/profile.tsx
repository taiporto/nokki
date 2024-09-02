import React from "react";
import { Text, View } from "react-native";
import Button from "../../_components/Button";
import supabase from "../../../lib/supabase";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Profile</Text>
      <Button
        onPress={() => {
          supabase.auth.signOut();
          router.push("login");
        }}
      >
        Sair
      </Button>
    </View>
  );
}
