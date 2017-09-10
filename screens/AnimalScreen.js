import React from 'react';
import {Button} from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXbOsdGeX0RwN-rggwomI5Ps7nSDXXioQ",
  authDomain: "fir-test-c4a21.firebaseapp.com",
  databaseURL: "fir-test-c4a21.firebaseio.com",
  storageBucket: "fir-test-c4a21.appspot.com"
};

firebase.initializeApp(firebaseConfig);

function setLocation(species, lat, long) {
      firebase.database().ref(species).push({
        latitude: 0,
        longitude: 0
      });
}

export default class AnimalScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.species}`,
  });

constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
    };
}

componentDidMount() {
    let title = this.props.navigation.state.params.species;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(title, position.coords.latitude, position.coords.longitude);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

    render() {
         const { navigate } = this.props.navigation;
        return <Button title={'Take another picture'} onPress={() => navigate('Cam')}></Button>

    }
}