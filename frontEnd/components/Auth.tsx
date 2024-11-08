import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { A } from '@expo/html-elements';
import PocketBase from 'pocketbase';
import * as emailValidator from 'email-validator';

import { SignUp } from './SignUp';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const pb = new PocketBase(URL);

function Auth(props: any) {
  const [formState, setFormState] = useState('signin');

  const changeFormState = () => {
    if (formState == 'signup') {
      setFormState('signin')
    } else {
      setFormState('signup')
    }
  }

  const SignIn = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formColor, setFormColor] = useState('#2E3F37');
    const [formErrorMessage, setFormErrorMessage] = useState('Invalid Format');
    const [fetchingLogin, setFetchingLogin] = useState(false);

    const handleClick = async () => {
      if (emailValidator.validate(email)) {
        setFormColor('#2E3F37');

        try {
          setFetchingLogin(true);
          const response = await pb.collection('users').authWithPassword(email, password);
          props.setUser(response.record);
        } catch (error) {
          console.error("Error Happened", error);
          setFormColor('red');
          setFormErrorMessage('Invalid Email or Password');
        }
        setFetchingLogin(false);
      } else {
        setFormColor('red');
        setFormErrorMessage('Invalid Email Format');
      }
    }

    return (
      <View style={styles.formContainer}>
        <Text style={styles.h2}>Sign In</Text>
        <Text style={{ color: formColor, textAlign: "center" }}>{formColor == 'red' ? formErrorMessage : ""}</Text>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="writer@site.com"
          placeholderTextColor={"silver"}
          inputMode={"email"}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={"silver"}
          secureTextEntry={true}
        />
        <Pressable
          onPress={handleClick}
          style={[styles.input, { marginTop: 24 }, styles.buttonBackground]}
        >
          <Text style={styles.buttonText}>
            <A>{fetchingLogin ? <ActivityIndicator color="gold" /> : "Sign In With Email"}</A>
          </Text>
        </Pressable>
        <Text style={[styles.switch, { textAlign: "center" }]}><A onPress={changeFormState}>Click Here to Sign Up</A></Text>
      </View>
    )
  }

  return (
    <View>
      {
        formState == 'signin'
          ?
          <SignIn setUser={props.setUser} />
          :
          <SignUp
            changeFormState={changeFormState}
            styles={styles}
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  h2: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 36,
    textAlign: 'center',
  },
  switch: {
    fontSize: 12,
    color: "darkslategrey",
    marginTop: 12,
  },
  buttonText: {
    textAlign: "center",
    color: 'gold'
  },
  buttonBackground: {
    backgroundColor: "#2E3F37",
  },
  input: {
    borderColor: '#2E3F37',
    height: 40,
    marginTop: 6,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2E3F37',
    padding: 30,
    width: 440,
  }
});

export default Auth;
