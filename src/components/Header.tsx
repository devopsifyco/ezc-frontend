import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title }: { title: string }) {
    const navigation = useNavigation();
    const handleGoBack = () => navigation.goBack();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} size={26} color='#4F4F4F' />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4F4F4F',
        textAlign: 'center',
    },
});
