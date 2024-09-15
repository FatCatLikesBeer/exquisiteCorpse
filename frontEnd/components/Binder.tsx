import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

import { fetchSheets } from '../functions/fetchSheets';

const Binder = () => {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Text style={[styles.sheetContentWrapper, { fontWeight: 'bold' }]}>Binder Here</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 1</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 2</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 3</Text>
      <Text style={styles.sheetContentWrapper}>Binder Sheet 4</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 8,
  },
  sheetContentWrapper: {
    padding: 20,
    justifyContent: 'center',
    textAlign: 'center',
  }
})

export default Binder;
