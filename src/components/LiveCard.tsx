import React,{FC} from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';


interface LiveCardProps {
    date: string;
    isLive: boolean;
    title: string;
    location: string;
    images: ImageSourcePropType;
}


const LiveCard:FC<LiveCardProps> = ({ date, isLive, title, location, images }) => {
    return (
        <View style={{
            width: 230,
            height:230,
            padding: 10,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            elevation: 5,
            alignItems: 'center',
            marginLeft: 8,
            shadowColor: 'rgba(80, 85, 136, 0.6)'
        }}>
            <TouchableOpacity>
                <View style={{
                    position: 'relative',
                }}>
                    <Image style={{ borderRadius: 10, width:218, height:150 }} source={{uri: 'https://cdn.photographylife.com/wp-content/uploads/2018/11/Moeraki-Boulders-New-Zealand.jpg'}} resizeMode="cover"  />
                    <Text style={{
                        position: 'absolute',
                        width: 45,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 10,
                        left: 8,
                        top: 8,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontSize: 10,
                        fontWeight: '500',
                        color: "#F0635A",
                        paddingHorizontal: 6,  
                        paddingVertical: 8

                    }}> <Text style={{ fontSize: 18, fontWeight: '700' }}>10</Text> june</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: 10,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 18,
                            fontWeight: '500',
                            color: "#F0635A",
                            paddingHorizontal: 6,
                            paddingVertical: 8
                        }}
                    >{isLive ? 'live' : 'offline'}</Text>
                </View>

                <View style={{
                    paddingHorizontal: 6,
                    justifyContent: 'center',
                    paddingVertical: 15
                }}>
                    <Text numberOfLines={1} style={{
                        fontSize: 18,
                        fontWeight: '500',
                        color: "#000000",
                    }}>
                         {title}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../assets/icons/map-pin.png')} />
                        <Text style={{
                            fontSize: 13,
                            marginLeft: 5,
                        }}>{location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LiveCard