import React from "react";
import Button from "../../../_components/Button";
import supabase from "../../../../lib/supabase";
import { router } from "expo-router";
import BackgroundGradient from "../../../_components/BackgroundGradient";
import { View, ScrollView } from "tamagui";

export default function Profile() {
  return (
    <>
      <BackgroundGradient />
      <ScrollView padding={16} gap={40}>
        <View
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <Button
            onPress={() => {
              supabase.auth.signOut();
              router.navigate("login");
            }}
          >
            Sair
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
