import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const Next = ({ setSelectedImage, setSelectedImage1, setSelectedImage2, setSelectedImage3 }) => {
  const ImagePike = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    // launchImageLibrary(options, (response) => {
    //   if (response.assets && response.assets.length > 0) {
    //     setSelectedImage(response.assets[0].uri); 
    //   }
    //   if (response.assets && response.assets.length > 1) {
    //     setSelectedImage1(response.assets[1].uri); 
    //   }
    //   if (response.assets && response.assets.length > 2) {
    //     setSelectedImage2(response.assets[2].uri); 
    //   }
    //   if (response.assets && response.assets.length > 3) {
    //     setSelectedImage3(response.assets[3].uri); 
    //   }
    // });

    launchImageLibrary(options, (response) => {
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
        console.log("Không có hình ảnh nào được chọn.");
      }
    });
  };


  return (
    <SafeAreaView style={{
      flex: 1, justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity onPress={ImagePike}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/icons/1.png')} />
          <Text>Choose File</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Next;
