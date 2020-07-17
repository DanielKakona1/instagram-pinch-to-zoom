import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import { LoadAssets, StyleGuide, assets as componentAssets } from './src/components';
import Instagram from './src/Instagram';

enableScreens();

const assets: number[] = [
	...componentAssets
];

const AppNavigator = createAppContainer(
	createStackNavigator(
		{
			Instagram: {
				screen: Instagram,
				navigationOptions: {
					title: 'Instagram',
					header: () => null
				}
			}
		},
		{
			defaultNavigationOptions: {
				headerStyle: {
					backgroundColor: StyleGuide.palette.primary,
					borderBottomWidth: 0
				},
				headerTintColor: 'white'
			}
		}
	)
);

export default () => (
	<LoadAssets {...{ assets }}>
		<StatusBar barStyle="light-content" />
		<SafeAreaProvider>
			<AppNavigator />
		</SafeAreaProvider>
	</LoadAssets>
);
