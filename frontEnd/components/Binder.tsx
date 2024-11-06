import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';

import { fetchSheets } from '../functions/fetchSheets';
import SheetContainer from './SheetContainer';

function keyUniquizer(key: string) {
  const range: number = 10;
  let result = key;
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  return result;
}

const Binder = () => {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    async function getSheets() {
      const result = await fetchSheets();
      let carbonCopy = [...sheets];
      carbonCopy.push(result);
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      setSheets(carbonCopy);
    };

    getSheets();
  }, []); // This array needs to be empty so it runs only once on load...

  return (
    <ScrollView>
      <View style={styles.binderContainer}>
        {sheets.length == 0 ? <ActivityIndicator size="large" color="rgb(120, 69, 172)" /> : sheets.map((sheet) => {
          let generatedKey = keyUniquizer(sheet[3].id);
          return <SheetContainer key={generatedKey} sheet={sheet} />
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  binderContainer: {
    margin: 16,
  },
});

export default Binder;
