import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function VerifyCodeScreen() {
  const [code, setCode] = useState(["", "", "", "","",""]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    
      <Text style={styles.title}>Verifying Your Account</Text>
      <Text style={styles.subtitle}>
        We have just sent you 6 digit code via your email example@gmail.com.
      </Text>
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
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.resend}>Didn’t receive code? Resend.</Text>
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
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 30,
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
  resend: {
    color: "#20c6f0",
    fontSize: 14,
    textAlign: "center",
  },
});