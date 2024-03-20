import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateUserProfile } from '../../hooks/useUser';
import { NavigateType } from '../../models/Navigations';
import { DataProfile } from '../../models/Profile';
import LinearGradient from 'react-native-linear-gradient';
import ImagePickerButton from './ImagePickerButton';

export default function EditProfile({ route, navigation }: { route: { params: { dataProfile: DataProfile } }; navigation: NavigateType }) {

  const { dataProfile } = route.params;
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: dataProfile.username,
      location: dataProfile.location,
      about_me: dataProfile.about_me,
      email: dataProfile.email,
      image: dataProfile.avatar.name || '',
    },
  });

  const { mutate, isPending } = useUpdateUserProfile();

  const handleSuccess = () => navigation.goBack();

  const handleImageSelect = (selectedUri: any) => {
    setValue('image', selectedUri);
  };

  const handleUpdate = (formData: any) => {
    try {

      mutate(formData, {
        onSuccess: () => handleSuccess()
      });

    } catch (error) {
      console.error('Update failed', error);
      Alert.alert('Error', 'Failed to update user profile');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <>
      {isPending && (
        <View style={styles.displayLoading}>
          <ActivityIndicator color="#fff" size={45} />
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formInput}>
          <View style={styles.displayCenter}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <ImagePickerButton onImageSelect={handleImageSelect} currentImage={value || dataProfile?.avatar.name} />
              )}
              name="image"
            />
          </View>

          <View style={styles.containerInput}>
            <View style={styles.displayOneline}>
              <Text style={styles.textInput}>Email</Text>
              <Text style={styles.errorText}>{errors.email?.message}</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  editable={false}
                />
              )}
              name="email"
              rules={{ required: '*', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
            />

          </View>

          <View style={styles.containerInput}>
            <View style={styles.displayOneline}>
              <Text style={styles.textInput}>User name</Text>
              <Text style={styles.errorText}>{errors.username?.message}</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                />
              )}
              name="username"
              rules={{ required: '*' }}
            />
          </View>

          <View style={styles.containerInput}>
            <View style={styles.displayOneline}>
              <Text style={styles.textInput}>Location</Text>
              <Text style={styles.errorText}>{errors.location?.message}</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                />
              )}
              name="location"
              rules={{ required: '*' }}
            />
          </View>

          <View style={styles.containerInput}>
            <View style={styles.displayOneline}>
              <Text style={styles.textInput}>About me</Text>
              <Text style={styles.errorText}>{errors.about_me?.message}</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  style={styles.inputAbout}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  onBlur={onBlur}
                  multiline={true}
                  textAlignVertical="top"
                  maxLength={150}
                />
              )}
              name="about_me"
              rules={{ required: '*' }}
            />
          </View>

          <View style={[styles.displayCenter, styles.displayOnelineButton]}>
            <LinearGradient
              colors={['#FF0A00', '#FF890B']}
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 2.0, y: 0.5 }}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.textButton}>Cancel</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#FF0A00', '#FF890B']}
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 2.0, y: 0.5 }}
              style={styles.button}
            >
              <TouchableOpacity onPress={handleSubmit(handleUpdate)}>
                <Text style={styles.textButton}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  displayLoading: {
    backgroundColor: 'grey',
    position: 'absolute',
    opacity: 0.5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  containerInput: {
    marginVertical: 10,
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    height: 'auto',
    paddingHorizontal: 10,
    color: '#000000',
  },
  textInput: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 100,
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconEdit: {
    marginLeft: 50,
    marginTop: -20
  },
  displayCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  displayOneline: {
    flexDirection: 'row',
    gap: 5,
    alignContent: 'center',
  },
  displayOnelineButton: {
    flexDirection: 'row',
    gap: 25,
    alignContent: 'center',
  },
  inputAbout: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#000000',
  }
});
