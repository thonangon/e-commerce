export  const colors={
  primary: '#03A1AB',
  secondary: '#00F0FF',
  white: '#fffff',
  black: '#000000',
  bg_home:"#03A1AB",
  bg_button:"#00C2C2"
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  horizontalScrollContainer: { paddingVertical: 8 },
  imageBackground: { width: '100%', height: 670 },
  textContainer: { flex: 1, justifyContent: 'flex-end', paddingBottom: 70 },
  categoryText: {
    position: 'absolute',
    top: '1%',
    left: '5%',
    backgroundColor: 'white',
    padding: 4,
    fontSize: 16,
    color: '#00C2C2',
  },
  shopNowButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#03A1AB',
    padding: 10,
    borderRadius: 5,
  },
  shopNowButtonText: { color: '#fff' },
});
export default styles;
