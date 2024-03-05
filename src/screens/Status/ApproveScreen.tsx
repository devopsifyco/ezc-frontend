import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { NavigateType } from '../../models/Navigations';

export default function ApproveScreen({ navigation }: NavigateType) {

  return (
    <View style={styles.container}>
      <View style={styles.listItems}>
      <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Green.png')}
            />
            <View style={styles.detailItems}>
              <Text style={styles.time}>Wed, Apr 15 •8:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: "#363636" }}>
                  <Text style={styles.detail}>Challenge:Protect the green fores...</Text>
                </Text>
              </View>
              <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Vo Nguyen Giap • Son Tra • Da Nang</Text>
                  </View>
              <Text style={styles.hour}>1m ago.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Green.png')}
            />
            <View style={styles.detailItems}>
              <Text style={styles.time}>Wed, Apr 01 •9:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: "#363636" }}>
                  <Text style={styles.detail}>Challenge:Protect the green fores...</Text>
                </Text>
              </View>
              <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Vo Nguyen Giap • Son Tra • Da Nang</Text>
                  </View>
              <Text style={styles.hour}>1m ago.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Green.png')}
            />
            <View style={styles.detailItems}>
              <Text style={styles.time}>Wed, Apr 01 •9:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: "#363636" }}>
                  <Text style={styles.detail}>Challenge:Protect the green fores...</Text>
                </Text>
              </View>
              <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Vo Nguyen Giap • Son Tra • Da Nang</Text>
                  </View>
              <Text style={styles.hour}>1m ago.</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Green.png')}
            />
            <View style={styles.detailItems}>
              <Text style={styles.time}>Wed, Apr 01 •9:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <Text style={{ fontSize: 14, marginLeft: 5, color: "#363636" }}>
                  <Text style={styles.detail}>Challenge:Protect the green fores...</Text>
                </Text>
              </View>
              <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Vo Nguyen Giap • Son Tra • Da Nang</Text>
                  </View>
              <Text style={styles.hour}>1m ago.</Text>
            </View>
          </View>
        </View>
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
})