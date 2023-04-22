import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';

export const MyModal = ({
  children,
  visible,
  onRequestClose,
  onPressOverlay,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onRequestClose}>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
