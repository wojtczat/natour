import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { MapView, Permissions, Location } from 'expo';

// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCXbOsdGeX0RwN-rggwomI5Ps7nSDXXioQ",
//   authDomain: "fir-test-c4a21.firebaseapp.com",
//   databaseURL: "fir-test-c4a21.firebaseio.com",
//   storageBucket: "fir-test-c4a21.appspot.com"
// };

// firebase.initializeApp(firebaseConfig);

// function setLocation(species, lat, long) {
//       firebase.database().ref('test4/' + species).push({
//         latitude: lat,
//         longitude: long
//       });
// }

export default class LinksScreen extends React.Component {
  state = {
    isLoading: true,
    location: null,
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
        >{setLocation("sample", this.state.location.coords.latitude, this.state.location.coords.longitude)}</MapView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
