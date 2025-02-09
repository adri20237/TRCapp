import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, Alert } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // Send registration data to backend (for example, to your server.js route)
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    // Add API call to send data to backend here (e.g., fetch or axios)

    // On success, navigate to the About screen or show success message
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#FFA500"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#FFA500"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#FFA500"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Create a Password"
        placeholderTextColor="#FFA500"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#FFA500"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Register Button */}
      <Button
        title="Register"
        onPress={handleRegistration}
        color="#FFA500"
      />

      {/* Forgot Password Link */}
      <Text
        style={styles.forgotPasswordLink}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot your password?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: 300,
    borderRadius: 5,
    fontSize: 16,
  },
  forgotPasswordLink: {
    marginTop: 20,
    color: '#FFA500',
    textDecorationLine: 'underline',
  },
});
