import React from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../actions';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import { Header, Separator } from '../components/common';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';
import * as Animatable from 'react-native-animatable';
import { ActionButton } from 'react-native-material-ui';
import JournalItem from '../components/JournalItem';

class JournalScreen extends React.Component {
    componentWillMount() {
        this.props.getEntries();
    }

    _keyExtractor = (item, index) => index;

    handleFabPress() {
        this.props.navigation.navigate('EnterJournalScreen', { editing: false })
    }

    renderItem(item) {
        return <JournalItem item={item} onPress={() => this.props.navigation.navigate('EnterJournalScreen', { editing: true, item: item })} />
    }

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
                        <Text style={styles.titleText}>
                            Entries
                        </Text>
                        <Separator />
                        <FlatList
                            data={this.props.journalEntries}
                            renderItem={({ item }) => this.renderItem(item)}
                            keyExtractor={this._keyExtractor}
                            removeClippedSubviews={false}
                        />
                    </View>
                    <ActionButton
                        onPress={() => this.handleFabPress()}
                        style={{
                            container: {
                                backgroundColor: STYLES.ACCENT_COLOR
                            }
                        }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: STYLES.SAFEAREA_STYLE,
    containerStyle: STYLES.CONTAINER_STYLE,
    contentContainer: STYLES.CONTENT_CONTAINER_STYLE,
    titleText: {
        color: STYLES.TEXT_COLOR,
        fontSize: 23,
        fontFamily: 'Roboto',
    }
})

const mapStateToProps = state => {
    const { loading, journalEntries } = state.fetch;
    console.log('here is journal entries', journalEntries);

    return { loading, journalEntries };
}

export default connect(mapStateToProps, { getEntries })(JournalScreen);