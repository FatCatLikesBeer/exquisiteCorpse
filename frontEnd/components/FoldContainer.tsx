import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { FontOptionsContext } from './context/FontOptions';

function FoldContainer({ fold }) {
  const [textIsPressed, setTextIsPressed] = useState(false);
  const fontOptions = useContext(FontOptionsContext);

  const handlePress = () => {
    setTextIsPressed(!textIsPressed);
    if (textIsPressed == false) { console.log("Open info modal?") }
  }

  return (
    <Text
      style={[{ color: fontOptions }, textIsPressed && styles.pressedText]}
      onPress={handlePress}>{fold.content} </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
  pressedText: {
    color: "red",
    opacity: 0.6,
  }
});

export default FoldContainer;
