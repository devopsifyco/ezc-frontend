import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import useDonateHistore from '../../hooks/useDonateHistore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarCheck, faClock } from '@fortawesome/free-solid-svg-icons';

export default function DonationHistory() {
    const { data, error, isPending } = useDonateHistore();

    const renderItem = ({ item }: { item: any }) => {
        const createdDate = new Date(item.created_at);
        const currentDate = new Date();
        const timeDiff = (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
        const formattedDate = new Date(item.created_at).toLocaleString();
        let timeDisplay;
        if (timeDiff < 1) {
            timeDisplay = 'Just now';
        } else {
            timeDisplay = timeDiff < 2 ? `${Math.floor(timeDiff)} day ago` : `${Math.floor(timeDiff)} days ago`;
        }
        return (
            <View style={styles.listItem}>
                <Text style={styles.item}>Donated {item.points_donated} Points</Text>
                <View style={styles.displayCenter}>
                    <FontAwesomeIcon icon={faCalendarCheck} color='#FF890B' />
                    <Text style={styles.item}>{formattedDate}</Text>
                </View>
                <Text style={styles.item}>Message " {item.message}. "</Text>
                <View style={styles.displayCenter}>
                    <FontAwesomeIcon icon={faClock} color='#216C53' />
                    <Text style={styles.item}>{timeDisplay}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title='Donation History' />
            <View style={styles.containerContent}>
                {isPending && <Text>Loading...</Text>}
                {error && <Text>Error: {error.message}</Text>}
                <FlatList
                    data={data || []}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.flatList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        paddingHorizontal: 16,
    },
    flatList: {
        paddingBottom: 20,
        gap: 10,
    },
    listItem: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        gap: 12,
    },
    item: {
        color: '#747688'
    },
    displayCenter: {
        alignContent: 'center',
        flexDirection: 'row',
        gap: 8,
    }
});
