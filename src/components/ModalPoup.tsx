import { ActivityIndicator, Animated, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'



const ModalPoup = ({ visible, children, delay = 1500 }: { visible: any, children: React.ReactNode, delay?: number }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const [isLoading, setIsLoading] = React.useState(false);

    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setIsLoading(true); 
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                stiffness: 50,
                damping: 10,
                useNativeDriver: true,
                delay: delay
            }).start(() => {
                setIsLoading(false);
            });
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                {isLoading && (
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                    </View>
                )}
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}

export default ModalPoup

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    activityIndicatorContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }

})