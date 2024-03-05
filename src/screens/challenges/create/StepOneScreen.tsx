import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import SelectedImages from './SelectImage';
import {styles} from '.';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';

type Input = {
  images_path: string[];
  title: string;
  description: string;
  points_reward: string;
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

  const selectedImages = watch('images_path', []);

  const validateImages = (value: string[]) => {
    return value.length > 0 || ' *';
  };

  const onSubmit: SubmitHandler<Input> = data => {
    navigation.navigate('CreateChallenges', {step: 2, dataFromStepOne: data});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <View style={styles.displayError}>
            <Text style={styles.titleLarge}>Attached Photos or Videos</Text>
            {errors.images_path && (
              <Text style={styles.errorText}>{errors.images_path.message}</Text>
            )}
          </View>
        </View>
        <Controller
          control={control}
          render={() => (
            <SelectedImages
              imageList={selectedImages}
              setSelectedImage={(index: number, uri: string) => {
                const updatedImages = [...selectedImages];
                updatedImages[index] = uri;
                setValue(
                  'images_path',
                  updatedImages.filter(image => image !== ''),
                );
              }}
              removeImage={(index: number) => {
                const updatedImages = [...selectedImages];
                updatedImages.splice(index, 1);
                setValue('images_path', updatedImages);
              }}
              clearImages={() => setValue('images_path', [])}
            />
          )}
          name="images_path"
          defaultValue={[]}
          rules={{validate: validateImages}}
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
          name="points_reward"
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
