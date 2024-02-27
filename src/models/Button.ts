import {ImageSourcePropType} from 'react-native';

export interface ButtonTypeProps {
  onPress: () => void;
  title: string;
}

export interface ButtonProfileTypeProps extends ButtonTypeProps {
  icon: ImageSourcePropType;
}
