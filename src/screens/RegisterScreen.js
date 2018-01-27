import React from 'react';
import { connect } from 'react-redux';
import { registerWithEmail } from '../actions';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-material-ui';
import * as STYLES from '../styles';

class RegisterScreen extends React.Component {
    state = {
        firstName: '',
        email: '',
        password: '',
        passwordAgain: '',
    }

    validateInputs(obj) {
        let { firstName, email, password, passwordAgain } = obj;
        let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (firstName.length < 2) {
            this.setState({
                error: 'Please enter a first name.',
            })
            return false;
        }
        if (!emailTest.test(email)) {
            this.setState({
                error: 'Please enter a valid email.',
            })
            return false;
        }
        if (password.length <= 4) {
            this.setState({
                error: 'Please enter a more robust password',
            })
            return false;
        }
        if (password !== passwordAgain) {
            this.setState({
                error: 'Passwords do not match',
            })
            return false;
        }
        return true;
    }

    handleSubmitPress() {
        let obj = {
            firstName: this.state.firstName,
            email: this.state.email,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
        }
        if (this.validateInputs(obj)) {
            // TODO: register here
            this.props.registerWithEmail(obj, this.props.navigation);
        }
    }

    renderButtons() {
        if (this.props.loading) {
            return (
                <ActivityIndicator size={'large'} color={STYLES.TEXT_COLOR} />
            )
        } else {
            return (
                <View style={styles.buttonContainer}>
                    <Button
                        primary
                        raised
                        text="Submit"
                        onPress={() => this.handleSubmitPress()}
                        style={{ container: { marginVertical: 10 }}}
                    />
                </View>
            )
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <KeyboardAvoidingView style={[styles.contentContainer, { justifyContent: 'center' }]} behavior={'padding'}>
                        <Text style={styles.titleText}>Register</Text>
                        <Text style={styles.inputTitle}>First Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ firstName: text, error: '' })}
                            value={this.state.firstName}
                            autoCapitalize={'words'}
                            autoCorrect={false}
                            keyboardType={'default'}
                            underlineColorAndroid={'transparent'}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                            selectionColor={'#fff'}
                        />
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ email: text, error: '' })}
                            value={this.state.email}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'email-address'}
                            underlineColorAndroid={'transparent'}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                            selectionColor={'#fff'}
                        />
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ password: text, error: '' })}
                            value={this.state.password}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                            selectionColor={'#fff'}
                        />
                        <Text style={styles.inputTitle}>Confirm Password</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ passwordAgain: text, error: '' })}
                            value={this.state.passwordAgain}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                            selectionColor={'#fff'}
                        />
                        {this.renderButtons()}
                        <TouchableOpacity
                            style={styles.backButtonContainer}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon
                                name={'md-arrow-back'}
                                type={'ionicon'}
                                color={STYLES.TEXT_COLOR}
                                size={30}
                            />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
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
        height: 40,
        width: '100%',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        paddingHorizontal: 8,
        alignSelf: 'center',
        color: '#fff',
    },
    inputTitle: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: '400',
        alignSelf: 'flex-start',
        color: STYLES.TEXT_COLOR,
        fontFamily: 'Roboto',
    },
    titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Sedgwick',
        color: STYLES.TEXT_COLOR,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 55,
        fontFamily: 'Roboto',
    },
    buttonContainer: {
        marginTop: 20,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        paddingHorizontal: 10
    }
})

const mapStateToProps = state => {
    const { loading } = state.fetch;
    return { loading };
}

export default connect(mapStateToProps, { registerWithEmail })(RegisterScreen);