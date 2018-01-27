import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Header, Button } from 'react-native-elements';
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
                        leftComponent={{
                            icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('DrawerOpen'), underlayColor: 'transparent', type: 'material-community'
                        }}
                        centerComponent={{
                            text: 'Settings', style: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'Sedgwick', lineHeight: 40 }
                        }}
                        // rightComponent={{
                        //     icon: 'refresh', color: '#fff', onPress: () => this.handleRefreshPress(), underlayColor: 'transparent'
                        // }}
                        backgroundColor={STYLES.SD_PURPLE}
                        outerContainerStyles={(Platform.OS === 'android') ? { height: 80 } : {}}
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