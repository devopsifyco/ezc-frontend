import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { NavigateType } from '../../../models/Navigations';
import { styles } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Header({ navigation }: NavigateType) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faHome} size={28} color='#FF890B' />
            </TouchableOpacity>
            <View style={styles.displayCenter}>
                <Text style={styles.titleLarge}>Create Challenges</Text>
            </View>
        </View>
    )
}
