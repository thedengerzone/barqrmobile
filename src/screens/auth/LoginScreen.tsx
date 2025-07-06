import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {authService} from '../../services/auth.ts';
import {AuthDataResponse} from "../../interface/auth.ts";
import {useGlobalDispatch, useGlobalState} from "../reducer/reducers.tsx";
import {CommonActions, useFocusEffect} from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const state = useGlobalState()
  const dispatch = useGlobalDispatch()
  const theme = useTheme();

  useFocusEffect(() => {
    if (state.auth.user) {
      return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BarPicker'}],
          })
      );
    }
  });

  async function handleLogin() {
    const response: AuthDataResponse = await authService.login({username, password});
    if (response.username) {
      dispatch({type: 'setUser', payload: response})
      if (response.company === null) {
        return navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Company'}],
            }))
      }
      return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BarPicker'}],
          }))
    }
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>

          <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
          />

          <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
          />

          <Button
              mode="contained"
              onPress={() => handleLogin()}
              style={styles.button}
          >
            Login
          </Button>

          <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              style={styles.linkButton}
          >
            Don't have an account? Register
          </Button>
        </Surface>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  surface: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  linkButton: {
    marginTop: 16,
  },
});

export default LoginScreen;
