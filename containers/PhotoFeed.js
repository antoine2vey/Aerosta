import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import ImageModal from './ImageModal';
import Dimensions from 'Dimensions';
import { DangerZone } from 'expo';
import like from '../animations/fav.json';
import fav from '../animations/star.json';
import { Animated } from 'react-native';
import Animation from 'lottie-react-native';
import { connect } from 'react-redux';
import { likePhoto } from '../actions';

const { Lottie } = DangerZone;
const { height, width } = Dimensions.get('window');

class PhotoFeed extends Component {
  state = {
    shown: false,
    uri: '',
    progress: new Animated.Value(0),
  }

  showModal(uri) {
    this.setState({
      shown: true,
      uri
    })
  }

  hideModal() {
    this.setState({
      shown: false,
      uri: '',
    })
  }

  _play(id) {
    Animated.timing(this.state.progress, {
      toValue: .8,
      duration: 1000,
    }).start();

    this.props.likePhoto(id);
  }

  render() {
    return (
      <View style={styles.container}>
        { this.props.photos.map(photo => (
            <View key={photo.id} style={styles.photo}>
              <View>
                <TouchableHighlight onPress={() => this.showModal(photo.image)}>
                  <Image source={{ uri: photo.image }} style={styles.image} />
                </TouchableHighlight>
                <Text style={styles.title}>{photo.title.toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.description}>{photo.description}</Text>
                <View style={styles.hashtags}>
                  <View>
                    {photo.hashtags.trim().split(' ').map((hashtag, i) => {
                      return <Text key={i} style={styles.hashtag}>{`#${hashtag} `}</Text>
                    })}
                  </View>
                  <View style={{flex: 1, position: 'relative'}}>
                    <TouchableHighlight onPress={() => this._play(photo.id)} underlayColor={'transparent'} style={{
                      position: 'absolute',
                      right: -30,
                      bottom: -30,
                    }}>
                      <Lottie
                        style={{
                          height: 100,
                          width: 100,
                        }}
                        progress={this.state.progress}
                        source={like}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          )) }
          <ImageModal uri={this.state.uri} shown={this.state.shown} hideModal={this.hideModal.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    // Padding de 10 chaque côté
    width: width - 20,
    height: 200,
    resizeMode: 'cover',
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    position: 'relative',
  },
  photo: {
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3
  },
  title: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
  },
  description: {
    padding: 15,
    fontSize: 22,
    fontWeight: '300',
    color: '#222'
  },
  hashtag: {
    color: '#2196f3',
    fontWeight: '100',
  },
  hashtags: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
  }
})


export default connect(() => ({}), { likePhoto })(PhotoFeed);
