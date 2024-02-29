import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

export interface SelectedImagesProps {
  imageList: string[];
  setSelectedImage: (index: number, uri: string) => void;
}

const SelectedImages: React.FC<SelectedImagesProps> = ({
  imageList,
  setSelectedImage,
}) => {
  return (
    <View style={styles.viewAdd}>
      {imageList.map((image, index) => (
        <View style={styles.rowContainer} key={index}>
          <Image source={{uri: image}} style={styles.imageStyle} />
          <TouchableOpacity onPress={() => setSelectedImage(index, '')}>
            <Text style={styles.text}>Choose Image {index + 1}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default SelectedImages;

const styles = StyleSheet.create({
  viewAdd: {},
  rowContainer: {},
  imageStyle: {width: 102, height: 100},
  text: {
    fontSize: 14,
  },
});
