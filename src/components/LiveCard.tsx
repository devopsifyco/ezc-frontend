import React, { FC } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import AvatarGroup from './AvatarGroup';
import Moment from 'moment';
import { Challenge } from '../models/InfChallenge';



const LiveCard: FC<Challenge> = ({  Days, title, Address, images_path, isLive, onPress }) => {

    return (
        <View style={{
            width: 230,
            height: 270,
            padding: 10,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            elevation: 5,
            alignItems: 'center',
            marginLeft: 8,
            shadowColor: 'rgba(80, 85, 136, 0.6)',
            marginBottom: 5
        }}>
            <TouchableOpacity onPress={onPress}>
                <View style={{
                    position: 'relative',
                }}>
                    <Image
                        style={{
                            borderRadius: 10,
                            width: 218,
                            height: 150
                        }}
                        source={{ uri: `${images_path?.[0]?.downloadLink}`}} resizeMode="cover" />
                    <View style={{ position: 'absolute', left: 8, top: 8 }}>
                        <Text style={{
                            width: 45,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: 10,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 10,
                            fontWeight: '500',
                            color: "#F0635A",
                            paddingHorizontal: 6,
                            paddingVertical: 8
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: '700' }}>{Moment(Days).format('DD')}</Text>{'\n'}
                            {Moment(Days).format('MMM')}
                        </Text>
                    </View>

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
                    >{isLive ? 'live' : 'off'}</Text>
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
                    <AvatarGroup />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image source={require('../assets/icons/map-pin.png')} />
                        <Text style={{
                            fontSize: 13,
                            marginLeft: 5,
                        }}>{Address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LiveCard