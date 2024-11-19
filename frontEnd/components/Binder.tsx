// Binder.tsx

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { FAB } from 'react-native-paper';

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
      let carbonCopy = [...sheets]; // This is here just to create multiple sheets
      carbonCopy.push(result);
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      setSheets(carbonCopy);
    };

    getSheets();
  }, []); // This array needs to be empty so it runs only once on load...

  return (
    <View>
      <ScrollView>
        <View style={styles.binderContainer}>
          {sheets.length == 0 ? <ActivityIndicator size="large" color="rgb(120, 69, 172)" /> : sheets.map((sheet) => {
            let generatedKey = keyUniquizer(sheet[3].id);
            return <SheetContainer key={generatedKey} sheet={sheet} />
          })}
        </View>
      </ScrollView>
      <FAB icon='plus' style={styles.fab} onPress={() => alert("Binder.tsx: FAB PRESSED")} mode='elevated' />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  binderContainer: {
    margin: 16,
  },
});

export default Binder;
