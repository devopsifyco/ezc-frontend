import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Moment from 'moment';

interface LiveCardProps {
  date: string;
  title: string;
  location: string;
  images: string[];
}

const ListCard: React.FC<LiveCardProps> = ({ date, title, location, images }) => {
  return (
    <View
      style={{
        height: 128,
        padding: 10,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        elevation: 5,
        marginHorizontal: 8,
        shadowColor: 'rgba(80, 85, 136, 0.6)',
        marginBottom: 5,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
        }}>
        <Image style={{ borderRadius: 10, width: 80, height: 100 }} source={require('../assets/images/challenges1.jpg')} />
        <View style={{
          justifyContent: 'center',
          paddingVertical: 15,
          paddingLeft: 35,
          paddingRight: 10,
        }}>
          <Text style={{
            color: "#216C53",
            fontWeight: "bold",
          }}>
            {Moment(date).format('ddd, MMM DD • LT')}
          </Text>
          <Text numberOfLines={1} style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#000000",
            marginBottom: 15,
          }}>
            {title}
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image source={require('../assets/icons/locationList.png')} />
            <Text style={{
              fontSize: 13,
              marginLeft: 4,
              fontWeight: "bold",
            }}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListCard;
