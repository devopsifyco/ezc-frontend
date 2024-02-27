import React from 'react';
import {SafeAreaView, TouchableOpacity, Text, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {styles} from './index';

const Next = ({
  setSelectedImage,
  setSelectedImage1,
  setSelectedImage2,
  setSelectedImage3,
}) => {
  const ImagePike = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        if (response.assets.length > 3) {
          setSelectedImage3(response.assets[3].uri);
        }
        if (response.assets.length > 2) {
          setSelectedImage2(response.assets[2].uri);
        }
        if (response.assets.length > 1) {
          setSelectedImage1(response.assets[1].uri);
        }
        if (response.assets.length > 0) {
          setSelectedImage(response.assets[0].uri);
        }
      } else {
        console.log('Không có hình ảnh nào được chọn.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={ImagePike} style={styles.displayCenter}>
        <Image source={require('../../assets/icons/1.png')} />
        <Text style={styles.titleMedium}>Choose file</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Next;
