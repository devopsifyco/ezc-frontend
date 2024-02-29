import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import SelectedImages from './SelectImage';

interface StepOneScreenProps {}

const StepOneScreen: React.FC<StepOneScreenProps> = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const imagePickerHandler = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        const newImages = response.assets.map((asset: Asset) => asset.uri);
        setSelectedImages(newImages);
      } else {
        console.log('No images selected.');
      }
    });
  };

  useEffect(() => {
    // ComponentDidMount equivalent
    // Add any necessary code that should run when the component mounts here

    return () => {
      // ComponentWillUnmount equivalent
      // Cleanup code or any necessary operations before the component unmounts
    };
  }, []); // Empty dependency array ensures that this effect runs once

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        <Text style={styles.mediaLabel}>Attached Photos and Videos:</Text>
      </View>

      <View style={styles.viewChoose}>
        {selectedImages.length > 0 ? (
          selectedImages.map((image, index) => (
            <Image
              key={index}
              source={{uri: image}}
              style={{width: 320, height: 220}}
            />
          ))
        ) : (
          <TouchableOpacity onPress={imagePickerHandler}>
            <Text>Choose Image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Render the SelectedImages component */}
      <SelectedImages
        imageList={selectedImages}
        setSelectedImage={(index, uri) => {
          const updatedImages = [...selectedImages];
          updatedImages[index] = uri;
          setSelectedImages(updatedImages);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your styles for container here if needed
  },
  mediaContainer: {
    // Add your styles for mediaContainer here if needed
  },
  mediaLabel: {
    // Add your styles for mediaLabel here if needed
  },
  viewChoose: {
    // Add your styles for viewChoose here if needed
  },
});

export default StepOneScreen;
