import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JournalEntriesScreen from '../screens/JournalEntriesScreen';
import JournalScreen from '../screens/JournalScreen';
import TrendsScreen from '../screens/TrendsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EnterJournalScreen from '../screens/EnterJournalScreen';

const JournalStack = StackNavigator({
    JournalScreen: {
        screen: JournalScreen,
    },
    EnterJournalScreen: {
        screen: EnterJournalScreen,
    }
}, {
        navigationOptions: {
            drawerLabel: 'Journal',
            header: null,
        }
})

const DrawerNavigation = DrawerNavigator({
    JournalStack: {
        screen: JournalStack,
    },
    JournalEntriesScreen: {
        screen: JournalEntriesScreen,
        navigationOptions: {
            drawerLabel: 'Entries',
        }
    },
    TrendsScreen: {
        screen: TrendsScreen,
        navigationOptions: {
            drawerLabel: 'Trends',
        }
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            drawerLabel: 'Settings',
        }
    },
}, {
        initialRouteName: 'JournalStack'
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
    DrawerNavigation: {
        screen: DrawerNavigation,
        mode: 'card',
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        }
    }
}