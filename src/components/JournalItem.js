import React from 'react';
import moment from 'moment';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import * as STYLES from '../styles';

class JournalItem extends React.Component {
    renderJournalIcon(type) {
        if (type == 1) {
            // This is a day journal
            return (
                <Icon
                    name={'md-sunny'}
                    type={'ionicon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                />
            )
        } else {
            // This is a dream journal
            return (
                <Icon
                    name={'moon'}
                    type={'entypo'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                />
            )
        }
    }

    renderSentimentIcon(sentiment) {
        if (sentiment < -14) {
            return (
                <Icon
                    name={'sentiment-very-dissatisfied'}
                    type={'material-icon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                    style={{ marginLeft: 14 }}
                />
            )
        } else if (sentiment < -2) {
            return (
                <Icon
                    name={'sentiment-dissatisfied'}
                    type={'material-icon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                    style={{ marginLeft: 14 }}
                />
            )
        } else if (sentiment >= -2 && sentiment <= 2) {
            return (
                <Icon
                    name={'sentiment-neutral'}
                    type={'material-icon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                    style={{ marginLeft: 14 }}
                />
            )
        } else if (sentiment > 2) {
            return (
                <Icon
                    name={'sentiment-satisfied'}
                    type={'material-icon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                    style={{ marginLeft: 14 }}
                />
            )
        } else if (sentiment > 14) {
            return (
                <Icon
                    name={'sentiment-very-satisfied'}
                    type={'material-icon'}
                    size={25}
                    color={STYLES.TEXT_COLOR}
                    style={{ marginLeft: 14 }}
                />
            )
        }
    }

    render() {
        let item = this.props.item;
        let date = moment(item.dateAdded).format('MMM D, YYYY')
        let time = moment(item.dateAdded).format('h:mm a')
        return (
            <TouchableOpacity style={styles.outerView} onPress={this.props.onPress}>
                <View>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <View style={styles.iconContainer}>
                    {this.renderJournalIcon(item.type)}
                    {this.renderSentimentIcon(item.score.score)}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    outerView: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateText: {
        color: STYLES.TEXT_COLOR,
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    timeText: {
        color: STYLES.ACCENT_COLOR,
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 64,
        justifyContent: 'space-between',
    }
})

export default JournalItem;