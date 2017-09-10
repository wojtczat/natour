import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, MapView, Permissions } from 'expo';
import vision from "react-cloud-vision-api";

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: true,
    type: Camera.Constants.Type.back,
    label: 'Test'
  };
  async snap() {
    if (this.camera) {
      const result = await this.camera.takePictureAsync();
      callApi(result);
      console.log(result);
    }
  }
  render() {

    return (
      <View style={styles.container}>
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
                  style={{ fontSize: 18, marginBottom: 10, align: 'center', color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity><TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => this.snap()}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
