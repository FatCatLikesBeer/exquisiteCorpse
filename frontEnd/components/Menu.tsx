import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

const Menu = () => {
  const title = 'Title goes here';

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Text style={styles.h2}>App Title</Text>
      <Text style={styles.menuElement}>Theme</Text>
      <Text style={styles.menuElement}>Profile</Text>
      <Text style={styles.menuElement}>Read</Text>
      <Text style={styles.menuElement}>Write</Text>
      <Text style={styles.menuElement}>About</Text>
      <Text style={styles.menuElement}>Credits</Text>
      <Text style={styles.menuElement}>Get The App</Text>
      <Text style={styles.menuElement}>Menu Element 4</Text>
      <Text style={styles.menuElement}>Menu Element 1</Text>
      <Text style={styles.menuElement}>Menu Element 2</Text>
      <Text style={styles.menuElement}>Menu Element 3</Text>
      <Text style={styles.menuElement}>Menu Element 4</Text>
      <Text style={styles.menuElement}>Menu Element 1</Text>
      <Text style={styles.menuElement}>Menu Element 2</Text>
      <Text style={styles.menuElement}>Menu Element 3</Text>
      <Text style={styles.menuElement}>Menu Element 4</Text>
      <Text style={styles.menuElement}>Menu Element 1</Text>
      <Text style={styles.menuElement}>Menu Element 2</Text>
      <Text style={styles.menuElement}>Menu Element 3</Text>
      <Text style={styles.menuElement}>Menu Element 4</Text>
      <Text style={styles.menuElement}>Menu Element 1</Text>
      <Text style={styles.menuElement}>Menu Element 2</Text>
      <Text style={styles.menuElement}>Menu Element 3</Text>
      <Text style={styles.menuElement}>Menu Element 4</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  sideBar: {
    marginTop: 12,
    marginBottom: 12,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 16,
  },
  menuElement: {
    marginBottom: 8,
  }
});

export default Menu;
