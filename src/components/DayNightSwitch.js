import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import * as STYLES from '../styles';

class DayNightSwitch extends React.Component {
    render() {
        let selected = this.props.selected;
        console.log('selected', selected);
        return (
            <TouchableOpacity style={[styles.outerView, {borderColor: (selected == 1) ? '#fff' : STYLES.SD_DARK_PURPLE}]} onPress={this.props.onPress}>
                <View
                    style={styles.left}
                >
                    <View style={(selected == 1) ? styles.selectedCircle : styles.circle}>
                        <Icon
                            name={'md-sunny'}
                            type={'ionicon'}
                            size={20}
                            color={'#000'}
                        />
                    </View>
                </View>
                <View
                    style={styles.right}
                >
                    <View style={(selected == 2) ? styles.sleepCircle : styles.circle}>
                        <Icon
                            name={'moon'}
                            type={'entypo'}
                            size={20}
                            color={(selected == 2) ? '#000' : '#fff'}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    outerView: {
        alignSelf: 'center',
        width: 65,
        height: 28,
        borderRadius: 20,
        borderColor: STYLES.TEXT_COLOR,
        borderWidth: 2,
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'center',
        backgroundColor: STYLES.MAIN_BG_COLOR,
    },
    left: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    right: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 20,
        fontFamily: 'Sedgwick',
        lineHeight: 40,
    },
    dreamText: {
        fontSize: 20,
        fontFamily: 'Sedgwick',
    },
    selectedCircle: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: STYLES.TEXT_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2,
        paddingTop: 1,
    },
    circle: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: STYLES.MAIN_BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2,
        paddingTop: 1,
    },
    sleepCircle: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: STYLES.SD_DARK_PURPLE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2,
        paddingTop: 1,
    }
})

export default DayNightSwitch;