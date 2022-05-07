import React from "react";
import {
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Platform,
  Image,
} from "react-native";

const Filter1 = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight },
    },
    leftEyePosition,
    rightEyePosition,
  },
}) => {
  const glassWidth = faceWidth;
  const glassHeight = faceHeight / 3;
  const glassAngle = (
    angleRad = Math.atan(
      (rightEyePosition.y - leftEyePosition.y) /
        (rightEyePosition.x - leftEyePosition.x)
    )
  ) => (angleRad * 180) / Math.PI;
  return (
    <View
      style={{
        position: "absolute",
        left: leftEyePosition.x - glassWidth * 0.5,
        top: leftEyePosition.y - glassHeight * 0.5,
      }}
    >
      <Image
        source={require("../assets/Frapp-02.png")}
        style={{
          width: glassWidth,
          height: glassHeight,
          resizeMode: "contain",
          transform: [{ rotate: `${glassAngle()}deg` }],
        }}
      />
    </View>
  );
};

export default Filter1;