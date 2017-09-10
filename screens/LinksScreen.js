import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { MapView, Permissions, Location } from 'expo';
import './HomeScreen.js';

export default class LinksScreen extends React.Component {
  state = {
    isLoading: true,
    location: null,
    markers: [{title: "Giraffe", description: 'The tallest living terrestrial animals', lat: 5.1521, long: 46.1996}],
  };

  static navigationOptions = {
    title: 'Map',
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Location:");
    console.log(location);
    this.setState({ location, isLoading: false });
  };

  componentWillMount = () => {
    this._getLocationAsync();
  };



  render() {
    if (this.state.isLoading) {
      return (
        <Text>Loading.......</Text>
      )
    } else {

      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={{latitude: marker.lat, longitude: marker.long}}
            title={marker.title}
            description={marker.description}
          />
        ))}

        </MapView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
});
