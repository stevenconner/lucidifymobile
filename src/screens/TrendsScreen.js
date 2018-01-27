import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';

class TrendsScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        leftComponent={{
                            icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('DrawerOpen'), underlayColor: 'transparent', type: 'material-community'
                        }}
                        centerComponent={{
                            text: 'Trends', style: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'Sedgwick', lineHeight: 40 }
                        }}
                        // rightComponent={{
                        //     icon: 'refresh', color: '#fff', onPress: () => this.handleRefreshPress(), underlayColor: 'transparent'
                        // }}
                        backgroundColor={STYLES.SD_PURPLE}
                        outerContainerStyles={(Platform.OS === 'android') ? { height: 80 } : {}}
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