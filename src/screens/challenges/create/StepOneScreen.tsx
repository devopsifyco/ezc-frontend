import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SelectedImages from './SelectImage';
import { styles } from '.';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import Header from './Header';

type Input = {
  image: string[];
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
    formState: { errors },
  } = useForm<Input>();

  const selectedImages = watch('image', []);

  const validateImages = (value: string[]) => {
    return value.length > 0 || ' *';
  };

  const validatePoints = (value: string) => {
    if (value === "") return ' *';
    const points = parseInt(value);
    if (isNaN(points)) return 'invalid number';
    if (points > 99) return 'maximum value is 99';
    return true;
  };


  const onSubmit: SubmitHandler<Input> = data => {
    navigation.navigate('CreateChallenges', { step: 2, dataFromStepOne: data });
  };

  return (
    <View style={styles.formContainer}>
      <Header navigation={navigation} />
      <View style={styles.mediaContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleLarge}>Attached Photos or Videos</Text>
          {errors.image && (
            <Text style={styles.errorText}>{errors.image.message}</Text>
          )}
        </View>
      </View>
      <Controller
        control={control}
        render={() => (
          <SelectedImages
            imageList={selectedImages}
            setSelectedImage={(index: number, asset: any) => {
              const updatedImages = [...selectedImages];
              updatedImages[index] = asset;
              setValue(
                'image',
                updatedImages.filter(image => image !== ''),
              );
            }}
            removeImage={(index: number) => {
              const updatedImages = [...selectedImages];
              updatedImages.splice(index, 1);
              setValue('image', updatedImages);
            }}
            clearImages={() => setValue('image', [])}
          />
        )}
        name="image"
        defaultValue={[]}
        rules={{ validate: validateImages }}
      />

      <View style={styles.inputContainer}>
        <Text style={[styles.titleLarge, { paddingTop: 20 }]}>Details</Text>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Title</Text>
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({ field }) => (
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
          rules={{ required: ' *' }}
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
          render={({ field }) => (
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
          rules={{ required: ' *' }}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.displayError}>
          <Text style={styles.titleMedium}>Points</Text>
          {errors.points_reward && (
            <Text style={styles.errorText}>{errors.points_reward.message}</Text>
          )}
        </View>
        <Controller
          control={control}
          render={({ field }) => (
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
          rules={{ validate: validatePoints }}
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
          render={({ field }) => (
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
          rules={{ required: ' *' }}
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
    </View>
  );
};

export default StepOneScreen;
