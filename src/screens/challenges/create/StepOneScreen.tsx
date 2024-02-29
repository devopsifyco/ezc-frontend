import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {styles} from '.';
import Next from './Next';

export default function StepOneScreen() {
  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [challengeMode, setChallengeMode] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <Text style={styles.titleMedium}>Attached Photos and Videos</Text>
        </View>
        <View style={styles.viewChoose}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.imageLarge} />
          ) : (
            <Next setSelectedImage={setSelectedImage} />
          )}
          <Text></Text>
        </View>
        <View style={styles.viewAdd}>
          <View style={styles.rowContainer}>
            {selectedImage1 ? (
              <Image
                source={{uri: selectedImage1}}
                style={styles.imageMedium}
              />
            ) : (
              <Next setSelectedImage1={setSelectedImage1} />
            )}
            <Text></Text>
          </View>
          <View style={styles.rowContainer}>
            {selectedImage2 ? (
              <Image
                source={{uri: selectedImage2}}
                style={styles.imageMedium}
              />
            ) : (
              <Next setSelectedImage2={setSelectedImage2} />
            )}
            <Text></Text>
          </View>
          <View style={styles.rowContainer}>
            {selectedImage3 ? (
              <Image
                source={{uri: selectedImage3}}
                style={styles.imageMedium}
              />
            ) : (
              <Next setSelectedImage3={setSelectedImage3} />
            )}
            <Text></Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.titleLarge, styles.titleDetail]}>Details</Text>
        <Text style={styles.titleMedium}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the challenges title"
          placeholderTextColor={'#BDBDBD'}
          onChangeText={text => setChallengeName(text)}
          defaultValue={challengeName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleMedium}>Description</Text>
        <TextInput
          style={[styles.input, styles.inputDes]}
          placeholder="Enter the challenges description"
          placeholderTextColor={'#BDBDBD'}
          onChangeText={text => setChallengeType(text)}
          defaultValue={challengeType}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleMedium}>Points</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#BDBDBD'}
          placeholder="Enter the challenges points"
          onChangeText={text => setChallengeMode(text)}
          defaultValue={challengeMode}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleMedium}>Company</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the challenges company"
          placeholderTextColor={'#BDBDBD'}
          onChangeText={text => setChallengeMode(text)}
          defaultValue={challengeMode}
        />
      </View>
    </>
  );
}
