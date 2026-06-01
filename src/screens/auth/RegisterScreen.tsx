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
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register, isLoading: authLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!firstName) {
      setFirstNameError("First name is required");
      return;
    }
    if (!lastName) {
      setLastNameError("Last name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register(firstName, lastName, email, password);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Registration failed");
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
        <Text style={styles.headerText}>Let's get started</Text>
        <Text style={styles.subtext}>The latest movies and series are here</Text>

        <TextInput
          style={[styles.input, firstNameError && styles.inputError]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        {firstNameError && <Text style={styles.errorText}>{firstNameError}</Text>}

        <TextInput
          style={[styles.input, lastNameError && styles.inputError]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {lastNameError && <Text style={styles.errorText}>{lastNameError}</Text>}

        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <View style={[styles.passwordContainer, passwordError && styles.inputError]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={securePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Ionicons name={securePassword ? "eye-off" : "eye"} size={22} color="#aaa" />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <View style={[styles.passwordContainer, confirmPasswordError && styles.inputError]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secureConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
            <Ionicons name={secureConfirmPassword ? "eye-off" : "eye"} size={22} color="#aaa" />
          </TouchableOpacity>
        </View>
        {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={styles.link}>Terms and Services</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading || authLoading}>
          {isLoading || authLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => (navigation as any).navigate("Login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: -10,
  },
  headerText: {
    fontSize: 20,
    color: "#fcf5f5",
    textAlign: "center",
    marginBottom: 20,
  },
  subtext: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
    height: 100,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    color: "#ffffff",
    paddingVertical: 10,
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    color: "#fff",
    marginLeft: 8,
    flexShrink: 1,
  },
  link: {
    color: "#00bcd4",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#d40000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#aaa",
    fontSize: 14,
  },
  loginLink: {
    color: "#F2242A",
    fontSize: 14,
    fontWeight: "bold",
  },
});
