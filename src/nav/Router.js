import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as STYLES from '../styles';
import { Icon } from 'react-native-elements';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JournalEntriesScreen from '../screens/JournalEntriesScreen';
import JournalScreen from '../screens/JournalScreen';
import TrendsScreen from '../screens/TrendsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EnterJournalScreen from '../screens/EnterJournalScreen';

const TrendsStack = StackNavigator({
    TrendsScreen: {
        screen: TrendsScreen,
    },
    SettingsScreen: {
        screen: SettingsScreen,
    }
}, {
    navigationOptions: {
        tabBarLabel: 'Trends',
        header: null,
        tabBarIcon: ({ tintColor }) => 
            <Icon
                name={'graph'}
                type={'simple-line-icon'}
                color={tintColor}
                size={25}
            />
    }
})

const JournalStack = StackNavigator({
    JournalScreen: {
        screen: JournalScreen,
    },
    EnterJournalScreen: {
        screen: EnterJournalScreen,
    },
    SettingsScreen: {
        screen: SettingsScreen,
    }
}, {
        navigationOptions: {
            tabBarLabel: 'Journal',
            header: null,
            tabBarIcon: ({ tintColor }) => 
                <Icon
                    name={'notebook'}
                    type={'simple-line-icon'}
                    color={tintColor}
                    size={20}
                />
        }
    })

const TabNavigation = TabNavigator({
    JournalStack: {
        screen: JournalStack,
    },
    TrendsStack: {
        screen: TrendsStack,
    }
}, {
    initialRouteName: 'JournalStack',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: STYLES.TEXT_COLOR,
        inactiveTintColor: STYLES.TEXT_ACCENT,
        style: {
            backgroundColor: STYLES.SD_DARK_PURPLE,
            paddingBottom: 5,
        },
        indicatorStyle: {
            backgroundColor: STYLES.TEXT_COLOR
        },
        labelStyle: {
            fontWeight: '700',
        },
        pressColor: STYLES.TEXT_COLOR,
        showIcon: true,
    }
})

export const Routes = {
    LoginScreen: {
        screen: LoginScreen,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    },
    RegisterScreen: {
        screen: RegisterScreen,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    },
    TabNavigation: {
        screen: TabNavigation,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    }
}