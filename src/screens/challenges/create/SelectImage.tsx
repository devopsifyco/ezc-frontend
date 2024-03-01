import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

export interface SelectedImagesProps {
  imageList: string[];
  setSelectedImage: (index: number, uri: string) => void;
}

const SelectedImages: React.FC<SelectedImagesProps> = ({
  imageList,
  setSelectedImage,
}) => {
  const imagePickerHandler = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        const newImages: string[] = response.assets.map(
          (asset: Asset) => asset.uri,
        );
        newImages.forEach((uri, index) => {
          setSelectedImage(index + imageList.length, uri);
        });
      } else {
        console.log('No images selected.');
      }
    });
  };

  return (
    <>
      {imageList.length > 0 && (
        <TouchableOpacity
          style={styles.fullWidthContainer}
          onPress={() => setSelectedImage(0, imageList[0])}>
          <Image source={{uri: imageList[0]}} style={styles.fullWidthImage} />
        </TouchableOpacity>
      )}

      <View style={styles.viewAdd}>
        {imageList.slice(1).map((image, index) => (
          <TouchableOpacity
            style={styles.rowContainer}
            key={index}
            onPress={() => setSelectedImage(index + 1, image)}>
            <Image source={{uri: image}} style={styles.smallImage} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={imagePickerHandler}>
        <Text style={styles.text}>Add Image</Text>
      </TouchableOpacity>
    </>
  );
};

export default SelectedImages;

const styles = StyleSheet.create({
  fullWidthContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
  },
  viewAdd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  rowContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  smallImage: {
    width: 100,
    aspectRatio: 1,
    marginBottom: 5,
  },
  text: {
    paddingTop: 10,
    fontSize: 16,
    color: '#216C53',
    fontWeight: 'bold',
  },
});
