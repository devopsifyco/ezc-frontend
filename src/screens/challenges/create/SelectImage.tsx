import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRemove, faAdd, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

export interface SelectedImagesProps {
  imageList: any[];
  setSelectedImage: (index: number, asset: any) => void;
  removeImage?: (index: number) => void;
  clearImages?: () => void;
}

const SelectedImages: React.FC<SelectedImagesProps> = ({
  imageList,
  setSelectedImage,
  removeImage,
  clearImages,
}) => {
  const imagePickerHandler = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        response.assets.forEach((asset: Asset, index: number) =>
          setSelectedImage(index + imageList.length, asset)
        );
      } else {
        console.log('No images selected.');
      }
    });
  };

  const handleClearImages = () => {
    if (clearImages) {
      clearImages();
    }
  };

  return (
    <>
      {imageList.length > 0 && (
        <TouchableOpacity
          style={styles.fullWidthContainer}
          onPress={() => setSelectedImage(0, imageList[0])}>
          <Image source={{ uri: imageList[0].uri }} style={styles.fullWidthImage} />
          {removeImage && (
            <TouchableOpacity
              style={styles.removeButtonFull}
              onPress={() => removeImage(0)}>
              <FontAwesomeIcon icon={faRemove} size={32} color='#ff0000' style={styles.removeButtonFull} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.viewAdd}>
        {imageList.slice(1).map((image, index) => (
          <View key={index + 1}>
            <TouchableOpacity
              onPress={() => setSelectedImage(index + 1, image)}>
              <Image source={{ uri: image.uri }} style={styles.smallImage} />
            </TouchableOpacity>
            {removeImage && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index + 1)}>
                <FontAwesomeIcon icon={faRemove} size={24} color='#ff0000' style={styles.removeButton} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <View style={styles.displayCenter}>
        <TouchableOpacity
          onPress={imagePickerHandler}
          style={styles.addImageButton}>
          <Text style={styles.text}>Add files</Text>
          <FontAwesomeIcon icon={faAdd} size={24} color='#216C53' style={styles.iconPlus} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClearImages}
          style={styles.clearImage}>
          <Text style={[styles.text, { color: '#ff0000' }]}>Clear</Text>
          <FontAwesomeIcon icon={faDeleteLeft} size={24} color='#ff0000' style={styles.iconPlus} />
        </TouchableOpacity>
      </View>
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
    borderRadius: 10,
  },
  viewAdd: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 8.5,
  },
  smallImage: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 6.5,
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  addImageButton: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363636',
    width: 135,
    height: 30,
    borderRadius: 10,
  },
  clearImage: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 30,
    borderRadius: 10,
  },
  iconPlus: {
    height: 20,
    width: 20,
    tintColor: 'green',
  },
  displayCenter: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    zIndex: 10,
    top: '2%',
    left: '75%',
    paddingTop: 5,
  },
  removeButtonFull: {
    position: 'absolute',
    zIndex: 10,
    top: '5%',
    left: '88%',
    paddingTop: 5,
  },
});
