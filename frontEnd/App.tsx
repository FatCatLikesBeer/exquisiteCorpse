import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import Credits from './components/Credits';

const url: string = 'http://free.local:8082/apiv0/'

function App() {
  const Send = () => {
    const [request, setRequest] = useState("Click the button to interact!");
    const [inputData, setInputData] = useState("");
    const [getResponse, setGetResponse] = useState("");
    const [postBody, setPostBody] = useState("");
    const [postTitle, setPostTitle] = useState("");

    const [resultTitle, setResultTitle] = useState("Nothing here");
    const [resultBody, setResultBody] = useState("Really empty");

    const handlePOST = () => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
        }),
      })
        .then(response => response.json())
        .then((data) => {
          setRequest(data.message);
          setResultTitle(data.data.title);
          setResultBody(data.data.body);
        });
    }

    const handleGET = () => {
      const appendedUrl = url + inputData;
      fetch(appendedUrl)
        .then(response => response.json())
        .then(data => setGetResponse(data.message));
    }

    return (
      <View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button onPress={handleGET} title="Click to GET!" />
          <Text>{getResponse}</Text>
          <TextInput
            style={styles.input}
            placeholder="Send something to Echo!"
            onChangeText={setInputData}
            value={inputData}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button onPress={handlePOST} title="Click to POST!" />
          <Text style={{ paddingBottom: 8, paddingTop: 8 }}>{request}</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={setPostTitle}
            value={postTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Body"
            onChangeText={setPostBody}
            value={postBody}
          />
          <Text>{resultTitle}</Text>
          <Text>{resultBody}</Text>
        </View>
        <Credits />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 12 }}>App!</Text>
      <Send />
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
