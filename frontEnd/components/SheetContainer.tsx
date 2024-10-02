import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

import FoldContainer from './FoldContainer';

function SheetContainer({ sheet }) {
  return (
    <View style={styles.container}>
      <Text>
        {sheet.map((fold) => { return <FoldContainer key={fold.id} fold={fold} /> })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'salmon',
    marginTop: 16,
  },
});

export default SheetContainer;
