import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { NavigateType } from '../../models/Navigations';

export default function PendingScreen({ navigation }: NavigateType) {

  return (
    <View style={styles.container}>
      <View style={styles.listItems}>
      <View style={styles.item}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Green.png')}
            />
            <View style={styles.detailItems}>
              <Text style={styles.time}>Wed, Apr 10 •8:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <View style={styles.listItemDetail}>
                  <Text style={styles.detail}>Challenge: Clear the city</Text>
                  <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Phuoc My • Son Tra • Da Nang</Text>
                  </View>
                </View>
                <View style={styles.displayCenter}>
                  <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                  <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                </View>
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
              <Text style={styles.time}>Wed, Apr 10 •8:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <View style={styles.listItemDetail}>
                  <Text style={styles.detail}>Challenge: Clear the city</Text>
                  <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Phuoc My • Son Tra • Da Nang</Text>
                  </View>
                </View>
                <View style={styles.displayCenter}>
                  <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                  <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                </View>
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
              <Text style={styles.time}>Wed, Apr 10 •8:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <View style={styles.listItemDetail}>
                  <Text style={styles.detail}>Challenge: Clear the city</Text>
                  <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Phuoc My • Son Tra • Da Nang</Text>
                  </View>
                </View>
                <View style={styles.displayCenter}>
                  <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                  <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                </View>
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
              <Text style={styles.time}>Wed, Apr 10 •8:30AM - 17:30 PM</Text>
              <View style={styles.times_group}>
                <View style={styles.listItemDetail}>
                  <Text style={styles.detail}>Challenge: Clear the city</Text>
                  <View style={styles.times_group}>
                    <Image source={require('../../assets/icons/locationdetail.png')} />
                    <Text style={{
                      fontSize: 12,
                      color: "#363636"
                    }}>Phuoc My • Son Tra • Da Nang</Text>
                  </View>
                </View>
                <View style={styles.displayCenter}>
                  <Image source={require('../../assets/icons/Shape.png')} style={styles.editGroup} />
                  <Image source={require('../../assets/icons/delete.png')} style={styles.editGroup} />
                </View>
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
    listItems: {
      rowGap: 5,
    },
    displayCenter: {
      gap: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: 20,
  
    },
})



  
  