import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

import FoldContainer from './FoldContainer';

function SheetContainer({ sheet }) {
  return (
    <View style={styles.container}>
      {sheet.map((fold) => { return <FoldContainer fold={fold} /> })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'salmon',
  },
});

export default SheetContainer;
