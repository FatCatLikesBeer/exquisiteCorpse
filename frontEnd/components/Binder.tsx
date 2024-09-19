import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

import { fetchSheets } from '../functions/fetchSheets';
import SheetContainer from './SheetContainer';

const Binder = () => {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    async function getSheets() {
      const result = await fetchSheets();
      console.log(result);
      let carbonCopy = [...sheets];
      carbonCopy.push(result);
      setSheets(carbonCopy);
    };

    getSheets();
  }, []); // This array needs to be empty so it runs only once...

  return (
    <ScrollView style={styles.scrollViewContainer}>
      {sheets.length == 0 ? <Text>Loading...</Text> : sheets.map((sheet) => { return <SheetContainer sheet={sheet} /> })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 8,
  },
  foldWrapper: {
  }
});

export default Binder;
