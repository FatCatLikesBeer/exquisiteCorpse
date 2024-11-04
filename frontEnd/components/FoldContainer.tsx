import React, { useState, useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Modal } from 'react-native-paper';

import { LightModeContext } from "./context/LightModeContext";
import { FontFamilyContext, FontOptions } from "./context/FontFamilyContext";

function FoldContainer({ fold }) {
  const [textIsPressed, setTextIsPressed] = useState(false);
  const { parsedTheme } = useContext(LightModeContext);
  const selectedFontFamily = useContext(FontFamilyContext);

  const handleLongPress = () => {
    setTextIsPressed(!textIsPressed);
    if (textIsPressed == false) { console.log("Open info modal?") }
  }

  const handlePress = () => {
    if (textIsPressed) { setTextIsPressed(!textIsPressed) }
  }

  return (
    <Text
      style={[{ fontFamily: selectedFontFamily }, styles.text, { "color": parsedTheme.colors.text }, textIsPressed && styles.pressedText]}
      onLongPress={handleLongPress} onPress={handlePress}>{fold.content} </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 18,
  },
  pressedText: {
    // color: "rgb(120, 69, 172)",
    backgroundColor: "rgb(240, 219, 255)",
    opacity: 0.6,
  }
});

export default FoldContainer;
