import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import Header from '../../components/Header';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../components/Button';
import useProfile from '../../hooks/useProfile';
import useDonate from '../../hooks/useDonate';
import { useNavigation } from '@react-navigation/native';

export default function DonationScreen() {
    const navigation = useNavigation();
    const { data: userData } = useProfile();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const [defaultMessage, setDefaultMessage] = useState(``);
    const userPoints = userData?.points || 0;
    const { mutate: handleSendPoints } = useDonate();

    useEffect(() => {
        if (userData) {
            setDefaultMessage(`${userData.username} send points`);
            setValue('message', `${userData.username} send points`)
        }
    }, [userData, setValue]);

    const onSubmit = (data: any) => {
        handleSendPoints(data, {
            onSuccess: () => {
                navigation.goBack();
            }
        });
    };

    return (
        <View style={styles.container}>
            <Header title='Donate' />
            <View style={styles.contentContainer}>
                <View style={styles.userInfoDanate}>
                    <View style={styles.userInfoDetail}>
                        <Text style={styles.textLarge}>Information</Text>
                        <Text style={styles.textName}>{userData?.username}</Text>
                        <Text style={styles.textNormal}>Your points</Text>
                        <Text style={styles.textNormal}>{userData?.points}</Text>
                    </View>
                    <Image
                        source={userData?.avatar.name ? { uri: userData.avatar.name } : require('../../assets/profile/defaultAvatar.jpg')}
                        style={styles.userImage}
                    />
                </View>

                <View style={styles.setPoints}>
                    <View style={styles.displayOneLine}>
                        <Text style={styles.textLarge}>Set points</Text>
                        {errors.points && <Text style={styles.errorText}>{errors.points.message}</Text>}
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Enter number of points'
                                placeholderTextColor='#BDBDBD'
                                keyboardType='numeric'
                            />
                        )}
                        name="points"
                        rules={{
                            required: '*',
                            validate: value => parseInt(value, 10) <= userPoints || `Out of your points!`
                        }}
                        defaultValue=""
                    />
                </View>
                <View style={styles.setMessage}>
                    <Text style={styles.textLarge}>Message</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.inputMessage}
                                onBlur={() => {
                                    onBlur();
                                    if (!value.trim()) {
                                        setValue('message', defaultMessage);
                                    }
                                }}
                                onChangeText={onChange}
                                value={value}
                                placeholder='Enter message'
                                placeholderTextColor='#BDBDBD'
                                multiline={true}
                            />
                        )}
                        name="message"
                        defaultValue={defaultMessage}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <Button title='Donate Now' onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    userInfoDanate: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userInfoDetail: {
        gap: 10,
    },
    sendPoints: {
        marginTop: 20,
    },
    setPoints: {
        marginTop: 20,
    },
    setMessage: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginTop: 5,
        color: '#000000',
    },
    inputMessage: {
        height: 60,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginTop: 5,
        color: '#000000',
    },
    errorText: {
        color: 'red',
        marginTop: 2,
        fontSize: 16,
    },
    textNormal: {
        color: '#000000',
        fontSize: 14,
    },
    textLarge: {
        color: '#BDBDBD',
        fontSize: 18,
        fontWeight: 'bold',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        paddingHorizontal: 20,
        top: 45,
    },
    displayOneLine: {
        flexDirection: 'row',
        gap: 4,
    },
    textName: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
