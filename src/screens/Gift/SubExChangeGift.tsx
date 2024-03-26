import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Button } from 'react-native';
import { NavigateType } from '../../models/Navigations';
import HeaderChallenge from '../../components/HeaderChallenge';
import { GiftData } from '../../models/infGifts';
import { useGetAllGifts } from '../../hooks/useGift';

export default function ListGift({ navigation }: NavigateType) {

  const { data: Gifts } = useGetAllGifts()


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderChallenge navigation={navigation} title='' />
      </View>
      <View style={styles.contain}>
        {
          Gifts?.map((Gift: GiftData, index: number) => (
            <TouchableOpacity key={index} style={styles.list} onPress={() => {
              navigation.navigate("GiftDetail", { giftId: Gift._id })
            }}>
              <View style={styles.image}>
                <Image source={{ uri: Gift.image?.downloadLink }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{Gift.name}</Text>
                <View style={styles.pointGroup}>
                  <Text style={styles.point}>Points:</Text>
                  <Text style={[styles.text15, { color: "#216C53" }]}>{Gift.points_required}</Text>
                </View>
                <View style={styles.pointGroup}>
                  <Text style={styles.point}>Quantity:</Text>
                  <Text style={[styles.text15, { color: "#216C53" }]}>{Gift.quantity}</Text>
                </View>
                <Text style={styles.des}>Hình thức nhận: Nhận quà tại Trạm gần nhất</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </ScrollView >
  );
}
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  },
  list: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#ccc",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    marginTop: 10,
    borderWidth: 2,
  },
  image: {
    padding: 10
  },
  avatar: {
    width: 75,
    height: 100,
    borderRadius: 10

  },
  info: {
    marginLeft: 20,
  },
  name: {
    color: "#216C53",
    fontWeight: "bold"
  },
  pointGroup: {
    display: "flex",
    flexDirection: "row",
  },
  point: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  num: {
    color: "#216C53",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  des: {
    maxWidth: '85%',
    overflow: 'hidden',
    marginTop: 10,
    width: 250,
    fontSize: 13,
    color:"#747688"

  },
  text15: {
    fontSize: 15
  }
});
