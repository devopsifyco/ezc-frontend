import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import react, { useEffect, useState, useRef } from 'react';


import { NavigateType } from '../models/Navigations';
import useGetAllChallenges from '../hooks/useChallenge';
import Swiper from 'react-native-swiper';

import ButtonDetaiChallenge from '../components/ButtonDetailChallenge';


const slideData = [
  { id: 1, imageUrl: require('../assets/slides.jpg'), title: 'Slide 1' },
  { id: 2, imageUrl: require('../assets/slides.jpg'), title: 'Slide 2' },
  { id: 3, imageUrl: require('../assets/slides.jpg'), title: 'Slide 3' },
];



const ChallengeDetail = ({ navigation }: NavigateType) => {

  const swiperRef = useRef<Swiper>(null);

  const handlePress = () => {
    console.log('Button pressed!');
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image source={require('../assets/icons/arrow-left.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapped_slide}>
        <Swiper
          ref={swiperRef}
          autoplay
          showsPagination={false}
          removeClippedSubviews={false}
        >
          {slideData.map((item) => (
            <View
              key={item.id}
              style={styles.slide}
            >
              <Image
                style={{ height: 220, width: 380 }}
                source={item.imageUrl}
                resizeMode='cover'
              />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.wrapped_title}>
        <Text style={{ fontSize: 20 }}>Trồng cây xanh ngày  môi trường</Text>
      </View>
      <View style={styles.wrapped_times}>
        <View style={styles.times_group}>
          <Image source={require('../assets/icons/iconclock.png')} />
          <Text style={{
            fontSize: 16,
            marginLeft: 5,
          }}>Wed, Apr 28 • 8:30 - 11:30 AM</Text>
        </View>
        <View style={styles.times_group}>
          <Image source={require('../assets/icons/locationdetail.png')} />
          <Text style={{
            fontSize: 16,
            marginLeft: 5,
          }}>Phuoc My • Son Tra • Da Nang</Text>
        </View>
      </View>
      <View style={styles.wrapped_button}>
        <ButtonDetaiChallenge
          onPress={handlePress}
          title="Donate"
          buttonStyle={{ width: 120 }}
        />
        <ButtonDetaiChallenge
          onPress={handlePress}
          title="Join"
          buttonStyle={{ width: 120 }}
        />
      </View>
      <View style={styles.wrapper_avarta}>
        <Image style={styles.avatar} source={require('../assets/images/challenges1.jpg')} />
        <View style={styles.infUser}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Ho Xuan Ty</Text>
          <Text>Organizer</Text>
        </View>
      </View>
      <View>
        <Text>
          Ngày môi trường của Tổ chức môi trường thế giới. Bạn luôn thắc mắc ngày môi
          trường thế giới là ngày nào sau đây, ngày môi trường thế giới là ngày.
          Nên là thằng nào có tiền thì donete cho tao. Ít thì năm... quả trứng, nhiều thì một quả tên lửa,
          chúng mày nhớ chưa, chúng mày giúp anh, sau này anh sẽ giúp lại chúng mày
        </Text>
      </View>

    </View>
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
    marginTop: 30
  },
  wrapped_slide: {
    flex: 3 / 7
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
  wrapper_avarta: {
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
  }



})