// Binder.tsx
// When pressing FAB, WriteComponent keyboard should be selected

import React, { useEffect, useState, useCallback, useRef, useMemo, useContext } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { fetchSheets } from '../functions/fetchSheets';
import SheetContainer from './SheetContainer';
import WriteContainer from './WriteContainer';

const Binder = () => {
  const [sheets, setSheets] = useState<any>([]);
  const [focusWriteInput, setFocusWriteInput] = useState<boolean>(false);
  const writeComponentRef = useRef<BottomSheet>(null);
  const paperTheme = useTheme();

  const showWrite = () => {
    writeComponentRef.current?.expand();
    setFocusWriteInput(!focusWriteInput);
  };
  const hideWrite = () => { writeComponentRef.current?.close() };
  const writeComponentBottomSheetSnapPoints = useMemo(() => { return ["100"] }, []);
  const handleSheetChanges = useCallback((index: number) => { }, []);

  useEffect(() => {
    async function getSheets() {
      const result = await fetchSheets();
      let carbonCopy = [...sheets]; // This is here just to create multiple sheets
      carbonCopy.push(result);
      setSheets(carbonCopy);
    };

    getSheets();
  }, []); // This array needs to be empty so it runs only once on load...

  return (
    <GestureHandlerRootView style={styles.gestureHandlerContainer}>
      <ScrollView>
        <View style={styles.binderContainer}>
          {sheets.length == 0 ? <ActivityIndicator size="large" color="rgb(120, 69, 172)" /> :
            sheets.map((sheet: any) => {
              let generatedKey = keyUniquizer(sheet[3].id);
              return <SheetContainer key={generatedKey} sheet={sheet} />
            })}
        </View>
      </ScrollView>
      {
        sheets.length != 0 &&
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={showWrite}
          mode='elevated'
          variant='secondary'
        />
      }
      <BottomSheet
        ref={writeComponentRef}
        snapPoints={writeComponentBottomSheetSnapPoints}
        onChange={handleSheetChanges}
        index={-1}
        backgroundStyle={{ backgroundColor: !paperTheme.mode ? "white" : "black" }}
        handleIndicatorStyle={{ backgroundColor: paperTheme.colors.onBackground }}
        keyboardBehavior='extend'
      >
        <BottomSheetView>
          <WriteContainer closeSheet={writeComponentRef.current?.close} focusKeyboardState={focusWriteInput} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  binderContainer: {
    margin: 16,
  },
});

function keyUniquizer(key: string) {
  const range: number = 10;
  let result = key;
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  result = result + Math.floor(Math.random() * range).toString();
  return result;
}

export default Binder;
