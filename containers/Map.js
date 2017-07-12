import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { fetchMarkersIfNeeded } from '../actions';

import mapStyle from '../map.json'

class Map extends Component {
  state = {
    markers: []
  }

  static navigationOptions = {
    title: 'Map',
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-map" size={28} color={tintColor} />
    ),
  };

  componentDidMount() {
    this.props.fetchMarkersIfNeeded();
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.633085,
          longitude: 3.053259,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={mapStyle}>
        {this.props.markers.map(marker => (
          <MapView.Marker
            key={marker.id}
            coordinate={{latitude: marker.lat, longitude: marker.lng}}
            title={marker.code}
            description={marker.code}
            image={require('../balloon.png')}
          />
        ))}

        <MapView.Circle
          center={{
            latitude: 50.633085,
            longitude: 3.057259,
          }}
          radius={1000}
          strokeColor={'#3498db'}
          fillColor={'rgba(52, 152, 219, .1)'}/>
      </MapView>
    );
  }
}

const mapStateToProps = state => ({
  markers: state.markers
})

export default connect(mapStateToProps, { fetchMarkersIfNeeded })(Map)
