import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUp = () => {
    
    console.log({ fullName, email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.header}>Let’s get started</Text>
      <Text style={styles.subtext}>The latest movies and series are here</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        
      />
       
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="ComfirmPassword"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.checkboxContainer}>
        
        <Text style={styles.checkboxText}>
          I agree to the{" "}
          <Text style={styles.link}>Terms and Services</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
  height:100,
},
Text:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    
},
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
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
});
