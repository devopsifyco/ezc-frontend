import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { NavigateType } from '../../models/Navigations';
import {
    useGetHasJoinedChallenges
} from '../../hooks/useChallenge';
import Moment from 'moment';
import { Challenge } from '../../models/InfChallenge';


export default function JoinedScreen({ navigation }: NavigateType) {

    const { data: hasJoined, isPending: loadingHasJoined, mutate: getHasJoined } = useGetHasJoinedChallenges();

    useEffect(() => {
        getHasJoined();
    }, [getHasJoined]);

    const handlePress = (id: string) => {
        navigation.navigate('ChallengeDetail', { id, isJoined: true });
    };


    return (
        <View style={styles.container}>
            {loadingHasJoined ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={styles.listItems}>
                    <View style={styles.listItems}>
                        {hasJoined?.userChallenges?.map((challenge: Challenge, index: number) => (
                            <TouchableOpacity style={styles.item} key={index} onPress={() => handlePress(challenge._id)}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: challenge.images_path[0].downloadLink }}
                                />
                                <View style={styles.detailItems}>
                                    <Text style={styles.time}>
                                        {Moment.utc(challenge.start_time).format('ddd, MMM DD • LT')} - {Moment.utc(challenge.end_time).format('LT')}
                                    </Text>
                                    <View style={styles.times_group}>
                                        <View style={styles.listItemDetail}>
                                            <Text style={styles.detail}>Challenge: {challenge.title}</Text>
                                            <View style={styles.times_group}>
                                                <Image source={require('../../assets/icons/locationdetail.png')} />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "#363636"
                                                }}>{challenge.address}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text style={styles.hour}>1m ago.</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView >
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 10,
    },
    listItems: {
        rowGap: 5,
    },
    displayCenter: {
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
        borderRadius: 15,

    },
    listItemDetail: {
        width: '80%',
    },
    detailItems: {
        backgroundColor: '#FFFFFF',
        width: 260,
        paddingLeft: 20,
    },
    image: {
        width: 60,
        height: 79,
        borderRadius: 10,
    },

    time: {
        color: '#216C53',
        fontSize: 12,
        fontWeight: 'bold',
    },
    hour: {
        color: '#6C6C6C',
        fontSize: 12,
        fontWeight: 'bold',
    },
    detail: {
        color: '#120D26',
        fontSize: 15.5,
        fontWeight: 'bold',
        width: '90%',
    },
    address: {
        fontSize: 13,
        marginLeft: 4,
        fontWeight: "bold",
        color: '#747688',
    },
    editGroup: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        paddingVertical: 5
    },
    times_group: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 12,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,

    },
    seeAll: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    sectionName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#120D26',
    },
});