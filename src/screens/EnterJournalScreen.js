import React from 'react';
import { connect } from 'react-redux';
import { submitEntry } from '../actions';

import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { Button } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import { Header } from 'react-native-elements';
import * as STYLES from '../styles';

class EnterJournalScreen extends React.Component {
    state = {
        journalText: '',
        error: '',
    }

    handleSubmitPress() {
        let type;
        if (this.props.navigation.state.params.type === 'day') {
            type = 1;
        } else {
            type = 2;
        }
        let obj = {
            content: this.state.journalText,
            type: type,
        }
        this.props.submitEntry(obj, this.props.navigation);
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

    render() {
        let type = this.props.navigation.state.params.type;
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        leftComponent={{
                            icon: 'ios-arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack(), underlayColor: 'transparent', type: 'ionicon'
                        }}
                        centerComponent={{
                            text: (type === 'day') ? 'New Day Journal' : 'New Dream Journal', style: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'Sedgwick', lineHeight: 40 }
                        }}
                        // rightComponent={{
                        //     icon: 'refresh', color: '#fff', onPress: () => this.handleRefreshPress(), underlayColor: 'transparent'
                        // }}
                        backgroundColor={STYLES.SD_PURPLE}
                        outerContainerStyles={(Platform.OS === 'android') ? { height: 80 } : {}}
                    />
                    <View style={styles.contentContainer}>
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
                        />
                        {this.renderSubmitButton()}
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
        height: '50%',
        width: '95%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 5,
        padding: 5,
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 20,
    }
})

export default connect(null, { submitEntry })(EnterJournalScreen);