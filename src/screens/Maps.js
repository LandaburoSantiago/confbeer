import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useJsApiLoader } from "@react-google-maps/api";
import * as Location from "expo-location";

const CDELU_LOCATION = {
  lat: -32.48259052488944,
  lng: -58.240336580153205,
};

const Maps = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [center, setCenter] = useState();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Para una mejor experiencia, acepta los permisos de geolocalización."
        );
        setCenter(CDELU_LOCATION);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCenter(location);
    } catch (error) {}
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "Insertar api key google maps",
    libraries: ["places"],
  });

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {isLoaded && <MapView provider={PROVIDER_GOOGLE} style={styles.map} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Maps;
