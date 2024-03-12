import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './EditProfile';

const ImagePickerButton = ({ onImageSelect, currentImage }) => {
    const handleImagePicker = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const selectedUri = response.assets[0].uri;
                onImageSelect(selectedUri);
            } else {
                console.log('User cancelled image picker or there was an error');
            }
        });
    };

    return (
        <TouchableOpacity onPress={handleImagePicker}>
            <Image source={{ uri: currentImage }} style={styles.profileImage} />
            <Image source={require('../../assets/icons/edit-profile.png')} style={styles.iconEdit} />
        </TouchableOpacity>
    );
};

export default ImagePickerButton;
