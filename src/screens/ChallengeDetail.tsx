import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import react, { useEffect, useState, useRef } from 'react';


import { NavigateType } from '../models/Navigations';
import Swiper from 'react-native-swiper';
import ButtonChallenge from '../components/ButtonChallenge';
import { useOneChallenges } from '../hooks/useChallenge';
import Moment from 'moment';



const ChallengeDetail = ({ navigation, route }: NavigateType) => {

  const { id } = route.params;

  const { data: Challenge, isError, isPending, mutate } = useOneChallenges(id);


  useEffect(() => {
    mutate();
  }, [id, mutate]);

  const {
    title,
    images_path,
    description,
    points_reward,
    company,
    start_time,
    end_time,
    address
  } = Challenge || {}

  const swiperRef = useRef<Swiper>(null);

  const handlePress = () => {
    console.log('Button pressed!');
  };


  // read more content
  const [showFullContent, setShowFullContent] = useState(false);

  // The number of lines you want to display
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
            onPress={handlePress}
            title="Join"
            buttonStyle={{ width: 120 }}
          />
        </View>
        <View style={styles.wrapped_avarta}>
          <Image style={styles.avatar} source={require('../assets/images/challenges1.jpg')} />
          <View style={styles.infUser}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#363636" }}>Ho Xuan Ty</Text>
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

})