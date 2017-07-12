import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Image, TextInput } from 'react-native';
import Dimensions from 'Dimensions';
import { DangerZone, Video } from 'expo';
import { connect } from 'react-redux';
import { createNew } from '../actions';

let { Lottie } = DangerZone;
const { height, width } = Dimensions.get('window');

class NewAerostagram extends Component {
  state = {
    title: '',
    description: '',
    hashtags: ''
  }

  createStory() {
    this.props.createNew({
      ...this.state,
      uri: this.props.image.uri
    });
  }

  render() {
    const { image: { uri } } = this.props;
    return (
      <View style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#F3F3F3'
        }}>
        <Image
          source={{ uri }}
          style={{
            width,
            height: 200,
            resizeMode: 'cover',
          }}/>
        <View style={{flex: 1, padding: 15}}>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            onChangeText={(text) => this.setState({title: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={(text) => this.setState({description: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Vos hashtags (séparés par un espace)"
            onChangeText={(text) => this.setState({hashtags: text})}
          />
          <Button
            onPress={() => this.createStory()}
            title="Ajouter votre story"
            color="#2196f3"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 5
  }
})

export default connect(() => ({}), { createNew })(NewAerostagram);
