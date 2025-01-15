import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, Button, Platform, Linking,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';  // Import MapView and Marker

export default function AboutScreen({ navigation }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);  // For Request an Update modal

  // Coordinates of the immigration office (replace with actual coordinates)
  const immigrationOffice = {
    latitude: 52.2297,  // Example coordinates for immigration office
    longitude: 21.0122, // Example coordinates for immigration office
  };

  // Request permissions on component mount
  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== 'web') {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
          Alert.alert('Permissions Required', 'You need to grant camera and media permissions.');
        }
      }

      if (Platform.OS === 'ios') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasLocationPermission(status === 'granted');
      } else {
        const { status } = await Location.requestPermissionsAsync();
        setHasLocationPermission(status === 'granted');
      }
    };
    getPermissions();
  }, []);

  const handleUploadPhoto = async () => {
    const options = ['Take a Photo', 'Upload from Gallery', 'Cancel'];
    const action = await new Promise((resolve) => {
      Alert.alert(
        'Select a photo',
        'Choose to take a photo or upload from your gallery.',
        options.map((option) => ({
          text: option,
          onPress: () => resolve(option),
        }))
      );
    });

    if (action === 'Take a Photo') {
      takePhoto();
    } else if (action === 'Upload from Gallery') {
      pickImage();
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedPhoto({ uri: result.assets[0].uri });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedPhoto({ uri: result.assets[0].uri });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestUpdate = () => {
    setIsUpdateModalVisible(true);  // Show the "Request an Update" modal
  };

  const handleSendEmail = async () => {
    try {
      const result = await MailComposer.composeAsync({
        recipients: ['info@gov.pl'],
        subject: 'Request for Update',
        body: 'Dear Sir/Madam,\n\nI would like to request an update regarding my application.\n\nBest regards.',
      });
      if (result.status === 'sent') {
        setIsUpdateModalVisible(false); // Close modal if email is sent successfully
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleRequestLocation = async () => {
    if (!hasLocationPermission) {
      Alert.alert('Permission Denied', 'You need to grant location permission to use this feature.');
      return;
    }

    setLoading(true);

    try {
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setIsModalVisible(false); // Close the modal when location is retrieved
    } catch (error) {
      Alert.alert('Error', 'Could not get your location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getGoogleMapsUrl = () => {
    if (location) {
      return `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${immigrationOffice.latitude},${immigrationOffice.longitude}&travelmode=driving`;
    }
    return '';
  };

  const openGoogleMaps = () => {
    const url = getGoogleMapsUrl();
    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('Location Error', 'Unable to fetch location or set destination.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageIcon}>
          <Text>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Central Box */}
      <View style={styles.centralBox}>
        <TouchableOpacity onPress={handleUploadPhoto} style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            {selectedPhoto ? (
              <Image
                source={{ uri: selectedPhoto.uri }}
                style={styles.photo}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.uploadText}>UPLOAD A PHOTO</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Submit Your Application */}
      <Text style={styles.sectionTitle}>SUBMIT YOUR APPLICATION</Text>
      <View style={styles.checkboxGroup}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => navigation.navigate('Submit')}
        >
          <View style={styles.orangeFill} />
          <Text style={styles.checkboxText}>RESIDENCE CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => navigation.navigate('Submit')}
        >
          <View style={styles.orangeFill} />
          <Text style={styles.checkboxText}>PASSPORT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => navigation.navigate('Submit')}
        >
          <View style={styles.orangeFill} />
          <Text style={styles.checkboxText}>ID CARD</Text>
        </TouchableOpacity>
      </View>

      {/* Useful Links */}
      <Text style={styles.sectionTitle}>USEFUL LINKS</Text>
      <View style={styles.linksContainer}>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>TRACK YOUR APPLICATION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={handleRequestUpdate}>
          <Text style={styles.linkText}>REQUEST AN UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.linkText}>FAQ/HELP CENTER</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for FAQ/Help Center */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Get Your Location</Text>
            <Text style={styles.modalText}>
              Please allow access to your location to find the nearest immigration office and call center.
            </Text>
            <Button title="Allow Location" onPress={handleRequestLocation} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Show Map if Location is available */}
      {/* Show Map if Location is available */}
{location && (
  <View style={styles.mapContainer}>
    {/* Directions Button Above the Map */}
    <TouchableOpacity style={styles.directionsButton} onPress={openGoogleMaps}>
      <Text style={styles.directionsButtonText}>Get Directions to Immigration Office</Text>
    </TouchableOpacity>

    {/* Map View */}
    <MapView
      style={styles.map}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* User Location Marker */}
      <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Your Location" />

      {/* Immigration Office Marker */}
      <Marker
        coordinate={{
          latitude: immigrationOffice.latitude,
          longitude: immigrationOffice.longitude,
        }}
        title="Immigration Office"
        description="Nearest immigration office."
      />
    </MapView>
  </View>
)}


      {/* Modal for sending email (Request an Update) */}
      <Modal
        visible={isUpdateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Send Request</Text>
            <Button title="Send Email" onPress={handleSendEmail} />
            <Button title="Cancel" onPress={() => setIsUpdateModalVisible(false)} />
          </View>
        </View>
      </Modal>
      </ScrollView>  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: 'orange',
  },
  messageIcon: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 20,
    padding: 5,
  },
  centralBox: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 20,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginVertical: 10,
  },
  checkboxGroup: {
    marginVertical: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  orangeFill: {
    width: 20,
    height: 20,
    backgroundColor: 'orange',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: 'black',
  },
  linksContainer: {
    marginTop: 10,
  },
  linkButton: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  linkText: {
    fontSize: 14,
    color: 'orange',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  directionsButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  directionsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});




