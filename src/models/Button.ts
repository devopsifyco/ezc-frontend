import { ImageSourcePropType } from 'react-native';

export interface ButtonTypeProps {
  onPress: () => void;
  title: string;
}

export interface ButtonProfileTypeProps extends ButtonTypeProps {
  icon: ImageSourcePropType;
}

export interface CustomButtonProps extends ButtonTypeProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  buttonStyle?: object;
  textStyle?: object;
  disabled?: boolean; 

}
export interface WarningProps {
  title: string;
  description: string;
  Action1: string;
  Action2: string;
  handleAction2: () => void;
  toggleModal: () => void;
}