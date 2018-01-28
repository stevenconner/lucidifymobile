import React from 'react';
import { connect } from 'react-redux';
import { submitEntry } from '../actions';
import moment from 'moment';

import { View, Text, StyleSheet, TextInput, Platform, Image, Linking, TouchableOpacity } from 'react-native';
import { Button, Header, Separator } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';
import DayNightSwitch from '../components/DayNightSwitch';
import { Icon } from 'react-native-elements';

class EnterJournalScreen extends React.Component {
    state = {
        journalText: '',
        error: '',
        type: 1,
        date: '',
    }

    componentWillMount() {
        if (this.props.navigation.state.params.editing) {
            let item = this.props.navigation.state.params.item;
            let date = moment(item.dateAdded).format('MMM, D, YYYY');
            this.setState({
                journalText: item.content,
                type: item.type,
                date: date,
                imageURL: item.imageURL,
                score: item.score.score,
                importantWords: item.score.words,
            })
        } else {
            let date = new moment().format('MMM D, YYYY');
            this.setState({
                date: date,
            })
        }
    }

    handleSwitchPress() {
        if (this.state.type === 1) {
            this.setState({
                type: 2
            })
        } else {
            this.setState({
                type: 1
            })
        }
    }

    handleSubmitPress() {
        let obj = {
            content: this.state.journalText,
            type: this.state.type,
        }
        this.props.submitEntry(obj, this.props.navigation);
    }

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

    renderImage(editing) {
        if (editing) {
            if (this.state.imageURL) {
                return (
                    <TouchableOpacity onPress={() => Linking.openURL(this.state.imageURL)}>
                        <Image
                            source={{ uri: this.state.imageURL }}
                            resizeMode={'contain'}
                            style={styles.imageStyle}
                        />
                    </TouchableOpacity>
                )
            }
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

    renderSubmitButton() {
        if (!this.state.journalText) {
            return (
                <Button
                    style={{ width: '95%', height: 50, borderColor: '#ccc' }}
                    textStyle={{ color: '#ccc' }}
                >
                    Submit
                </Button>
            )
        } else {
            return (
                <Button
                    style={{ width: '95%', height: 50, borderColor: STYLES.SD_DARK_PURPLE }}
                    textStyle={{ color: STYLES.SD_DARK_PURPLE }}
                    onPress={() => this.handleSubmitPress()}
                >
                    Submit
                </Button>
            )
        }
    }

    renderSwitch(editing) {
        if (!editing) {
            return (
                <DayNightSwitch
                    selected={this.state.type}
                    onPress={() => this.handleSwitchPress()}
                />
            )
        } else {
            return (
                <View style={styles.iconContainer}>
                    {this.renderJournalIcon(this.state.type)}
                    {this.renderSentimentIcon(this.state.score)}
                </View>
            )
        }
    }

    render() {
        let editing = this.props.navigation.state.params.editing;
        let date = new moment().format('MMM D, YYYY');
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        leftIconName={(this.state.journalText && !editing) ? 'x' : 'md-arrow-back'}
                        leftIconType={(this.state.journalText && !editing) ? 'octicon' : 'ionicon'}
                        leftPress={() => this.props.navigation.goBack()}
                        rightPress={() => this.handleSubmitPress()}
                        hideSettings={true}
                        saveText={(editing) ? false : true}
                    />
                    <View style={styles.contentContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.dateText}>
                                {date}
                            </Text>
                            {this.renderSwitch(editing)}
                        </View>
                        <Separator />
                        {this.renderImage(editing)}
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ journalText: text, error: '' })}
                            value={this.state.journalText}
                            placeholder={'Write Your Journal Entry!'}
                            placeholderTextColor={'#ccc'}
                            autoCorrect={true}
                            keyboardType={'default'}
                            underlineColorAndroid={'transparent'}
                            multiline={true}
                            selectionColor={'#fff'}
                            editable={(editing) ? false : true}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: STYLES.SAFEAREA_STYLE,
    containerStyle: STYLES.CONTAINER_STYLE,
    contentContainer: STYLES.CONTENT_CONTAINER_STYLE,
    inputStyle: {
        width: '100%',
        fontSize: 16,
        alignSelf: 'center',
        color: STYLES.TEXT_COLOR,
        fontFamily: 'Roboto',
    },
    dateText: {
        color: STYLES.TEXT_COLOR,
        fontSize: 23,
        fontFamily: 'Roboto',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 64,
        justifyContent: 'space-between',
    },
    imageStyle: {
        height: 200,
        width: 200,
        alignSelf: 'center',
    }
})

export default connect(null, { submitEntry })(EnterJournalScreen);