import { XStack, Button } from "tamagui";
import Input, { InputProps } from "../Input";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState } from "react";

export const PasswordInput = (props: InputProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <XStack alignItems="center" justifyContent="center">
      <Input
        secureTextEntry={hidePassword}
        width={"100%"}
        paddingRight={50}
        {...props}
      />
      <Button
        position="absolute"
        right={0}
        alignItems="center"
        justifyContent="center"
        backgroundColor="transparent"
        paddingVertical={4}
        paddingHorizontal={8}
        marginHorizontal={8}
        pressStyle={{
          backgroundColor: "$neutral100",
          borderColor: "transparent",
        }}
        icon={
          hidePassword ? (
            <Eye size="$1" color="$neutral600" />
          ) : (
            <EyeOff size="$1" color="$neutral600" />
          )
        }
        onPress={() => setHidePassword((prev) => !prev)}
      />
    </XStack>
  );
};
