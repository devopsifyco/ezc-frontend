import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import SelectedImages from './SelectImage';
import {styles} from '.';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';

type Input = {
  images: string[];
  title: string;
  description: string;
  points: string;
  company: string;
};

const StepOneScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<Input>();
  const selectedImages = watch('images', []);

  const onSubmit: SubmitHandler<Input> = data => {
    console.log(data);
    navigation.navigate('CreateChallenges', {step: 2, dataFromStepOne: data});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <Text style={styles.titleLarge}>Attached Photos or Videos</Text>
        </View>
        <SelectedImages
          imageList={selectedImages}
          setSelectedImage={(index: number, uri: string) => {
            const updatedImages = [...selectedImages];
            updatedImages[index] = uri;
            setValue(
              'images',
              updatedImages.filter(image => image !== ''),
            );
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.titleLarge, styles.titleDetail]}>Details</Text>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Title</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({field}) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter the challenges title"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => field.onChange(text)}
                value={field.value}
              />
            </>
          )}
          name="title"
          defaultValue=""
          rules={{required: ' *'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Description</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              style={[styles.input, styles.inputDes]}
              placeholder="Enter the challenges description"
              placeholderTextColor={'#BDBDBD'}
              onChangeText={text => field.onChange(text)}
              value={field.value}
              multiline={true}
              textAlignVertical="top"
            />
          )}
          name="description"
          defaultValue=""
          rules={{required: ' *'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Points</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              style={styles.input}
              placeholderTextColor={'#BDBDBD'}
              placeholder="Enter the challenges points"
              onChangeText={text => field.onChange(text)}
              value={field.value}
              keyboardType="numeric"
            />
          )}
          name="points"
          defaultValue=""
          rules={{required: ' *'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Company</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({field}) => (
            <TextInput
              style={styles.input}
              placeholder="Enter the challenges company"
              placeholderTextColor={'#BDBDBD'}
              onChangeText={text => field.onChange(text)}
              value={field.value}
            />
          )}
          name="company"
          defaultValue=""
          rules={{required: ' *'}}
        />
      </View>
      <View style={styles.actionButton}>
        <View style={styles.button}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.button}>
          <Button title="Next" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </>
  );
};

export default StepOneScreen;
