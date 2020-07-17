import React from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import Reanimated, { Value, cond, eq, or } from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';
import { State } from 'react-native-gesture-handler';
import { Header, Post, Stories } from './components';
import { posts } from './components/data';
import Footer, { FOOTER_HEIGHT } from './components/Footer';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

const { height } = Dimensions.get('window');

export default () => {
	const insets = useSafeArea();
	const y = new Animated.Value(0);
	// This animation value needs to come from Vanilla Animated
	const items = posts.map((post) => ({
		post,
		state: new Value(State.UNDETERMINED)
	}));
	const top = height - FOOTER_HEIGHT - insets.bottom;
	const isActive = or(...items.map(({ state }) => eq(state, State.ACTIVE)));
	const opacity = cond(isActive, 0.5, 0);
	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<Animated.ScrollView
				pinchGestureEnabled={false}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={1}
				contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + insets.bottom }}
				onScroll={Animated.event(
					[
						{ nativeEvent: { contentOffset: { y } } }
					],
					{
						useNativeDriver: true
					}
				)}
			>
				<Animated.View
					style={{
						transform: [
							{ translateY: y }
						],
						zIndex: 2
					}}
				>
					<Header />
				</Animated.View>

				<Stories />
				{items.map(({ post, state }) => <Post key={post.id} {...{ post, state }} />)}

				<Animated.View
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top,
						transform: [
							{ translateY: y }
						],
						zIndex: 2
					}}
				>
					<Footer />
				</Animated.View>
				<Reanimated.View
					style={{
						...StyleSheet.absoluteFillObject,
						backgroundColor: 'black',
						opacity,
						zIndex: 2
					}}
					pointerEvents="none"
				/>
			</Animated.ScrollView>
		</View>
	);
};
