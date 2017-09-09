import React from 'react';
import {Button} from 'react-native';

export default class AnimalScreen extends React.Component {
    render() {
         const { navigate } = this.props.navigation;
        return <Button title='hi' onPress={() => navigate('Cam')}/>

    }
}