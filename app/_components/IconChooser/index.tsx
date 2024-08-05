import { Dialog, H2, Button, ScrollView, View, XStack, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { collectionIcons } from "../../../assets/collection_icons";
import { CollectionIcon } from "../CollectionIcon";
import { Dispatch, SetStateAction, useState } from "react";
import { Icon } from "./types";

type IconChooserProps = {
  icon: Icon;
  setIcon: Dispatch<SetStateAction<Icon>>;
};

export const IconChooser = ({ icon, setIcon }: IconChooserProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} modal>
      <Stack
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        gap={18}
        width="80%"
      >
        <H2 fontSize="$5" textAlign="center" lineHeight="$5">
          Escolha um ícone para a sua coleção
        </H2>
        <Dialog.Trigger onPress={() => setIsModalOpen(true)}>
          <CollectionIcon imageUrl={icon.url} />
        </Dialog.Trigger>
      </Stack>
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
          gap="$5"
          width={"90%"}
          maxHeight={"80%"}
        >
          <Dialog.Title fontSize="$5" lineHeight="$4">
            Escolha o ícone
          </Dialog.Title>
          <ScrollView width="100%" alignSelf="center">
            <XStack width="100%" flexWrap="wrap" gap={12} alignSelf="center">
              {collectionIcons &&
                Object.entries(collectionIcons).map(([imageKey, image]) => (
                  <CollectionIcon
                    size="small"
                    key={imageKey}
                    imageUrl={image.url}
                    imagePlaceholder={image.blurHash}
                    onPress={() => {
                      setIcon(image);
                      setIsModalOpen(false);
                    }}
                  />
                ))}
            </XStack>
          </ScrollView>
          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$4"
              right="$3"
              size="$2"
              circular
              icon={<X />}
              onPress={() => setIsModalOpen(false)}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
