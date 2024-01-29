import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react'

const ListCard = () => {
    return (
        <View style={{
            height: 128,
            padding: 10,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            elevation: 5,
            marginHorizontal: 8,
            shadowColor: 'rgba(80, 85, 136, 0.6)'
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row'
                }}
            >
                <Image style={{ borderRadius: 10, width: 80, height: 100 }} source={require('../assets/images/challenges1.jpg')} />
                <View style={{
                    justifyContent: 'center',
                    paddingVertical: 15,
                    paddingLeft: 35,
                    paddingRight: 10
                }}>
                    <Text style={{
                        color: "#216C53"
                    }}>
                        Wed, Apr 28 • 5:30 PM
                    </Text>
                    <Text numberOfLines={1} style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: "#000000",
                        marginBottom: 15,
                    }}>
                        Timmy : Singles' Day Gifts
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../assets/icons/map-pin.png')} />
                        <Text style={{
                            fontSize: 13,
                            marginLeft: 5,
                        }}>Phuoc My • Son Tra • Da Nang</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default ListCard