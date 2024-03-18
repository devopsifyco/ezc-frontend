import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {
    WarningProps
} from '../models/Button';

export default function WarningComponent({
    title,
    description,
    Action1,
    Action2,
    handleAction2,
    toggleModal
}: WarningProps) {


    return (
        <Modal isVisible={true}>
            <View style={styles.formBackground}>
                <Text style={styles.titleLogout}>{title}</Text>
                <Text style={styles.titleText}>{description}</Text>
                <View style={styles.actionLogout}>
                    <LinearGradient
                        colors={['#FF0A00', '#FF890B']}
                        start={{ x: 0.0, y: 1.5 }}
                        end={{ x: 1.0, y: 0.5 }}
                        style={styles.button}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text>{Action1}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#FF0A00', '#FF890B']}
                        start={{ x: 0.0, y: 0.5 }}
                        end={{ x: 2.0, y: 0.5 }}
                        style={styles.button}>
                        <TouchableOpacity onPress={handleAction2}>
                            <Text >{Action2}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    titleActionChange: {
        fontSize: 14,
        color: '#FF890B',
    },
    titleLarge: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#120D26',
    },
    titleMedium: {
        fontSize: 14,
        marginBottom: 4,
        color: '#120D26',
        opacity: 0.5,
    },
    titleIntersted: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 14,
    },
    arrowMiddle: {
        width: 1,
        height: 45,
        backgroundColor: '#120D26',
    },
    listActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionInteraction: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    formBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#216C53',
        padding: 40,
        borderRadius: 20,
        gap: 10,
    },
    titleLogout: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    titleText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign:"center"
    },
    actionLogout: {
        flexDirection: 'row',
        gap: 20,
    },
    button: {
        height: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
