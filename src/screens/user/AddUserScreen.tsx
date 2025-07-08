import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Button, Divider, Menu, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {userService} from "../../services/user.ts";
import {User} from "../../interface/user.ts";

const AddUserScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function createUser() {
    const response: User = await userService.create({
      username,
      password
    });
    if (response) {

      navigation.navigate('UserSettings');
    }
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
      >
        <Surface style={styles.surface}>
          <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

          <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
          />

          <Text style={styles.hintText}>
            Pick an easy password. It will be reset on first login.
          </Text>

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
              onPress={() => createUser()}
              style={styles.button}
          >
            Create
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

export default AddUserScreen;
