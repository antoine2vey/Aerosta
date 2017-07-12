import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Image } from 'react-native';
import Dimensions from 'Dimensions';
import { DangerZone, Video } from 'expo';

let { Lottie } = DangerZone;
const { height, width } = Dimensions.get('window');

export default class IntroModal extends Component {
  state = {
    isVisible: true,
    animation: null,
    duration: 5000,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isVisible: false
      })
    }, this.state.duration);
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible}>
          <View style={{
              alignSelf: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#f3f3f3'
            }}>
            <Video
              source={require('../animations/video.mp4')}
              rate={1.0}
              volume={1.0}
              muted={false}
              shouldPlay
              resizeMode="cover"
              noRepeat
              style={{ width, height}}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
