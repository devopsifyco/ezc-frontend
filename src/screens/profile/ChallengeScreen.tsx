import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigateType } from '../../models/Navigations';
import { useGetAllChallengesPending } from '../../hooks/useChallenge';
import { Challenge } from '../../models/InfChallenge';
import { isDate } from 'moment';

export default function ChallengeScreen({ navigation }: NavigateType) {

  const { data: challengespending, mutate } = useGetAllChallengesPending();

  useEffect(() => {
    mutate();
  }, [mutate]);


  const handleEditPress = (id: string) => {
    navigation.navigate('UpdateChallenge', { id });
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.listItems}>
        {challengespending?.map((challenge: Challenge , index: number) => (
          <View key={index} style={styles.item}>
            <Image style={styles.image} source={require('../../assets/profile/Sa.jpg')} />
            <View style={styles.detailItems}>
              <Text style={styles.time}>{challenge.Days}</Text>
              <Text style={styles.detail}>{challenge.title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEditPress(challenge._id)}>
              <Image style={styles.icon_edit} source={require('../../assets/icons/edit.png')} />
            </TouchableOpacity>
          </View>
        ))}
     
        {/*<View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/profile/Sa.jpg')}
          />
          <View style={styles.detailItems}>
            <Text style={styles.time}>May- Sat -2:00 PM</Text>
            <Text style={styles.detail}>A virtual evening of smooth jazz</Text>
          </View>
        </View>*/}
        {/*<View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/profile/Sa.jpg')}
          />
          <View style={styles.detailItems}>
            <Text style={styles.time}>May- Sat -2:00 PM</Text>
            <Text style={styles.detail}>A virtual evening of smooth jazz</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/profile/Sa.jpg')}
          />
          <View style={styles.detailItems}>
            <Text style={styles.time}>May- Sat -2:00 PM</Text>
            <Text style={styles.detail}>A virtual evening of smooth jazz</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/profile/Sa.jpg')}
          />
          <View style={styles.detailItems}>
            <Text style={styles.time}>May- Sat -2:00 PM</Text>
            <Text style={styles.detail}>A virtual evening of smooth jazz</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/profile/Sa.jpg')}
          />
          <View style={styles.detailItems}>
            <Text style={styles.time}>May- Sat -2:00 PM</Text>
            <Text style={styles.detail}>A virtual evening of smooth jazz</Text>
          </View>
        </View>*/}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  listItems: {
    //gap: 20,
    rowGap: 20,
  },
  item: {
    flexDirection: 'row',
    //gap: 20,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: 15,
    position: "relative",
    marginTop:5
  },
  detailItems: {
    backgroundColor: 'red',
    width: 260,
    paddingLeft: 20,
  },
  image: { width: 50, height: 50 },
  time: {
    color: '#216C53',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detail: {
    color: '#120D26',
    fontSize: 18,
    fontWeight: 'bold',
    width: '90%',
  },
  icon_edit: {
    position: "absolute",
    right: 10
  }
});
