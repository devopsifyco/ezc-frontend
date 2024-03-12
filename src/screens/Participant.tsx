import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';


export default function Participant({navigation}: any) {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/icons/arrow-left.png')} />
                </TouchableOpacity>
                <Text style={styles.titles}>Participant</Text>
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
            <View style={styles.listParticipant}>
                <View style={styles.itemParticipant}>
                    <View style={styles.itemInfo}>
                        <View style={styles.InfoDetail}>
                            <Image
                                source={require('../assets/profile/ty.png')}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.name}>Ho Xuan Ty</Text>
                                <Text style={styles.challengemail}>
                                    hoxuanty.pnv@gmail.com
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.itemParticipant}>
                    <View style={styles.itemInfo}>
                        <View style={styles.InfoDetail}>
                            <Image
                                source={require('../assets/profile/ty.png')}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.name}>Ho Xuan Ty</Text>
                                <Text style={styles.challengemail}>
                                    hoxuanty.pnv@gmail.com
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        
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
