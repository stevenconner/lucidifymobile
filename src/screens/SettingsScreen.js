import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { Header } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';

class SettingsScreen extends React.Component {
    handleLogoutPress() {
        this.props.logOut(this.props.navigation);
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        leftIconName={'md-arrow-back'}
                        leftIconType={'ionicon'}
                        leftPress={() => this.props.navigation.goBack()}
                        hideSettings={true}
                    />
                    <View style={[styles.contentContainer, { justifyContent: 'center' }]}>
                        <Button
                            title={'Log Out'}
                            backgroundColor={'#a00'}
                            onPress={() => this.handleLogoutPress()}
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
})

export default connect(null, { logOut })(SettingsScreen);