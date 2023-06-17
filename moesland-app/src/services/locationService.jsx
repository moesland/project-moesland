import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return null;
  }
  return Location.getCurrentPositionAsync({});
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371e3; // Radius of the Earth in meters
  const degToRad = Math.PI / 180; // Conversion factor from degrees to radians

  // Convert latitude and longitude to radians
  const phi1 = lat1 * degToRad;
  const phi2 = lat2 * degToRad;
  const deltaPhi = (lat2 - lat1) * degToRad;
  const deltaLambda = (lon2 - lon1) * degToRad;

  // Haversine formula
  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)
            + Math.cos(phi1) * Math.cos(phi2)
            * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
};
