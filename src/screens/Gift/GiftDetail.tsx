import React, { useState } from 'react';
import { NavigateType } from '../../models/Navigations';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import HeaderChallenge from '../../components/HeaderChallenge';
import { useOneGift } from '../../hooks/useGift';
import ButtonChallenge from '../../components/ButtonChallenge';


export default function GiftDetail({ navigation, route }: NavigateType) {

  const { giftId } = route.params

  const { data: Gifts } = useOneGift(giftId);

  const {
    name,
    description,
    points_required,
    quantity,
    image
  } = Gifts || {};


  const handleExchangeGift = () => {
    navigation.navigate('ExchangeGifts');
  };




  // read more content
  const [showFullContent, setShowFullContent] = useState(false);


  const numberOfLinesToShow = 10;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderChallenge navigation={navigation} title='' />
      </View>
      <View style={styles.contain}>
        <View style={styles.image}>
          <View style={styles.wrapper_avatar}>
            <Image source={{ uri: image?.downloadLink }} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.detailGroup} >
              <View style={styles.textGroup}>
                <Text style={styles.point}>Points:</Text>
                <Text style={styles.num}>{points_required}</Text>
              </View>
              <Image source={require('../../assets/images/line-detail.png')}
                style={styles.line} />
              <View style={styles.textGroup}>
                <Text style={styles.title}>Mode of receipt:</Text>
                <Text style={styles.textMode}>Receive gifts at the nearest station</Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text numberOfLines={showFullContent ? undefined : numberOfLinesToShow} style={styles.des}>{description}</Text>
              {!showFullContent && (
                <TouchableOpacity
                  onPress={() => setShowFullContent(true)}
                >
                  <Text style={styles.readMore}>Read more</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.exchangeButtonContainer}>
        <ButtonChallenge
          title={"Next"}
          onPress={handleExchangeGift}
          buttonStyle={styles.Button}
        />
      </View>
    </ScrollView >
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 20
  },
  contain: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 13,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper_avatar: {
    width: "100%",
    height: 230,
    marginBottom: 10,

  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  }
  ,
  info: {
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
  detailGroup: {
    display: "flex",
    flexDirection: "row"
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 50
  },
  point: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  num: {
    color: "#216C53",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    marginLeft: 50,
    marginTop: 10
  },
  textMode: {
    width: "75%",
  },
  content: {
    width: "80%",
  },
  des: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify",
  },
  readMore: {
    fontSize: 16,
    color: "#216C53"
  },
  exchangeButtonContainer: {
    justifyContent: 'center',
    alignItems:"center",
    marginBottom: 20,
    marginTop:"60%"
  },
  Button: {
    width:200,
    borderRadius:50,

  }
});
