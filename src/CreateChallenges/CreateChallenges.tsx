import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

const CreateChallenges = () => {
  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [challengeMode, setChallengeMode] = useState('');

  const handlePress = () => {
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Create Challenges</Text>
        <View style={styles.container}>
          <View style={styles.mediaContainer}>
            <Text style={styles.mediaLabel}>Attached Photos and Videos:</Text>
            {/* Render your attached media here */}
          </View>
          <Button title="Choose File" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={challengeName}
            onChangeText={text => setChallengeName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type:</Text>
          <TextInput
            style={styles.input}
            value={challengeType}
            onChangeText={text => setChallengeType(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mode:</Text>
          <TextInput
            style={styles.input}
            value={challengeMode}
            onChangeText={text => setChallengeMode(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handlePress} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handlePress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  typeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  mediaContainer: {
    marginBottom: 20,
  },
  mediaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateChallenges;