import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Moment from 'moment';
import { Challenge } from '../models/InfChallenge';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot  } from '@fortawesome/free-solid-svg-icons';

const ListCard: React.FC<Challenge> = ({  start_time, title, address, images_path, isLive,onPress }) => {

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
        onPress={onPress}
        style={{
          flexDirection: 'row',
        }}>
        <Image style={{ borderRadius: 10, width: 80, height: 100 }} source={{ uri: `${images_path?.[0]?.downloadLink}` }} />

        <View style={{
          justifyContent: 'center',
          paddingVertical: 15,
          paddingLeft: 35,
          paddingRight: 10,
          width:"80%"
        }}>
          <Text style={{
            color: "#216C53",
            fontWeight: "bold",
          }}>
            {Moment.utc(start_time).format('ddd, MMM DD • LT')}
          </Text>
          <Text numberOfLines={1} style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#000000",
            marginTop:4,
            marginBottom:8
          }} >
            {title}
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',  
            paddingRight: 10, 
          }}>
            <FontAwesomeIcon icon={faLocationDot} size={18} color='#716E90'/>
            <Text numberOfLines={2} style={{
              fontSize: 13,
              marginLeft: 4,
              color:"#747688",
              flexWrap: 'wrap',
              marginRight: 10,
              maxWidth: "80%",
            }}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListCard;
