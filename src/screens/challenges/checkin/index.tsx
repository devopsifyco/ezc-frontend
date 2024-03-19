import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRemove, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as Progress from 'react-native-progress';
import useShowParticipants from '../../../hooks/useShowParticipants';
import useCheckIn from '../../../hooks/useCheckInParticipants';
import { useGetOneChallengesApproved } from '../../../hooks/useChallengeApproved';

interface ParticipantsType {
    _id: string;
    username: string;
    email: string;
    avatar: {
        name: string;
        downloadLink: string;
    },
};

export default function CheckIn({ route }: any) {

    const { id } = route.params;
    const { data: dataListParticipants, isPending, } = useShowParticipants(id);
    const { data: statusOfChallenge } = useGetOneChallengesApproved(id);
    const { mutate: checkIn } = useCheckIn();


    if (isPending) {
        return (
            <View style={[styles.loadingItem, styles.displayCenter]}>
                <Progress.CircleSnail color={'grey'} size={65} />
            </View>
        )
    }

    const confirm = (participantId: string) => {
        try {
            const participant = statusOfChallenge.participants.find((participant: { _id: string }) => participant._id === participantId);

            if (participant) {
                checkIn({
                    challengeId: id,
                    checkinData: [{ userId: participant._id, isCheckin: true }]
                });
            } else {
                console.error('Participant not found');
            }
        } catch (error: any) {
            console.error('Error confirming check-in:', error.message);
        }
    };


    const remove = (email: string) => {
        console.log('Remove', email);
    }

    const renderItem = ({ item }: { item: ParticipantsType }) => {
        const participant = statusOfChallenge.participants.find((participant: { _id: string }) => participant._id === item._id);

        return (
            <View style={styles.formContainer}>
                <View style={styles.listeItems}>
                    <View style={styles.item}>
                        <Image source={{ uri: item.avatar.name }} style={styles.itemImage} />
                        <View style={styles.itemDetail}>
                            <Text style={styles.itemName}>{item.username}</Text>
                            {/*<Text style={styles.itemEmail}>{item.email}</Text>*/}
                        </View>
                        <View style={styles.displayOnelineSmall}>
                            {!participant.is_checkin && (
                                <>
                                    <TouchableOpacity style={styles.buttonAccept} onPress={() => confirm(item._id)}>
                                        <FontAwesomeIcon icon={faCheck} size={21} color='#FFF' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonDenied} onPress={() => remove(item._id)}>
                                        <FontAwesomeIcon icon={faRemove} size={24} color='#FFF' />
                                    </TouchableOpacity>
                                </>
                            )}
                            {participant.is_checkin && (
                                <Text style={styles.checkinText}>Checked</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            {dataListParticipants ? (
                <FlatList
                    keyExtractor={(_item, index) => index.toString()}
                    data={dataListParticipants}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.itemEmail}>No one has participated in this challenge yet.</Text>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    formContainer: {
        //paddingTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    listeItems: {
        flex: 1,
    },
    item: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderRadius: 10,
        height: 77,
        borderWidth: 2,
        borderColor: 'grey',
        color: 'grey',
        gap: 5,
    },
    itemDetail: {
        justifyContent: 'center',
        width: '60%',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    itemName: {
        color: '#363636',
        fontSize: 18,
    },
    itemEmail: {
        color: '#7BD6AA',
        fontSize: 12,
    },
    displayOnelineSmall: {
        flexDirection: 'row',
        gap: 8,
    },
    displayOnelineMedium: {
        flexDirection: 'row',
        gap: 20,
    },
    displayOnelineLarge: {
        flexDirection: 'row',
        gap: 50,
    },
    displayCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAccept: {
        backgroundColor: '#FF7A1A',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 2,
    },
    buttonDenied: {
        backgroundColor: '#FF1A1A',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
    },
    loadingItem: {
        flex: 1,
    },
    checkinText: {
        color: '#7BD6AA',
        alignSelf: 'center',
        fontWeight: 'bold',
    }
})