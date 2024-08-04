import { Dialog, H2, Image, View } from "tamagui";
import Button from "../Button";
import { X } from "@tamagui/lucide-icons";

export const IconChooser = () => {
  return (
    <Dialog modal>
      <View>
        <H2>Escolha um ícone para a sua coleção</H2>
        <Dialog.Trigger asChild>
          <Image
            source={require("../../../assets/collection_icons/Illustration-38.png")}
          />
        </Dialog.Trigger>
      </View>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Escolha o ícone</Dialog.Title>
          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={<X />}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
