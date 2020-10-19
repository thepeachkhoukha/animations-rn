import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	add,
	Clock,
	cond,
	eq,
	Extrapolate,
	interpolate,
	not,
	set,
	startClock,
	useCode,
	Value,
} from "react-native-reanimated";
import { Button, Card, cards } from "./components";

export default function CardFadeInOut() {
	const clock = new Clock();
	const startAnimation = new Value(0);
	const startTime = new Value(0);
	const duration = 1000;
	const endTime = add(startTime, duration);
	const from = new Value(0);
	const to = new Value(1);

	const opacity = interpolate(clock, {
		inputRange: [startTime, endTime],
		outputRange: [from, to],
		extrapolate: Extrapolate.CLAMP,
	});
	useCode(
		() => [
			cond(eq(startAnimation, 1), [
				startClock(clock),
				set(from, opacity),
				set(to, not(to)),
				set(startTime, clock),
				set(startAnimation, 0),
			]),
		],
		[]
	);
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Animated.View style={{ opacity }}>
					<Card card={cards[0]} />
				</Animated.View>
			</View>
			<Button
				label="Toggle"
				primary
				onPress={() => startAnimation.setValue(1)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	card: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});
