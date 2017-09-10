import React from 'react';
import {Button} from 'react-native';

export default class AnimalScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.species}`,
  });
    render() {
         const { navigate } = this.props.navigation;
        return <Button title={'Take another picture'} onPress={() => navigate('Cam')}/>

    }
}