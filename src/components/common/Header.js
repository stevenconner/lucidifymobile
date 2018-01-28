// Import libraries for making a Component
import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import * as STYLES from '../../styles';
import { Icon } from 'react-native-elements';

// Make a component
const Header = (props) => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.leftViewStyle}>
        <TouchableOpacity style={styles.leftTouchable} onPress={props.leftPress}>
          <Icon
            name={props.leftIconName}
            type={props.leftIconType}
            color={STYLES.TEXT_COLOR}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightViewStyle}>
        {(!props.hideSettings) ?
          <TouchableOpacity style={styles.rightTouchable} onPress={props.rightPress}>
            <Icon
              name={'md-settings'}
              type={'ionicon'}
              color={STYLES.TEXT_COLOR}
              size={24}
            />
          </TouchableOpacity> : (props.saveText) ? <Text style={styles.saveText} onPress={props.rightPress}>SAVE</Text> :  <View />}
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: STYLES.MAIN_BG_COLOR,
    marginBottom: 10,
    paddingTop: (Platform.OS === 'android') ? 20 : 0,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftTouchable: {
    width: '100%',
  },
  rightTouchable: {
    width: '100%',
    alignItems: 'center',
  },
  leftViewStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftTextStyle: {
    color: STYLES.MAIN_COLOR,
    fontSize: 18,
    paddingTop: 18,
    paddingLeft: 15,
  },
  centerViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextStyle: {
    fontSize: 20,
    paddingTop: 15,
    fontWeight: 'bold'
  },
  rightViewStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTextStyle: {
    color: STYLES.MAIN_COLOR,
    fontSize: 18,
    paddingTop: 18,
    paddingRight: 15,
  },
  saveText: {
    color: STYLES.TEXT_COLOR,
    fontSize: 16,
    fontWeight: '600',
  }
};

// Make the component available to other parts of the app
export { Header };
