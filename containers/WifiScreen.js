import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Button, AlertIOS } from 'react-native';
import { DangerZone, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import wifiAnimation from '../animations/wifi_wiper.json';

let { Lottie } = DangerZone;

export default class WifiScreen extends Component {
  static navigationOptions = {
    title: 'Wifi',
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-wifi" size={28} color={tintColor} />
    ),
  };

  state = {
    animation: null,
  };

  componentWillMount() {
    this._playAnimation();
    setTimeout(() => AlertIOS.prompt(
      'Mot de passe du ballon :',
      'Fait pas le mort stp 😰',
      text => {
        if (text.length > 3) {
          AlertIOS.alert('Mot de passe correct!', 'Bonne navigation 😂');
        } else {
          AlertIOS.alert('Mauvais mot de passe', 'Réessayez 😠');
        }
      }
    ), 5000);
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <View style={styles.lottie}>
          {this.state.animation &&
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 400,
                height: 300,
              }}
              source={this.state.animation}
              loop={true}
            />}
        </View>
      </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync() {
    this.setState(
      { animation: wifiAnimation },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    flexDirection: 'column',
    display: 'flex'
  },
  imgBg: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  lottie: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
  }
});
