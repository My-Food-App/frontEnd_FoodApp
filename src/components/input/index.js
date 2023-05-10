import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";
import { COLOR } from "../../constants";
export function Input({style, icon, placeholder, secureTextEntry, ...res}) {
    return (
        <View style={{...styles.containerInput, ...style}}>
          <Text style={styles.icon}>
            {icon}
          </Text>
            <TextInput {...res} placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.input}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
      position: 'relative',
      width: '100%',
      zIndex: 1000,

    },
    icon: {
      position: 'absolute',
      top: 12,
      left: 12,
      zIndex: 1,
    },
    input: {
      width: '100%',
      backgroundColor: COLOR.GREY_LIGHT,
      color: COLOR.BLACK,
      height: 50,
      borderRadius: 10,
      paddingLeft: 40,
      paddingRight: 10,
      fontSize:16
    }
})