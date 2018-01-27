import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JournalEntriesScreen from '../screens/JournalEntriesScreen';
import JournalScreen from '../screens/JournalScreen';
import TrendsScreen from '../screens/TrendsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const DrawerNavigation = DrawerNavigator({
    JournalEntriesScreen: { screen: JournalEntriesScreen },
    JournalScreen: { screen: JournalScreen },
    TrendsScreen: { screen: TrendsScreen },
    SettingsScreen: { screen: SettingsScreen },
}, {
        initialRouteName: 'JournalScreen'
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