import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NewPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { forgotPasswordReset, isLoading: authLoading } = useAuth();
  const email = (route.params as any)?.email || "";
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleReset = async () => {
    setCodeError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!code) {
      setCodeError("Code is required");
      return;
    }
    if (code.length !== 6) {
      setCodeError("Code must be 6 digits");
      return;
    }
    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (!email) {
      setCodeError("Email not found");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordReset(email, code, newPassword, confirmPassword);
      Alert.alert("Success", "Password has been reset");
      (navigation as any).navigate("Login");
    } catch (err) {
      Alert.alert("Error", err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Enter your new password</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.codeInput, codeError && styles.inputError]}
            placeholder="Verification Code"
            placeholderTextColor="#aaa"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          {codeError && <Text style={styles.errorText}>{codeError}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.passwordInput, passwordError && styles.inputError]}
            placeholder="New Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secureNew}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
            <Ionicons
              name={secureNew ? "eye-off" : "eye"}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.passwordInput, confirmPasswordError && styles.inputError]}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secureConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
            <Ionicons
              name={secureConfirm ? "eye-off" : "eye"}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
          {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset} disabled={isLoading || authLoading}>
          {isLoading || authLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.resetText}>Reset</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginLeft: -10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  codeInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 4,
  },
  resetButton: {
    backgroundColor: "#fc1818",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
