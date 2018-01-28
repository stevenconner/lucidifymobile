import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Header } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';

class TrendsScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        // leftIconName={'md-arrow-back'}
                        // leftIconType={'ionicon'}
                        // leftPress={() => this.props.navigation.goBack()}
                        rightPress={() => this.props.navigation.navigate('SettingsScreen')}
                    />
                    <View style={styles.contentContainer}>
                        <Text>This is the trends screen</Text>
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

export default TrendsScreen;