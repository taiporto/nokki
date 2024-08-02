import { LinearGradient } from "expo-linear-gradient";

export default function BackgroundGradient() {
  return (
    <LinearGradient
      colors={[
        "rgba(250, 244, 255, 0.71)",
        "rgba(243, 236, 248, 0.65)",
        "rgba(243, 231, 247, 0.53)",
        "rgba(237, 203, 249, 0.23)",
      ]}
      locations={[0, 0.17, 0.32, 0.8]}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
