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
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VerifyCodeScreen() {
  const navigation = useNavigation();
  const { verifyEmail, sendEmailVerification, user, isLoading: authLoading } = useAuth();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (error) setError("");
  };

  const handleVerify = async () => {
    const codeValue = code.join("");
    if (codeValue.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await verifyEmail(codeValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");
    try {
      await sendEmailVerification();
      Alert.alert("Success", "Verification code resent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {user ? (
          <Text style={styles.subtitle}>
            We have just sent you 6 digit code via your email {user.email}.
          </Text>
        ) : (
          <Text style={styles.subtitle}>
            We have just sent you 6 digit code via your email.
          </Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={handleVerify} disabled={isLoading || authLoading}>
          {isLoading || authLoading ? (
            <ActivityIndicator color="#fff" size={20} />
          ) : (
            <Text style={styles.continueText}>Continue</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.resendText}>Didn't receive code? Resend.</Text>
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
    justifyContent: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  codeInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  continueButton: {
    backgroundColor: "#d40000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendButton: {
    paddingVertical: 10,
  },
  resendText: {
    color: "#20c6f0",
    fontSize: 14,
    textAlign: "center",
  },
});