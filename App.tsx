import React, { useRef, useState } from "react";
import { Dimensions, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import {
	Transition,
	Transitioning,
	TransitioningView,
} from "react-native-reanimated";

import {
	FlexibleCard,
	cards,
	Selection,
	StyleGuide,
	Screen,
} from "./components";

const { width } = Dimensions.get("window");

interface Layout {
	id: string;
	name: string;
	layout: {
		container: ViewStyle;
		child?: ImageStyle;
	};
}

const column: Layout = {
	id: "column",
	name: "Column",
	layout: {
		container: {
			justifyContent: "space-between",
			flexDirection: "column",
			alignItems: "center",
		},
	},
};

const row: Layout = {
	id: "row",
	name: "Row",
	layout: {
		container: {
			flexDirection: "row",
			alignItems: "center",
		},
	},
};

const wrap: Layout = {
	id: "wrap",
	name: "Wrap",
	layout: {
		container: {
			flexDirection: "row",
			flexWrap: "wrap",
			alignItems: "center",
		},
		child: {
			flex: 0,
			width: width / 2 - StyleGuide.spacing * 2,
		},
	},
};

const layouts = [column, row, wrap];
const transition = (
	<Transition.Change durationMs={400} interpolation="easeInOut" />
);

export default function App() {
	const ref = useRef<TransitioningView>(null);
	const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
	return (
		<Screen>
			<Transitioning.View
				style={[styles.container, currentLayout.container]}
				{...{ ref, transition }}
			>
				{cards.map((card) => (
					<FlexibleCard
						key={card.id}
						style={currentLayout.child}
						{...{ card }}
					/>
				))}
			</Transitioning.View>
			{layouts.map((layout) => (
				<Selection
					key={layout.id}
					name={layout.name}
					isSelected={layout.layout === currentLayout}
					onPress={() => {
						if (ref.current) {
							ref.current.animateNextTransition();
						}
						setCurrentLayout(layout.layout);
					}}
				/>
			))}
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
