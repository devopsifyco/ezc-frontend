import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker, Polyline } from "react-native-maps";

const MapScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [showSetLocationButton, setShowSetLocationButton] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const vietnamCoordinate = {
    latitude: 14.0583,
    longitude: 108.2772,
  };

  //const handleSetLocation = () => {
  //  const lineCoordinates = [
  //    {
  //      latitude: currentLocation.latitude,
  //      longitude: currentLocation.longitude,
  //    },
  //    {
  //      latitude: vietnamCoordinate.latitude,
  //      longitude: vietnamCoordinate.longitude,
  //    },
  //  ];

  //  setCoordinates(lineCoordinates);
  //  setShowSetLocationButton(false);
  //};

  const handleSearch = async () => {
    try {
      const apiKey = "YOUR_GOOGLE_API_KEY";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${searchText}&inputtype=textquery&fields=geometry`
      );
      const data = await response.json();

      console.log("Search API Response:", data);

      if (data.status === "OK" && data.candidates.length > 0) {
        const location = data.candidates[0].geometry.location;
        setSearchResult(location);
        setCurrentLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        setSearchResult(null);
        console.warn("No results found");
      }
    } catch (error) {
      console.error("Error searching location:", error.message);
    }
  };

  const handlePredictionSelect = (prediction) => {
    setSearchText(prediction.description);
    setPredictions([]);
    handleSearch();
  };

  const fetchPredictions = async () => {
    try {
      const apiKey = "YOUR_GOOGLE_API_KEY";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${searchText}&types=geocode`
      );
      const data = await response.json();

      console.log("Autocomplete API Response:", data);

      if (data.status === "OK") {
        setPredictions(data.predictions);
      } else {
        setPredictions([]);
        console.warn("Autocomplete failed");
      }
    } catch (error) {
      console.error("Error fetching predictions:", error.message);
    }
  };

  useEffect(() => {
    if (searchText.length > 0) {
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [searchText]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: vietnamCoordinate.latitude,
          longitude: vietnamCoordinate.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {searchResult && (
          <Marker
            coordinate={{
              latitude: searchResult.lat,
              longitude: searchResult.lng,
            }}
            title={searchText}
          />
        )}
        <Marker
          coordinate={vietnamCoordinate}
          title="Vietnam"
          description="Beautiful country"
        />
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Vị trí hiện tại của bạn"
          description="Bạn đang ở đây"
        />
        {coordinates.length > 0 && (
          <Polyline coordinates={coordinates} strokeWidth={3} strokeColor="blue" />
        )}
      </MapView>
      {/*<View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          placeholderTextColor='grey'
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesomeIcon icon={faSearch} size={28} />
        </TouchableOpacity>
      </View>*/}
      {predictions.length > 0 && (
        <View style={styles.predictionsContainer}>
          {predictions.map((prediction) => (
            <TouchableOpacity
              key={prediction.place_id}
              style={styles.predictionItem}
              onPress={() => handlePredictionSelect(prediction)}
            >
              {/*<Text>{prediction.description}</Text>*/}
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/*{showSetLocationButton && (
        <TouchableOpacity style={styles.setLocationButton} onPress={handleSetLocation}>
          <Text style={styles.setLocationButtonText}>Set Location</Text>
        </TouchableOpacity>
      )}*/}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    zIndex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    flex: 1,
    color: 'grey'
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: "white",
    fontWeight: 'bold',
  },
  setLocationButton: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "#6B50F6",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  setLocationButtonText: {
    color: "white",
    fontSize: 16,
  },
  predictionsContainer: {
    position: "absolute",
    top: 150,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1,
    elevation: 3,
  },
  predictionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default MapScreen;