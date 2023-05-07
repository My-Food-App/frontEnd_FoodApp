import React from 'react';
import {Text, View} from 'react-native';
import {Stitch, RemoteMongoClient} from 'mongodb-stitch-react-native-sdk';

export function Notification() {
  // Initialize the app client
  // Stitch.initializeDefaultAppClient('64563d3c06ac512c22993e2e');

  // // Get a reference to the RemoteMongoClient for the Atlas cluster
  // const mongoClient = Stitch.defaultAppClient.getServiceClient(
  //   RemoteMongoClient.factory,
  //   'mongodb-atlas',
  // );

  // // Listen for changes on a collection
  // const collection = mongoClient.db('foods_app').collection('users');
  // const changeStream = collection.watch();

  // // Set up a listener for Change Stream events
  // changeStream.onNext(change => {
  //   console.log('Change Stream event:', change);
  // });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Notifi!</Text>
    </View>
  );
}
