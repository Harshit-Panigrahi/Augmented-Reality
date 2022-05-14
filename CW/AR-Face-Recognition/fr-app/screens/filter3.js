import React from "react";
import { View, Image } from "react-native";

const Filter3 = ({
  face: {
    bounds: {
      size: { width: faceWidth, height: faceHeight },
    },
    LEFT_EYE,
    RIGHT_EYE,
  },
}) => {
  const glassWidth = faceWidth;
  const glassHeight = faceHeight / 3;
  const glassAngle = (
    angleRad = Math.atan(
      (RIGHT_EYE.y - LEFT_EYE.y) / (RIGHT_EYE.x - LEFT_EYE.x)
    )
  ) => (angleRad * 180) / Math.PI;
  return (
    <View
      style={{
        position: "absolute",
        left: LEFT_EYE.x - glassWidth * 0.7,
        top: LEFT_EYE.y - glassHeight * 0.5,
      }}
    >
      <Image
        source={require("../assets/Frapp-03.png")}
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

export default Filter3;
