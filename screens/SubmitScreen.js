import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SubmitScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>FILL YOUR REQUEST</Text>

      <View style={styles.gridContainer}>
        <TextInput style={styles.input} placeholder="FIRST NAME" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="PLACE OF BIRTH" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="LAST NAME" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="DATE OF BIRTH" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="NATIONALITY" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="DOCUMENT NR" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="DATE OF ISSUE" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="FATHER NAME" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="DATE OF EXPIRY" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="MOTHER NAME" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="OCCUPATION" placeholderTextColor="#B8B8B8" />
        <TextInput style={styles.input} placeholder="SEX" placeholderTextColor="#B8B8B8" />
      </View>

      <Text style={styles.sectionTitle}>CHOOSE A PAYMENT METHOD</Text>
      <View style={styles.paymentMethods}>
        <Image style={styles.paymentIcon} source={{ uri: 'https://via.placeholder.com/50' }} />
        <Image style={styles.paymentIcon} source={{ uri: 'https://via.placeholder.com/50' }} />
        <Image style={styles.paymentIcon} source={{ uri: 'https://via.placeholder.com/50' }} />
        <Image style={styles.paymentIcon} source={{ uri: 'https://via.placeholder.com/50' }} />
        <Image style={styles.paymentIcon} source={{ uri: 'https://via.placeholder.com/50' }} />
      </View>

       {/* Choose Date */}
       <TouchableOpacity
        style={styles.dateButton}
        onPress={() => navigation.navigate('Submit2')}
      >
        <Text style={styles.dateButtonText}>CHOOSE A DATE</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => alert('Request Submitted!')}
      >
        <Text style={styles.submitButtonText}>SUBMIT YOUR REQUEST</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E2E2E',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: 'orange',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
    marginVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: '48%', // Ensures two inputs fit side by side with space between
    backgroundColor: '#FCE3CF',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    textAlign: 'center',
    marginVertical: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  dateButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateText: {
    color: '#FFF',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
