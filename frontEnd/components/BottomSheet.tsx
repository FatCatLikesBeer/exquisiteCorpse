import React, { useCallback, useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BS = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => { console.log("handleSheetChanges", index); }, []);
  const showSheet = () => { bottomSheetRef.current?.expand() };
  const dismissSheet = () => { bottomSheetRef.current?.collapse(); };

  const arrayOfSnapPoints = useMemo(() => { return ["10%", "93%"] }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.existingContent}>
          <Text style={{ color: "grey" }} onPress={showSheet}>Existing Content</Text>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={arrayOfSnapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <Text style={{ color: "grey" }}>Bottom Sheet Content</Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

// const styles = StyleSheet.create({
//   buttonContainer: {
//     backgroundColor: 'linen',
//     position: "absolute",
//     right: 50,
//     top: 500,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'salmon',
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 16,
//     alignItems: 'center',
//     backgroundColor: 'darkgrey'
//   },
//   AndroidSafeAreaView: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  existingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

export default BS;
