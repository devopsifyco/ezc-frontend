import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ButtonChallenge from '../../components/ButtonChallenge';
import HeaderChallenge from '../../components/HeaderChallenge';
import { NavigateType } from '../../models/Navigations';
import { useOneGift, useExchangeGift } from '../../hooks/useGift';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExChangeData } from '../../models/infGifts';


const ExChangeGift = ({ navigation, route }: NavigateType) => {
    const { giftId } = route.params;
    const { data: Gifts } = useOneGift(giftId);
    const { mutate: DataExChangeGift } = useExchangeGift();
    const [emailInput, setEmailInput] = useState<string>('');

    const getEmailUser = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const formatemail = email ? email.replace(/["']/g, '') : '';
            return formatemail;
        } catch (error) {
            console.error('Lỗi khi lấy email từ AsyncStorage:', error);
            return null;
        }
    };

    getEmailUser().then((email) => {
        if (email != null) {
            setEmailInput(email)
        }
    })

    useEffect(() => {
        setDataInput(initialData);
    }, [emailInput]);

    
    const initialData: ExChangeData = {
        email: emailInput,
        gift_id: giftId,
        fullname: '',
        phone: '',
        address: ''
    }

    const {
        name,
        points_required,
        image
    } = Gifts || {};

    const [dataInput, setDataInput] = useState<ExChangeData>(initialData);
    const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
    
    const handleExchangeGift = async () => {
        try {
            
            const inputValidationErrors: Record<string, string> = {};
            Object.keys(dataInput).forEach(key => {
                if (!dataInput[key]) {
                    inputValidationErrors[key] = 'Vui lòng nhập trường này';
                }
            });

            if (dataInput.phone && dataInput.phone.length > 11) {
                inputValidationErrors['phone'] = 'Số điện thoại chỉ được tối đa 11 số';
            }

            if (Object.keys(inputValidationErrors).length > 0) {
                setInputErrors(inputValidationErrors);
            } else {
                await DataExChangeGift({ ...dataInput });
            }
        } catch (error) {
            console.log("Error exchanging gift:", error);
        }
    }

    const handleInput = (name: string, value: string) => {
        const newInputData = {
            ...dataInput,
            [name]: value
        };

        setDataInput(newInputData);

        let newErrors: Record<string, string> = {};

        if (name === 'phone' && value.length > 11) {
            newErrors[name] = 'Số điện thoại chỉ được tối đa 11 số';
        } else if (value.trim() === '') {
            newErrors[name] = 'Vui lòng nhập trường này';
        } else {
            delete newErrors[name];
        }

        setInputErrors(newErrors);
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrap_header}>
                <HeaderChallenge title='Address' navigation={navigation} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.wrap_content}>
                <View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Full name<Text style={styles.errorText}>{inputErrors.fullname && '*'}</Text></Text>
                        <TextInput
                            onChangeText={(value) => handleInput('fullname', value)}
                            value={dataInput.fullname}
                            style={styles.ButtonInput}
                        />
                        {inputErrors.fullname && <Text style={styles.errorText}>{inputErrors.fullname}</Text>}
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Email Address</Text>
                        <TextInput
                            value={emailInput}
                            style={styles.ButtonInput}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Phone Number<Text style={styles.errorText}>{inputErrors.phone && '*'}</Text></Text>
                        <TextInput
                            onChangeText={(value) => handleInput('phone', value)}
                            value={dataInput.phone}
                            style={styles.ButtonInput}
                            keyboardType='numeric'
                        />
                        {inputErrors.phone && <Text style={styles.errorText}>{inputErrors.phone}</Text>}
                    </View>
                    <View style={styles.wrap_input}>
                        <Text style={styles.textBold18}>Address<Text style={styles.errorText}>{inputErrors.address && '*'}</Text></Text>
                        <TextInput
                            onChangeText={(value) => handleInput('address', value)}
                            value={dataInput.address}
                            style={styles.ButtonInput}
                        />
                        {inputErrors.address && <Text style={styles.errorText}>{inputErrors.address}</Text>}
                    </View>
                </View>
                <View style={styles.wrap_content__card}>
                    <Text style={[styles.text15, { fontWeight: "600", color: "#000000" }]}>Product information</Text>
                    <View style={styles.wrap_Card}>
                        <View>
                            <Image
                                source={{ uri: image?.downloadLink }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.wrap_detail} >
                            <Text style={[styles.text15, { color: "#216C53" }]}>{name}</Text>
                            <View style={[styles.wrap_point]}>
                                <Text style={[styles.text15, { fontWeight: "bold", color: "#120D26" }]}>Points:</Text>
                                <Text style={[styles.text15, { color: "#216C53" }]}>{points_required}</Text>
                            </View>
                            <View style={styles.wrap_point}>
                                <Text style={[styles.text15, { fontWeight: "bold", color: "#120D26" }]}>Quantity:</Text>
                                <Text style={[styles.text15, { color: "#216C53" }]}>1</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.wrap_footer}>
                    <View style={styles.buttonContainer}>
                        <ButtonChallenge
                            buttonStyle={styles.ButtonStyle}
                            title='Exchange Gifts'
                            onPress={handleExchangeGift}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ExChangeGift;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:13,
        paddingTop:13,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    wrap_header: {
        marginBottom:20
    },
    wrap_content: {
    },
    wrap_footer: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 20,

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
    wrap_content__card: {
        marginTop: 18
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
        height:50
    },
    buttonContainer: {
        width: '70%',
        paddingHorizontal: 20,
        marginBottom: 20 
    },
    errorText: {
        color:"red"
    }
})
