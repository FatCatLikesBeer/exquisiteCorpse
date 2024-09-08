import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import Credits from './components/Credits';

import { fetchPrompt } from './functions/fetchPromp';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const ADMIN_USERANME = process.env.EXPO_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD;
const USER1_USERNAME = process.env.EXPO_PUBLIC_USER1_USERNAME;
const USER1_PASSWORD = process.env.EXPO_PUBLIC_USER1_PASSWORD;
const USER2_USERNAME = process.env.EXPO_PUBLIC_USER2_USERNAME;
const USER2_PASSWORD = process.env.EXPO_PUBLIC_USER2_PASSWORD;

const pb = new PocketBase(URL);

function App() {
  const [content, setContent] = useState({ content: "nothing here!" });

  const FetchStuff = (props: any) => {

    const handleClick = async () => {
      // await pb.admins.authWithPassword('itisbilly@icloud.com', 'DORIC-MADAM-kloof-biter-VAPER');
      // await pb.collection('users').authWithPassword('trilby_rasher.04@icloud.com', 'greenbottle');
      await pb.collection('users').authWithPassword(USER2_USERNAME, USER2_PASSWORD);
      setContent(await fetchPrompt(pb));
    }

    return (
      <View>
        <Button title="Click me!" onPress={handleClick}></Button>
        <Text>{props.bdy.content}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 12 }}>App!</Text>
      <FetchStuff bdy={content} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 5,
  },
});

export default App;
