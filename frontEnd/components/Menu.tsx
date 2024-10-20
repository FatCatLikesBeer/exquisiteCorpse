import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Pressable, useWindowDimensions } from 'react-native';

const Menu = () => {
  const [small, medium] = [600, 1000];
  // Less than small, menubar at the bottom
  // Between small & medium, collapsable sidebar
  // Larger than medium, left menu bar always visible
  const width = useWindowDimensions().width;

  useEffect(() => {
    console.log(width);
  }, [width])

  return (
    <View style={styles.scrollViewContainer}>
      <Text style={styles.h2}>Exquisite Corpse</Text>
      <Text style={styles.menuElement}>Read</Text>
      <Text style={styles.menuElement}>Write</Text>
      <Text style={styles.menuElement}>Profile</Text>
      <Text style={styles.menuElement}>Theme</Text>
      <Text style={styles.menuElement}>About</Text>
      <Text style={styles.menuElement}>Credits</Text>
      <Text style={styles.menuElement}>Get The App</Text>
    </View >
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: 200,
    backgroundColor: 'linen',
    padding: 8,
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

const mobileStyles = StyleSheet.create({});

export default Menu;
