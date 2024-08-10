import { collectionIcons } from "../assets/collection_icons";

export const extractPlaceholderFromIconUrl = (iconUrl: string): string => {
  const iconUrlParts = iconUrl.split("/");
  const iconFileName = iconUrlParts[iconUrlParts.length - 1];
  const iconFileNameParts = iconFileName.split(".");
  const iconFileNameWithoutExtension = iconFileNameParts[0];

  return collectionIcons[
    iconFileNameWithoutExtension as keyof typeof collectionIcons
  ].blurHash;
};
