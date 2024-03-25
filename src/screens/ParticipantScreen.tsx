import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useOneChallenges } from '../hooks/useChallenge';
import { NavigateType } from '../models/Navigations';
import { DataProfile } from '../models/Profile';
import useChallengeCreate from '../hooks/useChallengeCreate';
import useParticipant from '../hooks/useParticipant';
import HeaderChallenge from '../components/HeaderChallenge';

export default function ParticipantScreen({ navigation, route }: NavigateType) {
    const id = route.params;
    const { data, isLoading, isError } = useParticipant({ id });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data) {
            const filtered = data.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredData(filtered);
        }
    }, [searchQuery, data]);


    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="#0000ff" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <HeaderChallenge title='Participant' navigation={navigation} />
            </View>
            <View style={styles.view}>
                <View style={styles.input}>
                    <Image source={require('../assets/icons/ic-search.png')} style={styles.searchIcon} />
                    <TextInput
                        placeholder='Search here...'
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
            {
                filteredData.length > 0 ?
                    (<View style={styles.listParticipant}>
                        {filteredData.map((user: DataProfile) => (
                            <View style={styles.itemParticipant} key={user._id}>
                                <View style={styles.itemInfo}>
                                    <View style={styles.InfoDetail}>
                                        <Image
                                            source={{ uri: user.avatar.downloadLink }}
                                            style={styles.avatar}
                                        />
                                        <View>
                                            <Text style={styles.name}>{user.username}</Text>
                                            <Text style={styles.challengemail}>{user.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>) :
                    (<View style={{ alignItems: 'center', justifyContent: "center" }}>
                        <Image source={require('../assets/images/novarible.png')} style={{ width: 250, height: 250 }} />
                    </View>)
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    listParticipant: {
        marginTop: 5,
        borderRadius: 15,
        marginHorizontal: 20,
    },
    itemParticipant: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        backgroundColor: "#ffff",
        elevation: 20,
        borderRadius: 15,
        flex: 1,
    },

    name: {
        fontWeight: 'bold',
        color: "#000",
        fontSize: 18
    },
    challengemail: {
        color: "#216C53"
    },
    InfoDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 10
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hexagonContainer: {
        marginLeft: 40,
        display: "flex",
    },
    mouthIcon: {
        width: 35,
        height: 35,
    },
    infoDetail: {},
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    titles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#363636',
        marginLeft: '30%',
        margin: 10,
    },
    view: {
        margin: 10,

    },
    input: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,

    },

});



