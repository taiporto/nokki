import { Circle } from "tamagui";
import { Image, ImageProps } from "expo-image";
import { Pressable } from "react-native";

const sizes = {
  small: {
    size: 60,
    padding: 12,
  },
  medium: {
    size: 90,
    padding: 16,
  },
};

type CollectionIconProps = {
  imageUrl: string;
  imagePlaceholder?: string;
  size?: "small" | "medium";
  onPress?: () => void;
  border?: boolean;
} & ImageProps;

export const CollectionIcon = ({
  imageUrl,
  imagePlaceholder,
  size = "medium",
  onPress,
  border,
  ...imageProps
}: CollectionIconProps) => {
  return (
    <Pressable disabled={onPress === undefined}>
      <Circle
        borderWidth={border ? 0.8 : 0}
        borderColor="$neutral500"
        backgroundColor="$offwhite"
        padding={sizes[size]["padding"]}
        width={sizes[size]["size"]}
        height={sizes[size]["size"]}
        onPress={onPress}
        pressStyle={{ opacity: onPress ? 0.6 : 1 }}
      >
        <Image
          source={imageUrl}
          placeholder={imagePlaceholder}
          style={{
            flex: 1,
            width: "100%",
          }}
          contentFit="contain"
          {...imageProps}
        />
      </Circle>
    </Pressable>
  );
};
