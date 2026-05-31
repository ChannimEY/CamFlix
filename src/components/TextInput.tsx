import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface AppTextInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  label?: string;
}

export default function TextInput({
  containerStyle,
  inputWrapperStyle,
  icon,
  label,
  secureTextEntry = false,
  placeholderTextColor = "#8E8E93",
  style,
  ...rest
}: AppTextInputProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        {icon}
        <RNTextInput
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isSecure}
          style={[styles.input, style]}
          {...rest}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setIsSecure((value) => !value)}>
            <AntDesign
              name={isSecure ? "eye" : "eye-invisible"}
              size={22}
              color="#8E8E93"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2D3A",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 12,
  },
});
