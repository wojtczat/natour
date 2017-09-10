import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, MapView, Permissions } from 'expo';
import vision from "react-cloud-vision-api";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Identify',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: true,
      type: Camera.Constants.Type.back,
      label: 'Test'
    };
    this.handlePress = this.handlePress.bind(this);
    this.snap = this.snap.bind(this);
  }

  snap = async () => {
    if (this.camera) {
      const result = await this.camera.takePictureAsync();
      this.callApi(result);
      result;
    }
  }

  handlePress() {
    this.snap();
  }

  callApi = (uri) => {
    vision.init({auth: 'AIzaSyArZ4nqFFWNjytStuWeMpGU5SCgv6q8XEQ'})
    const req = new vision.Request({
      image: new vision.Image(uri),
      features: [
        new vision.Feature('LABEL_DETECTION', 1),
      ]
    });

    vision.annotate(req).then((res) => {
      const { navigate } = this.props.navigation; 
      this.setState({label: res.responses[0].labelAnnotations[0].description});
      navigate('Info', { species:  this.state.label})
    }, (e) => {
      console.log('Error ' , e)
    })


  };

  render() {
const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Button title='Go to info' onPress={() => navigate('Info', { species: "Info" })}/>
        <Camera style={{ flex: 5 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 2,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.handlePress}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>
                  {' '}Capture{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5
  },
});
