import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Button, Divider, Menu, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {userService} from "../../services/user.ts";
import {User} from "../../interface/user.ts";
import {useGlobalState} from "../reducer/reducers.tsx";
import {CommonActions} from "@react-navigation/native";

const ChangePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const state = useGlobalState()

  async function changePassword() {
    const response: User = await userService.changePassword({
      username: state.auth.user?.username,
      password
    });
    if (response) {
      navigation.dispatch(
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
          <Text variant="headlineMedium" style={styles.title}>Change password</Text>
          <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              keyboardType="visible-password"
              style={styles.input}
          />

          <Button
              mode="contained"
              onPress={() => changePassword()}
              style={styles.button}
          >
            Change
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
  hintText: {
    marginBottom: 4,
    color: 'gray',
    fontSize: 12,
  },
});

export default ChangePasswordScreen;
