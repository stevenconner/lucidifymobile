import React from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../actions';
import moment from 'moment';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import * as STYLES from '../styles';
import DayNightSwitch from '../components/DayNightSwitch';

class JournalEntriesScreen extends React.Component {
    state = {
        selected: 'day',
    }

    componentWillMount() {
        this.props.getEntries();
    }

    handleDayPress() {
        this.setState({
            selected: 'day',
        })
    }

    handleDreamPress() {
        this.setState({
            selected: 'dream',
        })
    }

    handleItemPress() {

    }

    _keyExtractor = (item, index) => item.id;

    renderItem(item) {
        let time = moment(item.dateAdded).format('MMM D, YYYY')
        return (
            <TouchableOpacity onPress={() => this.handleItemPress()} style={{width: '100%', padding: 5, borderWidth: 1, marginTop: 5 }}>
                <Text>{time}</Text>
                <Text>{item.content}</Text>
            </TouchableOpacity>
        )
    }

    renderList() {
        if (this.state.selected === 'day') {
            return (
                <FlatList
                    data={this.props.dayEntries}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this._keyExtractor}
                    removeClippedSubviews={false}
                />
            )
        } else {
            return (
                <FlatList
                    data={this.props.dreamEntries}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this._keyExtractor}
                    removeClippedSubviews={false}
                />
            )
        }
    }

    render() {
        if (this.props.loading) {
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
                    <Header
                        leftComponent={{
                            icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('DrawerOpen'), underlayColor: 'transparent', type: 'material-community'
                        }}
                        centerComponent={{
                            text: 'Entries', style: { color: '#fff', fontSize: 26, fontWeight: 'bold', fontFamily: 'Sedgwick', lineHeight: 40 }
                        }}
                        // rightComponent={{
                        //     icon: 'refresh', color: '#fff', onPress: () => this.handleRefreshPress(), underlayColor: 'transparent'
                        // }}
                        backgroundColor={STYLES.SD_PURPLE}
                        outerContainerStyles={(Platform.OS === 'android') ? { height: 80 } : {}}
                    />
                    <View style={styles.contentContainer}>
                        <DayNightSwitch
                            selected={this.state.selected}
                            dayPress={() => this.handleDayPress()}
                            dreamPress={() => this.handleDreamPress()}
                        />
                        {this.renderList()}
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
    loadingContainer: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
    }
})

const mapStateToProps = state => {
    const { dayEntries, dreamEntries, loading } = state.fetch;
    
    return { dayEntries, dreamEntries, loading };
}

export default connect(mapStateToProps, { getEntries })(JournalEntriesScreen);