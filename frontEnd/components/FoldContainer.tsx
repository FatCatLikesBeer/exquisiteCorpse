import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

function FoldContainer({ fold }) {
  return (
    <View style={styles.container}>
      <Text>{fold.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'salmon',
  },
});

export default FoldContainer;
