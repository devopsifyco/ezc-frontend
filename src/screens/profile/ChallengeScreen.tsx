import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigateType } from '../../models/Navigations';
import { useGetAllChallengesPending, useGetAllChallengesApproved, useGetAllChallengesRejected } from '../../hooks/useChallenge';
import { Challenge } from '../../models/InfChallenge';
import Moment from 'moment';


export default function ChallengeScreen({ navigation }: NavigateType) {
  const { data: challengespending, mutate: mutatePending, isPending: loadingPending } = useGetAllChallengesPending();
  const { data: challengesApproved, mutate: mutateApproved, isPending: loadingApproved } = useGetAllChallengesApproved();
  const { data: challengesRejected, mutate: mutateRejected, isPending: loadingRejected } = useGetAllChallengesRejected();


  useEffect(() => {
    mutatePending();
    mutateApproved();
    mutateRejected();
  }, [mutatePending, mutateApproved, mutateRejected]);

  
  const handlePress = (id: string) => {
    navigation.navigate('ChallengeDetail', { id });
  };

  const handleEditPress = (id: string) => {
    navigation.navigate('UpdateChallenge', { id });
  }

  return (
    <View style={styles.container}>
      {loadingPending || loadingApproved || loadingRejected ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.listItems}>
          <View style={styles.section}>
            <Text style={styles.sectionName}>Pending</Text>
            <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate('Status', { value: 'Pending' })}>
              <Text>See All</Text>
              <Image source={require('../../assets/icons/iconSeeAll.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.listItems}>
            {challengespending?.map((challenge: Challenge, index: number) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => handlePress(challenge._id)}>
                <Image
                  style={styles.image}
                  source={{ uri: challenge.images_path[0].downloadLink }}
                />
                <View style={styles.detailItems}>
                  <Text style={styles.time}>
                    {Moment(challenge.start_time).format('ddd, MMM DD • LT')} - {Moment(challenge.end_time).format('LT')}
                  </Text>
                  <View style={styles.times_group}>
                    <View style={styles.listItemDetail}>
                      <Text style={styles.detail}>Challenge: {challenge.title}</Text>
                      <View style={styles.times_group}>
                        <Image source={require('../../assets/icons/locationdetail.png')} />
                        <Text style={{
                          fontSize: 12,
                          color: "#363636"
                        }}>{challenge.address}</Text>
                      </View>
                    </View>
                    <View style={styles.displayCenter}>
                      <TouchableOpacity onPress={() =>handleEditPress(challenge._id)}>
                        <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                      </TouchableOpacity>
                      <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                    </View>
                  </View>
                  <Text style={styles.hour}>1m ago.</Text>
                </View>
              </TouchableOpacity>
            ))}
            

            {/* ------------------------------------ */}
            <View style={styles.section}>
              <Text style={styles.sectionName}>Approved</Text>
              <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate('Status', { value: 'Approve' })}>
                <Text>See All</Text>
                <Image source={require('../../assets/icons/iconSeeAll.png')} />
              </TouchableOpacity>
            </View>
            {challengesApproved?.map((challenge: Challenge, index: number) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => handlePress(challenge._id)}>
                <Image
                  style={styles.image}
                  source={{ uri: challenge.images_path[0].downloadLink }}
                />
                <View style={styles.detailItems}>
                  <Text style={styles.time}>
                    {Moment(challenge.start_time).format('ddd, MMM DD • LT')} - {Moment(challenge.end_time).format('LT')}
                  </Text>
                  <View style={styles.times_group}>
                    <View style={styles.listItemDetail}>
                      <Text style={styles.detail}>Challenge: {challenge.title}</Text>
                      <View style={styles.times_group}>
                        <Image source={require('../../assets/icons/locationdetail.png')} />
                        <Text style={{
                          fontSize: 12,
                          color: "#363636"
                        }}>{challenge.address}</Text>
                      </View>
                    </View>
                    <View style={styles.displayCenter}>
                      <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                      <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                    </View>
                  </View>
                  <Text style={styles.hour}>1m ago.</Text>
                </View>
              </TouchableOpacity>
            ))}


            {/* -------------------------------------- */}
            <View style={styles.section} >
              <Text style={styles.sectionName}>Rejected</Text>
              <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate('Status', { value: 'Reject' })}>
                <Text>See All</Text>
                <Image source={require('../../assets/icons/iconSeeAll.png')} />
              </TouchableOpacity>
            </View>
            {challengesRejected?.map((challenge: Challenge, index: number) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => handlePress(challenge._id)}>
                <Image
                  style={styles.image}
                  source={{ uri: challenge.images_path[0].downloadLink }}
                />
                <View style={styles.detailItems}>
                  <Text style={styles.time}>
                    {Moment(challenge.start_time).format('ddd, MMM DD • LT')} - {Moment(challenge.end_time).format('LT')}
                  </Text>
                  <View style={styles.times_group}>
                    <View style={styles.listItemDetail}>
                      <Text style={styles.detail}>Challenge: {challenge.title}</Text>
                      <View style={styles.times_group}>
                        <Image source={require('../../assets/icons/locationdetail.png')} />
                        <Text style={{
                          fontSize: 12,
                          color: "#363636"
                        }}>{challenge.address}</Text>
                      </View>
                    </View>
                    <View style={styles.displayCenter}>
                      <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                      <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                    </View>
                  </View>
                  <Text style={styles.hour}>1m ago.</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView >
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  listItems: {
    rowGap: 5,
  },
  displayCenter: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderRadius: 15,
    position: "relative",
    marginTop:5

  },
  listItemDetail: {
    width: '80%',
  },
  detailItems: {
    backgroundColor: '#FFFFFF',
    width: 260,
    paddingLeft: 20,
  },
  image: {
    width: 60,
    height: 79,
    borderRadius: 10,
  },

  time: {
    color: '#216C53',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hour: {
    color: '#6C6C6C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detail: {
    color: '#120D26',
    fontSize: 15.5,
    fontWeight: 'bold',
    width: '90%',
  },
  icon_edit: {
    position: "absolute",
    right: 10
  },
  address: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "bold",
    color: '#747688',
  }
  ,
  editGroup: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 5
  },
  times_group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 12,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,

  },
  seeAll: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  sectionName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#120D26',
  },
});
