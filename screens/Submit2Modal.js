import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Submit2Modal({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    Alert.alert('Date Selected', `You selected ${date.dateString}`);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      Alert.alert('No Date Selected', 'Please select a date before submitting.');
    } else {
      Alert.alert('Request Submitted', `Your request for ${selectedDate} has been submitted.`);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Date</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#FFA500',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#FFA500',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#FFA500',
          arrowColor: '#FFA500',
        }}
        style={styles.calendar}
      />
      <View style={styles.submitContainer}>
        <Button
          title="Submit Your Request"
          onPress={handleSubmit}
          color="#FFA500"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  submitContainer: {
    marginTop: 20,
    width: '100%',
  },
});

