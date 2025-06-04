// src/screens/RegisterScreen.tsx
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Button, Divider, Menu, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {authService} from '../services/auth.ts';
import {RegisterData} from '../interface/auth.ts';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const theme = useTheme();

  async function handleLogin() {
    const response: RegisterData = await authService.register({
      username,
      email,
      password,
      role
    });
    if (response) {

      navigation.navigate('Login');
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

          <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={setEmail}
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

          <TextInput
              mode="outlined"
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
          />

          <View style={{marginBottom: 16}}>
            <Text style={{marginBottom: 8}}>Select Role</Text>

            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Button mode="outlined" onPress={openMenu}>
                    {role}
                  </Button>
                }
            >
              <Menu.Item onPress={() => {
                setRole('Owner');
                closeMenu();
              }} title="Owner"/>
              <Divider/>
              <Menu.Item onPress={() => {
                setRole('Waiter');
                closeMenu();
              }} title="Waiter"/>
              <Divider/>
              <Menu.Item onPress={() => {
                setRole('Customer');
                closeMenu();
              }} title="Customer"/>
            </Menu>
          </View>


          <Button
              mode="contained"
              onPress={() => handleLogin()}
              style={styles.button}
          >
            Register
          </Button>

          <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.linkButton}
          >
            Already have an account? Login
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

export default RegisterScreen;
