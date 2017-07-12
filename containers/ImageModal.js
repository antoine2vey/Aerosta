import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ImageModal = ({ uri, shown, hideModal }) => (
  <View>
    <Modal
      animationType={"fade"}
      transparent={false}
      visible={shown}>
      <View style={{
          backgroundColor: '#000',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image
            source={{uri}}
            resizeMode="cover"
            style={{flex: 1, width: 750, height: null}}
          />
          <TouchableHighlight style={{
              position: 'absolute',
              top: 30,
              right: 15,
              padding: 5,
              backgroundColor: 'rgba(0, 0, 0, .3)',
              borderRadius: 300
            }} onPress={hideModal}>
            <Ionicons name="ios-close-circle-outline" size={28} color={'#fff'} />
          </TouchableHighlight>
      </View>
    </Modal>
  </View>
)
