import Globals from "./Globals";

const tintColorLight = '#000';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#f2f2f2',
    tint: tintColorLight,
    tabIconDefault: Globals.COLOR.WHITE,
    tabIconSelected: tintColorLight,
    tabIconNewNotification: 'tomato', 
    
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    tabIconNewNotification: 'tomato',
  },
};
