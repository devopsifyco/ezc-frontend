import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const ULR_IMAGE = '../assets/signin_signup/';

export default function LoginOptions() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require(`${ULR_IMAGE}arrowLeft.png`)} />
        <Text>Or continue with</Text>
        <Image source={require(`${ULR_IMAGE}arrowRight.png`)} />
      </View>
      <View>
        <TouchableOpacity>
          <Image source={require(`${ULR_IMAGE}google-icon.png`)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require(`${ULR_IMAGE}apple-icon.png`)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require(`${ULR_IMAGE}facebook-icon.png`)} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
