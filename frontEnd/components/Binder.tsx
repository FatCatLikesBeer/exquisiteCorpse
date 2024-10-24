import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
  }, []); // This array needs to be empty so it runs only once...

  return (
    <ScrollView>
      <View>
        {sheets.length == 0 ? <ActivityIndicator size="large" color="linen" /> : sheets.map((sheet) => {
          let generatedKey = keyUniquizer(sheet[3].id);
          return <SheetContainer key={generatedKey} sheet={sheet} />
        })}
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
});

export default Binder;
