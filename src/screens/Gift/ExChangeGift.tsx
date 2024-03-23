import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ButtonChallenge from '../../components/ButtonChallenge';
import HeaderChallenge from '../../components/HeaderChallenge';
import { NavigateType } from '../../models/Navigations';

const ExChangeGift = ({navigation}: NavigateType) => {
    const [text, onChangeText] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.wrap_header}>
                <HeaderChallenge title='Address' navigation={navigation} />
            </View>
            <View style={styles.wrap_content}>
                <View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Full name </Text>
                        <TextInput
                            onChangeText={onChangeText}
                            value={text}
                            style={styles.ButtonInput}
                        />
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Email Address</Text>
                        <TextInput
                            onChangeText={onChangeText}
                            value={text}
                            style={styles.ButtonInput}
                        />
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Phone Number</Text>
                        <TextInput
                            onChangeText={onChangeText}
                            value={text}
                            style={styles.ButtonInput}
                        />
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Address</Text>
                        <TextInput
                            onChangeText={onChangeText}
                            value={text}
                            style={styles.ButtonInput}
                        />
                    </View>
                </View>
                <View style={styles.wrap_content__card}>
                    <Text style={[styles.text15, { fontWeight: "600", color: "#000000" }]}>Product information</Text>
                    <View style={styles.wrap_Card}>
                        <View >
                            <Image
                                source={require('../../assets/images/note.png')}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.wrap_detail} >
                            <Text style={[styles.text15, { color: "#216C53" }]}>Sách - Sức mạnh tình yêu</Text>
                            <View style={[styles.wrap_point]}>
                                <Text style={[styles.text15, { fontWeight: "bold", color: "#120D26" }]}>Points:</Text>
                                <Text style={[styles.text15, { color: "#216C53" }]}>30</Text>
                            </View>
                            <View style={styles.wrap_point}>
                                <Text style={[styles.text15, { fontWeight: "bold", color: "#120D26" }]}>Quantity:</Text>
                                <Text style={[styles.text15, { color: "#216C53" }]}>1</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.wrap_footer}>
                <View style={styles.buttonContainer}>
                    <ButtonChallenge
                        buttonStyle={styles.ButtonStyle}
                        title='Exchange Gifts'
                        onPress={() =>{}}
                    />
                </View>
            </View>
        </View>
    )
}

export default ExChangeGift

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        flexDirection: "column"
    },
    wrap_header: {
        flex: 1 / 2
    },
    wrap_content: {
        flex: 8
    },
    wrap_footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    wrap_input: {
        marginTop: 15
    },
    ButtonInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#363636',
        width: '100%',
        height: 50,
        marginTop: 8
    },
    wrap_content__card:{
        marginTop:18
    },
    wrap_Card: {
        width: "100%",
        height: 126,
        padding: 10,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        shadowColor: 'rgba(80, 85, 136, 0.6)',
        marginBottom: 5,
        flexDirection: "row",
        gap: 30,
        marginTop: 20
    },
    imageStyle: {
        width: 75,
        height: 103,
        borderRadius: 5
    },
    textBold18: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000'
    },
    text15: {
        fontSize: 15,
    },
    wrap_detail: {
        flexDirection: "column",
        justifyContent: "center",
    },
    wrap_point: {
        flexDirection: "row",
        gap: 5,
        marginTop: 10
    },
    ButtonStyle: {
        borderRadius: 50,
    },
    buttonContainer: {
        width: '70%',
        paddingHorizontal: 20,
    },
})