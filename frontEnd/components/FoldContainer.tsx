import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';

function FoldContainer({ fold }) {
  const [textIsPressed, setTextIsPressed] = useState(false);

  const handlePress = () => {
    setTextIsPressed(!textIsPressed);
    console.log("Open info modal?");
  }

  return (
    <Text
      style={[styles.text, textIsPressed && styles.pressedText]}
      onPress={handlePress}>
      {fold.content}
    </Text>
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
