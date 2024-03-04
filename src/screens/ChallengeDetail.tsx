import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import react, { useEffect, useState, useRef } from 'react';


import { NavigateType } from '../models/Navigations';
import Swiper from 'react-native-swiper';
import ButtonChallenge from '../components/ButtonChallenge';


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

  // read more content
  const [showFullContent, setShowFullContent] = useState(false);

  // The number of lines you want to display
  const numberOfLinesToShow = 4;

  const content = `Ngày môi trường của Tổ chức môi trường thế giới.Bạn luôn thắc mắc ngày môi trường thế giới là ngày nào sau đây, ngày môi trường thế giới là ngày. Nên là thằng nào có tiền thì donate cho tao. Ít thì năm... quả trứng, 
  nhiều thì một quả tên lửa, chúng mày nhớ chưa, 
  chúng mày giúp anh, sau này anh sẽ giúp lại chúng mày`;


  return (
    <ScrollView>
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
                  style={{ height: 220, width: 380, }}
                  source={item.imageUrl}
                  resizeMode='cover'
                />
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.wrapped_title}>
          <Text style={{ fontSize: 20, color: "#363636" }}>Trồng cây xanh ngày  môi trường</Text>
        </View>
        <View style={styles.wrapped_times}>
          <View style={styles.times_group}>
            <Image source={require('../assets/icons/iconclock.png')} />
            <Text style={{
              fontSize: 16,
              marginLeft: 5,
              color: "#363636"
            }}>Wed, Apr 28 • 8:30 - 11:30 AM</Text>
          </View>
          <View style={styles.times_group}>
            <Image source={require('../assets/icons/locationdetail.png')} />
            <Text style={{
              fontSize: 16,
              marginLeft: 5,
              color: "#363636"
            }}>Phuoc My • Son Tra • Da Nang</Text>
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
          <Text numberOfLines={showFullContent ? undefined : numberOfLinesToShow} style={{ textAlign: 'left', fontSize: 16, color: "#363636",  }}>
            {content}
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
    height:210,
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
  }



})