import React from 'react';
import { Platform } from 'react-native';

let MapView;

if (Platform.OS === 'web') {
  const { GoogleMap, LoadScript } = require('@react-google-maps/api');
  MapView = ({ style, ...props }) => (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={style} {...props} />
    </LoadScript>
  );
} else {
  MapView = require('react-native-maps').default;
}

export default MapView;
