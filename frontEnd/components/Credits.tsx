import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { A } from '@expo/html-elements';

function Credits() {

  return (
    <View>
      <Text style={styles.title}>Credits</Text>
      <Text style={styles.span}>This app is my culminating project for <A href="http://www.theodinproject.com" style={styles.link}>The Odin Project.</A></Text>
      <Text style={styles.span}>Front end is <A href="http://www.expo.dev" target="_blank" style={styles.link}>React-Native/Expo.</A></Text>
      <Text style={styles.span}>Back end is <A href="https://nodejs.org/en" target="_blank" style={styles.link}>Node.js</A>, <A href="https://expressjs.com/" target="_blank" style={styles.link}>Express</A>, and <A href="https://supabase.com/" target="_blank" style={styles.link}>Postgres/Supabase.</A></Text>

      <Text style={styles.span}>Support</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: "serif",
    paddingTop: 12,
  },
  span: {
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
  },
  link: {
    color: "dodgerblue",
  },
})

export default Credits;
