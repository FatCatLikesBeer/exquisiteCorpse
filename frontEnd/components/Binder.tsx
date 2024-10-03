import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      carbonCopy = [...carbonCopy, ...carbonCopy];
      setSheets(carbonCopy);
    };

    getSheets();
  }, []); // This array needs to be empty so it runs only once...

  return (
    <ScrollView>
      <View style={styles.scrollViewContainer}>
        {sheets.length == 0 ? <ActivityIndicator size="large" color="linen" /> : sheets.map((sheet) => { return <SheetContainer key={sheet[3].id} sheet={sheet} /> })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sheetContainer: {
  }
});

export default Binder;
