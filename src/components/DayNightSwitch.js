import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class DayNightSwitch extends React.Component {
    render() {
        return (
            <View style={styles.outerView}>
                <TouchableOpacity
                    style={[styles.left, { backgroundColor: (this.props.selected === 'day') ? '#ff6' : '#eee' }]}
                    onPress={this.props.dayPress}
                >
                    <Text style={styles.dayText}>
                        Days
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.right, { backgroundColor: (this.props.selected === 'dream') ? '#555666' : '#eee' }]}
                    onPress={this.props.dreamPress}
                >
                    <Text style={[styles.dreamText, { color: (this.props.selected === 'dream') ? '#fff' : '#000' }]}>
                        Dreams
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerView: {
        alignSelf: 'center',
        width: '80%',
        height: 45,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    left: {
        flex: 1,
        overflow: 'hidden',
        borderRightWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        backgroundColor: '#ddd',
        flex: 1,
        overflow: 'hidden',
        borderLeftWidth: 0.5,
        alignItems: 'center',
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
    }
})

export default DayNightSwitch;