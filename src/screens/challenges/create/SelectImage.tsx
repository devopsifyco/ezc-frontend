import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
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
        response.assets.forEach( (asset: Asset, index: number) =>
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
          <Image source={{uri: imageList[0].uri}} style={styles.fullWidthImage} />
          {removeImage && (
            <TouchableOpacity
              style={styles.removeButtonFull}
              onPress={() => removeImage(0)}>
              <Image
                source={require('../../../assets/icons/delete.png')}
                style={styles.iconRemove}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.viewAdd}>
        {imageList.slice(1).map((image, index) => (
          <View key={index + 1}>
            <TouchableOpacity
              onPress={() => setSelectedImage(index + 1, image)}>
              <Image source={{uri: image.uri}} style={styles.smallImage} />
            </TouchableOpacity>
            {removeImage && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index + 1)}>
                <Image
                  source={require('../../../assets/icons/delete.png')}
                  style={styles.iconRemove}
                />
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
          <Image
            source={require('../../../assets/icons/1.png')}
            style={styles.iconPlus}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearImages}>
          <Text style={styles.text}>Clear Images</Text>
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
    left: '80%',
    paddingTop: 5,
  },
  iconRemove: {
    height: 15,
    width: 15,
    tintColor: 'red',
  },
  removeButtonFull: {
    position: 'absolute',
    zIndex: 10,
    top: '5%',
    left: '90%',
    paddingTop: 5,
  },
});
