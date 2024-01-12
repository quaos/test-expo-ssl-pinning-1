import {
    Pressable,
    type PressableProps,
    type StyleProp,
    StyleSheet,
    Text,
    type TextStyle,
    View,
    type ViewStyle,
} from "react-native";

import type { PropsWithChildren } from "react";

export interface ButtonProps extends PressableProps {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
    children,
    containerStyle,
    disabled,
    style,
    textStyle,
    ...pressableProps
}: PropsWithChildren<ButtonProps>) => {
    const baseContainerStyle = [styles.container, disabled ? styles.disabledContainer : undefined];
    const basePressableStyle = [styles.pressable];
    const baseTextStyle = [styles.text, disabled ? styles.disabledText : undefined];

    return (
        <View style={[...baseContainerStyle, containerStyle]}>
            <Pressable
                {...pressableProps}
                disabled={disabled}
                style={StyleSheet.flatten([...basePressableStyle, style])}
            >
                {typeof children === "string" ? (
                    <Text style={[...baseTextStyle, textStyle]}>{children}</Text>
                ) : (
                    children
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#666",
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    disabledContainer: {
        borderColor: "#888",
    },
    disabledText: {
        color: "#666",
    },
    pressable: {
        alignContent: "center",
        flex: 1,
        flexDirection: "row",
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    text: {
        color: "#000",
        display: "flex",
    },
});
