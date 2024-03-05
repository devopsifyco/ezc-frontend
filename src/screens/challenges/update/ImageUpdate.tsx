import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
    launchImageLibrary,
    ImageLibraryOptions,
    Asset,
} from 'react-native-image-picker';

export interface SelectedImagesProps {
    imageList: { name: string; downloadLink: string }[];
    setSelectedImage: (index: number, uri: string) => void;
    removeImage?: (index: number) => void;
    clearImages?: () => void;
    loadingComponent?: React.ReactElement;

}



const SelectedImages: React.FC<SelectedImagesProps> = ({ imageList, setSelectedImage, removeImage, clearImages, loadingComponent }) => {



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

    const handleClearImages = () => {
        if (clearImages) {
            clearImages();
        }
    };


    return (
        <>
            {imageList?.length > 0 && (
                <TouchableOpacity
                    style={styles.fullWidthContainer}
                    onPress={() => setSelectedImage(0, imageList[0].downloadLink)}>
                    <Image source={{ uri: imageList[0].downloadLink }} style={styles.fullWidthImage} />
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
                {imageList?.slice(1).map((image, index) => (
                    <View key={index + 1}>
                        <TouchableOpacity onPress={() => setSelectedImage(index + 1, image.downloadLink)}>
                            <Image source={{ uri: image.downloadLink }} style={styles.smallImage} />
                        </TouchableOpacity>
                        {removeImage && (
                            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index + 1)}>
                                <Image source={require('../../../assets/icons/delete.png')} style={styles.iconRemove} />
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
        color: '#216C53',
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
        tintColor: '#216C53',
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
