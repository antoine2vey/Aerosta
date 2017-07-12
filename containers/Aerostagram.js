import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Image, ScrollView } from 'react-native';
import { DangerZone, ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Dimensions from 'Dimensions';
import NewAerostagram from './NewAerostagram';
import PhotoFeed from './PhotoFeed';
import postcard from '../animations/postcard.json';
import { connect } from 'react-redux';
import { setCurrentImage, hideModal, fetchPhotosIfNeeded } from '../actions';

const { Lottie } = DangerZone;
const { height, width } = Dimensions.get('window');

class Aerostagram extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Aerostagram',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-photos-outline" size={28} color={tintColor} />
      ),
      headerRight: (
        <Ionicons
          name="ios-camera-outline"
          size={32}
          color={'#222'}
          style={{
            paddingRight: 15
          }}
          onPress={params.setCurrentImage} />
      )
    };
  }

  state = {
    animation: null,
    image: null,
    showCreation: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setCurrentImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.props.setCurrentImage(result)
    }
  }

  componentDidMount() {
    this.props.fetchPhotosIfNeeded()
    this.props.navigation.setParams({ setCurrentImage: this.setCurrentImage })
    this._playAnimation()
  }

  render() {
    const { currentImage, photos } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}>
          <View style={{
              alignSelf: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#f3f3f3'
            }}>
            {this.state.animation &&
              <Lottie
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 480,
                  height: 270,
                }}
                source={this.state.animation}
                loop={true}
              />}
              <Text style={styles.t}>
                Prenez un selfie à votre évènement
              </Text>
              <Text style={styles.t}>
                En ajoutant vos <Text style={styles.hashtag}>#hashtag</Text>
              </Text>
              <TouchableHighlight
                style={styles.close}
                onPress={() => {
                  this.props.hideModal();
                  setTimeout(() => {
                    this.setCurrentImage();
                  }, 500)
                }}>
                <Ionicons name="ios-camera-outline" size={38} color={'#fff'} style={{
                    alignSelf: 'center'
                  }}/>
              </TouchableHighlight>
            </View>
          </Modal>
          <ScrollView>
            { currentImage.uri && <NewAerostagram image={currentImage}/> }
            { photos.length > 0 && <PhotoFeed photos={photos} /> }
          </ScrollView>
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
        { animation: postcard },
        this._playAnimation
      );
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f3f3',
    },
    t: {
      margin: 10,
      fontSize: 20,
      color: '#222',
      textAlign: 'center'
    },
    hashtag: {
      color: '#2196f3'
    },
    close: {
      width,
      marginTop: 'auto',
      backgroundColor: '#2196f3',
      padding: 7
    }
  });

const mapStateToProps = state => {
  const { currentImage, shownIntroModal, photos } = state.aerostagrams;
  return {
    currentImage,
    photos,
    modalVisible: shownIntroModal
  }
}

export default connect(mapStateToProps, { setCurrentImage, hideModal, fetchPhotosIfNeeded })(Aerostagram);
