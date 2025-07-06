// src/screens/CompanyScreen.tsx
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {CompanyDto} from "../../interface/company.ts";
import {companyService} from "../../services/company.ts";
import {useGlobalDispatch, useGlobalState} from "../reducer/reducers.tsx";
import {AuthDataResponse} from "../../interface/auth.ts";

const CompanyScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useGlobalDispatch()
  const state = useGlobalState()
  const [company, setCompany] = useState<CompanyDto>({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    description: ''
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      name: '',
      description: ''
    };

    if (!company.name.trim()) {
      newErrors.name = 'Company name is required';
      isValid = false;
    }

    if (!company.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await companyService.create(company)

        const updatedUser: AuthDataResponse = {
          ...state.auth.user!,
          company: {
            ...state.auth.user!.company,
            ...response
          }
        };

        dispatch({
          type: 'setUser',
          payload: updatedUser
        });

        return navigation.navigate('Bar', { companyId: response.id });
      } catch (error) {
        console.error('Error creating company:', error);
      }
    }
  };

  return (
      <Surface style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Create Company
        </Text>

        <TextInput
            label="Company Name"
            value={company.name}
            onChangeText={(text) => setCompany({ ...company, name: text })}
            mode="outlined"
            style={styles.input}
            error={!!errors.name}
        />

        <TextInput
            label="Description"
            value={company.description}
            onChangeText={(text) => setCompany({ ...company, description: text })}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            error={!!errors.description}
        />

        <View style={styles.buttonContainer}>
          <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
          >
            Cancel
          </Button>
          <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
          >
            Create
          </Button>
        </View>
      </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  button: {
    minWidth: 120,
  },
});

export default CompanyScreen;