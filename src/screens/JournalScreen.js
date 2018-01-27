import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';
import * as Animatable from 'react-native-animatable';

class JournalScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.containerStyle}>
                    <Header
                        leftComponent={{
                            icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('DrawerOpen'), underlayColor: 'transparent', type: 'material-community'
                        }}
                        centerComponent={{
                            text: 'Journal', style: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'Sedgwick', lineHeight: 40 }
                        }}
                        // rightComponent={{
                        //     icon: 'refresh', color: '#fff', onPress: () => this.handleRefreshPress(), underlayColor: 'transparent'
                        // }}
                        backgroundColor={STYLES.SD_PURPLE}
                        outerContainerStyles={(Platform.OS === 'android') ? { height: 80 } : {}}
                    />
                    <ScrollView style={styles.contentContainer}>
                        <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.navigation.navigate('EnterJournalScreen', { type: 'day' })}>
                            <Animatable.Image
                                source={require('../../assets/images/day.png')}
                                style={styles.imageStyle}
                                resizeMode={'contain'}
                                animation={'bounceInLeft'}
                            />
                            <Animatable.Text
                                style={styles.textStyle}
                                animation={'fadeIn'}
                                delay={500}
                            >
                                Day Journal
                            </Animatable.Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer} onPress={() => this.props.navigation.navigate('EnterJournalScreen', { type: 'dream' })}>
                            <Animatable.Image
                                source={require('../../assets/images/night.jpg')}
                                style={styles.imageStyle}
                                resizeMode={'contain'}
                                animation={'bounceInRight'}
                            />
                            <Animatable.Text
                                style={styles.textStyle}
                                animation={'fadeIn'}
                                delay={1000}
                            >
                                Dream Journal
                            </Animatable.Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: STYLES.SAFEAREA_STYLE,
    containerStyle: STYLES.CONTAINER_STYLE,
    contentContainer: STYLES.CONTENT_CONTAINER_STYLE,
    imageContainer: {
        height: 230,
        width: '100%',
        marginBottom: 10,
    },
    imageStyle: {
        height: '100%',
        width: '100%',
    },
    textStyle: {
        position: 'absolute',
        top: 20,
        left: 40,
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Sedgwick',
        lineHeight: 50,
    }
})

export default JournalScreen;