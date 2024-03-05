import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import HeaderChallenge from '../../components/HeaderChallenge';
import { NavigateType } from '../../models/Navigations';
import Pending from './PendingScreen';
import Approve from './ApproveScreen';
import Reject from './RejectScreen';


export default function Status({ navigation, route }: any) {
    const value = route.params;
    const [selectedTab, setSelectedTab] = useState(value);
    useEffect(() => {
        setSelectedTab(value.value);
    },[1000])

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/background-noti.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.header}>
                <HeaderChallenge navigation={navigation} />

            </View>
            <View style={styles.listActions}>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Pending')}
                    style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}>
                    <Text style={[styles.titleLarge, selectedTab == 'Pending' && styles.textSelectedTab]}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Approve')}
                    style={[
                        styles.tab,

                        selectedTab === 'Approve' && styles.selectedTab,
                    ]}>
                    <Text style={[styles.titleLarge, selectedTab == 'Approve' && styles.textSelectedTab]}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Reject')}
                    style={[styles.tab, selectedTab === 'Reject' && styles.selectedTab]}>
                    <Text style={[styles.titleLarge, selectedTab == 'Reject' && styles.textSelectedTab]}>Reject</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'Pending' && <Pending navigation= {navigation} />}
            {selectedTab === 'Approve' && <Approve navigation= {navigation} />}
            {selectedTab === 'Reject' && <Reject navigation= {navigation}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 20,
        backgroundColor: '#'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#120D26',
    },
    numberStatus: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
    },
    itemfllowing: {
        alignItems: 'center',
    },
    itemfllower: {
        alignItems: 'center',
    },
    itemNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#120D26',
    },

    titleLarge: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#697386',
    },
    interestItem: {
        fontSize: 14,
        marginBottom: 4,
        color: '#120D26',
    },
    titleMedium: {
        fontSize: 14,
        marginBottom: 4,
        color: '#120D26',
        opacity: 0.5,
    },
    arrowMiddle: {
        width: 1,
        height: 45,
        backgroundColor: '#120D26',
    },
    interestList: {},
    listActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,

    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    selectedTab: {
        borderBottomWidth: 2,
        borderColor: '#216C53',
        width: 50,

    },
    textSelectedTab: { color: '#216C53', },
    backgroundImage: {
        position: 'absolute',
        resizeMode: 'cover',
    },
});
