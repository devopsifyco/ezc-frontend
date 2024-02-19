import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'


const items = [
    
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',

]

const AvatarGroup = () => {
    const maxDisplayCount = 3;
    const displayItems = items.slice(0, maxDisplayCount); 
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.avatarSMWrapper}>
                    {displayItems.map((uri, index) => (
                        <Image
                            key={index}
                            source={{ uri }}
                            style={[
                                styles.avatarSM,
                                { marginLeft: index > 0 ? -8 : 0 },
                            ]}
                        />
                    ))}

                    {items.length > maxDisplayCount && (
                        <View style={styles.additionalCount}>
                            <Text style={styles.additionalCountText}>+{items.length - maxDisplayCount}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default AvatarGroup

const styles = StyleSheet.create({
    container: {
    },
    content: {
        height: 30,
        justifyContent: 'flex-start',
    },
    avatarSMWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatarSM: {
        width: 24,
        height: 24,
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: '#fff',
    },
    additionalCount: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 12,
        marginLeft: -8, 
        padding: 4,
        borderWidth: 1,
        borderColor: '#fff',

    },
    additionalCountText: {
        color: '#fff',
        fontSize: 10,
    },
});