import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";

function FoldContainer({ fold }) {
  const [textIsPressed, setTextIsPressed] = useState(false);
  const { parsedTheme } = useContext(LightModeContext);

  const handlePress = () => {
    setTextIsPressed(!textIsPressed);
    if (textIsPressed == false) { console.log("Open info modal?") }
  }

  const textColor = parsedTheme == 'light' ? "dark" : "white";

  return (
    <Text
      style={[{ "color": textColor }, textIsPressed && styles.pressedText]}
      onPress={handlePress}>{fold.content} </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  pressedText: {
    color: "red",
    opacity: 0.6,
  }
});

export default FoldContainer;
