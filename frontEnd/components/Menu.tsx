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
    <ScrollView style={styles.scrollViewContainer}>
      <Text style={styles.h2}>App Title</Text>
      <Text style={styles.menuElement}>Theme</Text>
      <Text style={styles.menuElement}>Profile</Text>
      <Text style={styles.menuElement}>Read</Text>
      <Text style={styles.menuElement}>Write</Text>
      <Text style={styles.menuElement}>About</Text>
      <Text style={styles.menuElement}>Credits</Text>
      <Text style={styles.menuElement}>Get The App</Text>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'linen',
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
