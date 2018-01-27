import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage,
    Image
} from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import * as STYLES from '../styles';

class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        checkLoggedIn: false,
    }

    async componentWillMount() {
        let jwt = await AsyncStorage.getItem('jwt');
        if (jwt) {
            const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({ routeName: 'DrawerNavigation' })
                ]
            })
            this.props.navigation.dispatch(resetAction);
        } else {
            this.setState({ checkLoggedIn: true });
        }
    }

    handleLoginPress() {
        if (this.state.email && this.state.password) {
            this.props.logIn(this.state.email, this.state.password, this.props.navigation);
        } else {
            let toast = Toast.show(`Please enter an email and password!`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
            });
        }
    }

    renderButtons() {
        if (this.props.loading) {
            return (
                <View style={{ width: '100%', marginTop: 10 }}>
                    <ActivityIndicator size={'large'} color={STYLES.SD_DARK_PURPLE} />
                </View>
            )
        } else {
            return (
                <View style={{ width: '100%', marginTop: 10 }}>
                    <Button
                        style={{ marginTop: 10 }}
                        onPress={() => this.handleLoginPress()}
                        title={'LOGIN'}
                        backgroundColor={STYLES.SD_PURPLE}
                    />
                    <Button
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                        title={'REGISTER'}
                        backgroundColor={STYLES.SD_PURPLE}
                    />
                </View>
            )
        }
    }

    renderErrorMsg() {
        if (this.props.errorMsg != '') {
            return <Text style={styles.errorMsg}>{this.props.errorMsg}</Text>
        }
    }

    render() {
        if (!this.state.checkLoggedIn) {
            return (
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={'large'} color={STYLES.SD_DARK_PURPLE} />
                    </View>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <KeyboardAvoidingView style={styles.contentContainer} behavior={'padding'}>
                        <Text style={styles.titleText}>{STYLES.APP_NAME}</Text>
                        <Text style={styles.textInputTitle}>Email</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({ email: text, error: '' })}
                            value={this.state.email}
                            placeholder={'Email@Address.com'}
                            placeholderTextColor={'#888'}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            underlineColorAndroid={'transparent'}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                        />
                        <Text style={styles.textInputTitle}>Password</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            onChangeText={(text) => this.setState({ password: text, error: '' })}
                            value={this.state.password}
                            placeholder={'Password'}
                            placeholderTextColor={'#888'}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            underlineColorAndroid={'transparent'}
                            onSubmitEditing={() => this.handleLoginPress()}
                            selectionColor={STYLES.SD_DARK_PURPLE}
                        />
                        {this.renderErrorMsg()}
                        {this.renderButtons()}
                    </KeyboardAvoidingView>
                    <Image
                        source={require('../../assets/images/splash3.jpg')}
                        style={styles.backgroundImage}
                        resizeMode={'cover'}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: STYLES.SAFEAREA_STYLE,
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: "3%"
    },
    titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Sedgwick',
        color: '#fff',
        lineHeight: 55,
    },
    textInputTitle: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: '400',
        alignSelf: 'flex-start',
        color: '#fff',
    },
    textInputStyle: {
        height: 38,
        width: '100%',
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 5,
        padding: 5,
    },
    errorMsg: {
        color: '#a00',
        fontSize: 18,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff'
    },
    backgroundImage: {
        position: 'absolute',
        zIndex: -5,
        height: '100%',
        top: 0,
    }
})

const mapStateToProps = state => {
    const { errorMsg } = state.auth;
    const { loading } = state.fetch;

    return { loading, errorMsg };
}

export default connect(mapStateToProps, { logIn })(LoginScreen);