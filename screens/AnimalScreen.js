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
      firebase.database().ref('test4/' + species).push({
        latitude: lat,
        longitude: long
      });
}

export default class AnimalScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.species}`,
  });
    render() {
         const { navigate } = this.props.navigation;
        return <Button title={'Take another picture'} onPress={() => navigate('Cam')}/>

    }
}