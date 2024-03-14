import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, FlatList, Button } from 'react-native';
import {
    launchImageLibrary,
    ImageLibraryOptions,
    Asset,
} from 'react-native-image-picker';

export interface SelectedImagesProps {
    imageList: any[];
    onImagesSelected: (images: Asset[]) => void
    removeImage?: (index: number) => void;
    clearImages?: () => void;
    initialImageURL?: { name: string; downloadLink: string; }[];

}



const SelectedImages: React.FC<SelectedImagesProps> = ({ imageList, onImagesSelected, removeImage, clearImages, initialImageURL }) => {

    const [selectedImages, setSelectedImages] = useState<Asset[]>([])



    const imagePickerHandler = () => {
        let options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        };

        // launchImageLibrary(options, response => {
        //     if (response.assets) {
        //         response.assets.forEach((asset, index) => {
        //             setSelectedImage(index + imageList.length, asset);
        //         });
        //     } else {
        //         console.log('No images selected.');
        //     }
        // });

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else {
                const newImages: Asset[] = [...selectedImages, ...(response.assets ?? [])];
                setSelectedImages(newImages);
                onImagesSelected(newImages);
            }
        })


    };

    const renderSelectedImages = ({ item }: { item: Asset }) => (
        <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
    );


    // const handleClearImages = () => {
    //     if (clearImages) {
    //         clearImages();
    //     }
    // };

    // const [backup_imageList, setBackup_imageList] = useState({});


    // const removeFirstImage = (array: any) => {
    //     array.shift();
    //     setBackup_imageList(array)
    // }

    const renderInitialImage = () => {
        if (!initialImageURL) return null;

        return initialImageURL.map((imageData, index) => (
            <Image key={index} source={{ uri: imageData.downloadLink }} style={{ width: 200, height: 200 }} />
        ));
    };


    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {renderInitialImage()}
                <FlatList
                    data={selectedImages}
                    renderItem={renderSelectedImages}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                />
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
                </View>
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
