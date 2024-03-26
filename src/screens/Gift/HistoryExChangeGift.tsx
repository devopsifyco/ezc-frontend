import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { NavigateType } from '../../models/Navigations';
import HeaderChallenge from '../../components/HeaderChallenge';
import { HistoryExChangeGiftData } from '../../models/infGifts';
import { useHistoryExChangeGift } from '../../hooks/useGift';
import Moment from 'moment';
import 'moment/locale/vi';
Moment.locale('vi');

export default function HistoryExChangeGift({ navigation }: NavigateType) {

    const { data: HistoryGifts } = useHistoryExChangeGift()

    const renderTime = (time: Date) => {
        const currentTime = Moment();
        const timeDiff = Moment.duration(currentTime.diff(time));

        if (timeDiff.asSeconds() < 60) {
            return 'just now';
        } else if (timeDiff.asMinutes() < 60) {
            return `${Math.floor(timeDiff.asMinutes())} minutes ago`;
        } else if (timeDiff.asHours() < 24) {
            return `${Math.floor(timeDiff.asHours())} hours ago`;
        } else if (timeDiff.asDays() < 2) {
            return 'yesterday';
        } else if (timeDiff.asDays() < 7) {
            return `${Math.floor(timeDiff.asDays())} days ago`;
        } else {
            return Moment(time).format('ddd, MMM DD • LT');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <HeaderChallenge navigation={navigation} title='Gifts Exchange History' />
            </View>
            <View style={styles.contain}>
                {HistoryGifts && HistoryGifts.length > 0 ? (
                    HistoryGifts.map((Gift: HistoryExChangeGiftData, index: number) => (
                        <View key={index} style={styles.list}>
                            <View style={styles.image}>
                                <Image
                                    source={{ uri: Gift.gift.image.downloadLink }}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name}>{Gift.gift.name}</Text>
                                <View style={styles.pointGroup}>
                                    <Text style={styles.point}>Points:</Text>
                                    <Text style={[styles.text15, { color: "#216C53" }]}>
                                        {Gift.gift.points_required}
                                    </Text>
                                </View>
                                <Text style={{
                                    color: "#216C53",
                                    fontStyle:"italic"
                                }}>
                                    {renderTime(Gift.redeemed_at)}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyList}>
                        <Text style={styles.emptyText}>No history available</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 20
    },
    contain: {
        display: "flex",
        flexDirection: "column",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        borderColor: "#ccc",
        alignItems: "center",
        borderRadius: 15,
        marginHorizontal: 10,
        shadowColor: "#000",
        marginTop: 10,
        borderWidth: 2,
    },
    image: {
        padding: 10
    },
    avatar: {
        width: 75,
        height: 100,
        borderRadius: 10

    },
    info: {
        marginLeft: 20,
    },
    name: {
        color: "#216C53",
        fontWeight: "bold"
    },
    pointGroup: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 8
    },
    point: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
    },
    num: {
        color: "#216C53",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    des: {
        maxWidth: '85%',
        overflow: 'hidden',
        marginTop: 10,
        width: 250,
        fontSize: 13
    },
    text15: {
        fontSize: 15
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#747688',
        textAlign: 'center',
    },
});
