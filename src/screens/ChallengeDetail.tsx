import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigateType } from '../models/Navigations';
import Swiper from 'react-native-swiper';
import ButtonChallenge from '../components/ButtonChallenge';
import { useOneChallenges, useJoinChallenge, useCompleteChallenge } from '../hooks/useChallenge';
import WarningComponent from '../components/WarningComponent';
import Moment from 'moment';
import { DataProfile } from '../models/Profile';
import useParticipant from '../hooks/useParticipant';


const ChallengeDetail = ({ navigation, route }: NavigateType) => {

  const { id, isJoined} = route.params
  const { data, isLoading } = useParticipant({ id });
  const { data: participantData, isLoading: participantIsLoading, isError: participantIsError } = useParticipant({ id });
  const [filteredData, setFilteredData] = useState([]);
  const { mutate: JoinChallenge, error: errChallenge, } = useJoinChallenge();
  const { mutate: CompleteChallenge, error: errorComplete} = useCompleteChallenge();
  const { data: Challenge, isError, isPending, mutate } = useOneChallenges(id);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [nameActionButton, setNameActionButton] = useState("Join");


  useEffect(() => {
    mutate();

  }, [id, mutate]);

  

  const {
    owner_id,
    title,
    images_path,
    description,
    points_reward,
    company,
    start_time,
    end_time,
    address,
    participants
  } = Challenge || {}

  const swiperRef = useRef<Swiper>(null);


  const handlePress = () => {
    console.log('Button pressed!');
  };

  useEffect(() => {
    if (participantData) {
      setFilteredData(participantData);
    }
  }, [participantData]);

 // handle modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Get email user account
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

  // check role for button
  getEmailUser().then(email => {
    if (email === owner_id?.email) {
      setNameActionButton('Complete')
    }
  });

  //handle join challenge
  const handleJoinChallenge = async () => {
    AsyncStorage.getItem('email').then(data => {

      const emailWithoutQuotes = data ? data.replace(/["']/g, '') : '';

      JoinChallenge({email: emailWithoutQuotes, id: id}, {
        onSuccess: () => {
          navigation.goBack()
        }
      });
      setIsJoined(true);
      setModalVisible(!isModalVisible);

    });

  };

  // handle complete challenge

  const handleFinishChallenge = () => {
    CompleteChallenge({ email: owner_id?.email, id: id }, {
      onSuccess: () => navigation.goBack()
    })
  }


  // read more content
  const [showFullContent, setShowFullContent] = useState(false);


  const numberOfLinesToShow = 4;

 


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Image source={require('../assets/icons/arrow-left.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapped_slide}>
          {isPending ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : Challenge && images_path && Array.isArray(images_path) && images_path.length > 0 ? (
            <Swiper
              ref={swiperRef}
              autoplay
              showsPagination={false}
              removeClippedSubviews={false}
            >
              {images_path.map((item: { downloadLink: string, _id: string }, index: number) => (
                <View key={index} style={styles.slide}>
                  <Image
                    style={{ height: 220, width: '100%' }}
                    source={{ uri: item?.downloadLink }}
                    resizeMode='cover'
                  />
                </View>
              ))}
            </Swiper>
          ) : (
            <Text>No images available</Text>
          )}
        </View>

        <View style={styles.wrapped_title}>
          <Text style={{ fontSize: 20, color: "#363636" }}>{title}</Text>
        </View>
        <View style={styles.wrapped_times}>
          <View style={styles.times_group}>
            <Image source={require('../assets/icons/iconclock.png')} />
            <Text style={{
              fontSize: 16,
              marginLeft: 5,
              color: "#363636"
            }}>
              {Moment(start_time).format('ddd, MMM DD • HH:mm')} - {Moment(end_time).format('LT')}
            </Text>
          </View>
          <View style={styles.times_group}>
            <Image source={require('../assets/icons/locationdetail.png')} />
            <Text style={{
              fontSize: 16,
              marginLeft: 5,
              color: "#363636"
            }}>{address}</Text>
          </View>
        </View>

        <View style={styles.wrapped_button}>
          <ButtonChallenge
            onPress={handlePress}
            title="Donate"
            buttonStyle={{ width: 120 }}
          />
          <ButtonChallenge
            onPress={toggleModal}
            title={nameActionButton}
            colors={nameActionButton === "Complete" ? ['#216C53', '#216C53'] : undefined}
            buttonStyle={[styles.buttonStyle]}
            disabled={isJoined}
          />
        </View>
        <View style={styles.wrapped_avarta}>
          <Image style={styles.avatar} source={{ uri: owner_id?.avatar.name }} />
          <View style={styles.infUser}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#363636" }}>{owner_id?.username}</Text>
            <Text>Organizer</Text>
          </View>
        </View>
        <View style={{ marginBottom: showFullContent ? 10 : 0 }}>
          <Text numberOfLines={showFullContent ? undefined : numberOfLinesToShow} style={{ textAlign: 'left', fontSize: 16, color: "#363636", }}>
            {description}
          </Text>
          {!showFullContent && (
            <TouchableOpacity
              style={styles.wrapped_readmore}
              onPress={() => setShowFullContent(true)}
            >
              <Text style={{ color: "#363636" }}>Read more</Text>
              <View style={{ marginLeft: 2 }}>
                <Image source={require('../assets/icons/arrow-right.png')} style={styles.arrowImage} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionName}>Participant</Text>
            <TouchableOpacity style={styles.seeAll} onPress={() => navigation.navigate('Participant')}>
              <Text>See All</Text>
              <Image source={require('../assets/icons/iconSeeAll.png')} />
            </TouchableOpacity>
          </View>
        {isModalVisible &&  (
          <WarningComponent
            title={errorComplete || errChallenge?'Warning':'Verify'}
            description={errorComplete || errChallenge? errorComplete || errChallenge:`Are you sure to ${nameActionButton.toLowerCase()} this challenge ?`}
            Action1='Cancel'
            Action2={nameActionButton}
            handleAction2={nameActionButton === "Complete" ? handleFinishChallenge : handleJoinChallenge}
            toggleModal={toggleModal}
          />
        )}

      </View>
      <View style={styles.listParticipant}>
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
            </View>
    </ScrollView>
  )
}

export default ChallengeDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapped_slide: {
    height: 210,
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    marginTop: 20,

  },
  wrapped_title: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  wrapped_times: {
    borderTopColor: "#BDBDBD",
    borderTopWidth: 1,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  times_group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  wrapped_button: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    gap: 50
  },
  wrapped_avarta: {
    marginVertical: 14,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12
  },
  infUser: {
    marginLeft: 15
  },
  wrapped_readmore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    marginTop: 3,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,

  },
  seeAll: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  sectionName: {
    fontSize: 18,
    color: '#120D26',
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
itemInfo: {
  flexDirection: 'row',
  alignItems: 'center',
},
InfoDetail: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,

},
name: {
  fontWeight: 'bold',
  color: "#000",
  fontSize: 18
},
challengemail: {
  color: "#216C53"
},

  buttonStyle: {
    width: 120
  }
})