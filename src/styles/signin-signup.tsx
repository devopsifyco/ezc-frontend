import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 30,
  },
  titleSmall: {
    color: '#A4A4A4',
    fontSize: 11.5,
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBackground: {
    backgroundColor: '#216C53',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: '6.3%',
    position: 'absolute',
    bottom: '0%',
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  formInput: {paddingBottom: 10, gap: 10},
  inputContainter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    color: '#000000',
    width: 210,
  },
  options: {},
  setCenter: {},
  tileWhiteColor: {},
  titleBold: {fontWeight: 'bold'},
  textRegister: {
    color: '#FFFFFF',
    top: 3.5,
  },
  moreLogin: {},
  displayOneline: {},
  moreOption: {flexDirection: 'row', justifyContent: 'space-between'},
  errorText: {
    color: 'red',
  },
  formInputVerify: {},
  inputVerifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 25,
  },
  inputVerify: {
    backgroundColor: 'rgba(63, 218, 133, 0.2)',
    width: 57,
    height: 57,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLarge: {fontSize: 24},
  itemVerify: {},
});
