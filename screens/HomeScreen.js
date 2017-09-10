import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera, MapView, Permissions } from 'expo';
import vision from "react-cloud-vision-api";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
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

  async snap() {
    if (this.camera) {
      const result = await this.camera.takePictureAsync();
      this.callApi(result);
      console.log(result);
    }
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    this.snap();
    navigate('Info', { species: 'Osprey' })
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
      console.log(res.responses)
      this.setState({label: JSON.stringify(res.responses)});
    }, (e) => {
      console.log('Error ' , e)
    })


  };

  render() {
const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Button title='Go to info' onPress={() => navigate('Info', { species: 'Osprey' })}/>
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.snap();
                  return;
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity><TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.handlePress}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, marginLeft: 250, color: 'white' }}>
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
    flex: 1
  },
});
