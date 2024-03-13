import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  displayLoading: {
    position: 'absolute',
    zIndex: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3550',
    opacity: 0.6,
    width: '100%',
    height: '100%',
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
    width: '100%',
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  formInput: { paddingBottom: 10, gap: 10 },
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
  setCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileWhiteColor: {},
  titleBold: { fontWeight: 'bold' },
  textRegister: {
    color: '#FFFFFF',
    top: 3.5,
  },
  moreLogin: {},
  displayOneline: {
    flexDirection: 'row',
    gap: 4,
  },
  moreOption: { flexDirection: 'row', justifyContent: 'space-between' },
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
  titleLarge: { fontSize: 24 },
  itemVerify: {},
  resendCode: {
    flexDirection: 'row',
    gap: 4,
  },
  displayCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#216C53',
    height: 130,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    top: '40%',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButton: {
    width: 55,
    height: 35,
    backgroundColor: 'grey',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
  },
});
