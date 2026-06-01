import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { updatePassword, isLoading: authLoading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [secureCurrent, setSecureCurrent] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmation, setSecureConfirmation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setError("");

    if (!currentPassword || !password || !passwordConfirmation) {
      setError("Please fill in all password fields");
      return;
    }

    if (password.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, password, passwordConfirmation);
      Alert.alert("Success", "Password changed successfully");
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordInput = (
    value: string,
    onChangeText: (value: string) => void,
    placeholder: string,
    secure: boolean,
    onToggle: () => void,
  ) => (
    <View style={[styles.passwordContainer, error && styles.inputError]}>
      <TextInput
        style={styles.passwordInput}
        placeholder={placeholder}
        placeholderTextColor="#9C9CB0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
      <TouchableOpacity onPress={onToggle}>
        <Ionicons name={secure ? "eye-off" : "eye"} size={22} color="#9C9CB0" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 42 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Current Password</Text>
        {renderPasswordInput(
          currentPassword,
          setCurrentPassword,
          "Current Password",
          secureCurrent,
          () => setSecureCurrent(!secureCurrent),
        )}

        <Text style={styles.label}>New Password</Text>
        {renderPasswordInput(
          password,
          setPassword,
          "New Password",
          securePassword,
          () => setSecurePassword(!securePassword),
        )}

        <Text style={styles.label}>Confirm New Password</Text>
        {renderPasswordInput(
          passwordConfirmation,
          setPasswordConfirmation,
          "Confirm New Password",
          secureConfirmation,
          () => setSecureConfirmation(!secureConfirmation),
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleChangePassword}
        disabled={isLoading || authLoading}
      >
        {isLoading || authLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save Password</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13122B",
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#1C1B3A",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  form: {
    marginTop: 40,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  passwordContainer: {
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: "#242448",
    paddingHorizontal: 22,
    backgroundColor: "#171733",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF3B5C",
  },
  errorText: {
    color: "#FF3B5C",
    fontSize: 14,
    marginTop: -6,
  },
  saveBtn: {
    height: 64,
    backgroundColor: "#F2242A",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  saveText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
