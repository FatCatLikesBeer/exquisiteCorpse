import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FoldContainer from './FoldContainer';

function keyUniquizer(key: string) {
  let result = key;
  result = result + Math.floor(Math.random() * 10).toString();
  result = result + Math.floor(Math.random() * 10).toString();
  result = result + Math.floor(Math.random() * 10).toString();
  result = result + Math.floor(Math.random() * 10).toString();
  result = result + Math.floor(Math.random() * 10).toString();
  return result;
}

function SheetContainer({ sheet }) {
  return (
    <View style={styles.container}>
      <Text>
        {sheet.map((fold) => {
          let generatedKey = keyUniquizer(fold.id);
          return <FoldContainer key={generatedKey} fold={fold} />
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16,
  },
});

export default SheetContainer;
