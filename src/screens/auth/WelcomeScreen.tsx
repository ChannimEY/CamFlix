import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
   
      <View style={styles.logoContainer}>
        <Pressable>
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.logo}
          />
        </Pressable>

        <Text style={styles.subtitle}>
          Discover the latest movies {"\n"}
          and stream anytime anywhere
        </Text>
      </View>

 
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Already have an account?
        </Text>

        <TouchableOpacity>
          <Text style={styles.loginButton}> Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />

        <Text style={styles.dividerText}>
          Or continue with
        </Text>

        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
   
        <TouchableOpacity style={styles.googleButton}>
            <Image
            source={require("../../assets/google.png")}
            style={styles.logoGoogle}
          />
        </TouchableOpacity>

      
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons
            name="logo-apple"
            size={40}
            color="#ffffff"
          />
        </TouchableOpacity>

    
        <TouchableOpacity style={styles.facebookButton}>
          <FontAwesome
            name="facebook"
            size={40}
            color="#ffffff"
            backgroundColor="#007CF7"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingVertical: 50,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 70,
  },

  logo: {
    width: 220,
    height: 240,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 18,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 28,
  },

  signUpButton: {
    backgroundColor: "#F2242A",
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#F2242A",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },

  signUpText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
  },

  loginText: {
    color: "#94A3B8",
    fontSize: 17,
  },

  loginButton: {
    color: "#F2242A",
    fontSize: 17,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },

  dividerText: {
    color: "#64748B",
    marginHorizontal: 12,
    fontSize: 16,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },

  socialButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logoGoogle:{
    width: 78,
    height: 78,
    resizeMode: "contain",
  },
   googleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});