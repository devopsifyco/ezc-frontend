import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { NavigateType } from '../../models/Navigations';
import Moment from 'moment';
import { useDeleteChallenges, useGetAllChallengesByStatus } from '../../hooks/useChallenge';
import { Challenge } from '../../models/InfChallenge';
import { useQueryClient } from '@tanstack/react-query';
import WarningComponent from '../../components/WarningComponent';


interface ChallengeScreenProps {
  navigation: NavigateType;
  desiredOwnerId: string;
}

export default function RejectScreen({ navigation, desiredOwnerId }: ChallengeScreenProps) {

  const queryClient = useQueryClient();
  const { data: challengesRejected, isLoading: loadingRejected } = useGetAllChallengesByStatus('rejected');
  const { mutateAsync: deleteChallenge } = useDeleteChallenges();

  const showRejectChallengeOfOwner: Challenge[] = challengesRejected ? challengesRejected.filter((challenge: Challenge) => challenge.owner_id === desiredOwnerId) : [];


  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handlePress = (id: string) => {
    navigation.navigate('ChallengeDetail', { id });
  };


  const handleDelete = async () => {
    try {
      await deleteChallenge({ id: selectedId });
      queryClient.invalidateQueries({ queryKey: ['challenges', 'rejected'] });
      toggleModal(null);
    } catch (error) {
      console.error('Error delete challenge:', error);
    }
  };

  const toggleModal = (id: string | null = null) => {
    setSelectedId(id);
    setModalVisible(!isModalVisible);
  };



  return (
    <View style={styles.container}>
      {loadingRejected ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.listItems}>
          <View style={styles.listItems}>
            {showRejectChallengeOfOwner?.map((challenge: Challenge, index: number) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => handlePress(challenge._id)}>
                <Image
                  style={styles.image}
                  source={{ uri: challenge.images_path[0].downloadLink }}
                />
                <View style={styles.detailItems}>
                  <Text style={styles.time}>
                    {Moment.utc(challenge.start_time).format('ddd, MMM DD • LT')} - {Moment.utc(challenge.end_time).format('LT')}
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
                      <TouchableOpacity onPress={() => (challenge.id)}>
                        <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => toggleModal(challenge._id)}>
                        <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.hour}>1m ago.</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView >
      )}
       {isModalVisible && (
        <WarningComponent
          title='Warning'
          description='Are you sure to delete this challenge?'
          Action1='Cancel'
          Action2='Delete'
          handleAction2={handleDelete}
          toggleModal={toggleModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderRadius: 15,

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
  address: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "bold",
    color: '#747688',
  },
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
  listItems: {
    rowGap: 5,
  },
  displayCenter: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})