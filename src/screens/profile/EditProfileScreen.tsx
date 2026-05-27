import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EditProfileScreen() {
  const [name, setName] = useState("Jungkook");
  const [email, setEmail] = useState("Jungkook@gmail.com");
  const [password, setPhoneNumber] = useState("098123456");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (name.toLowerCase() === "Jungkook") {
      setError("* Name already exist");
    } else {
      setError("");
      console.log("Profile updated:", { name, email, setPhoneNumber});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/mimi.jpg')}         
           style={styles.profileImage}
        />
        <Ionicons name="pencil" size={20} color="white" style={styles.editIcon} />

      </View>
        <Text style={styles.Text}> Example</Text>
        <Text style={styles.Text}> example@gmail.com</Text>
      
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        placeholderTextColor="#888"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPhoneNumber}
        placeholder="PhoneNumber"
        placeholderTextColor="#888"
        keyboardType="email-address"


      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" }, // black background
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#fff" , textAlign:'center'},
  imageContainer: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: { position: "absolute", bottom: 0, right: 120 },
   Text: { fontSize: 25, marginBottom: 20, color: "#fff" , textAlign:'center'},

  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#fff", // text color white
  },
  error: { color: "red", marginBottom: 10 },
  button: {
    backgroundColor: "turquoise",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { color: "#000", fontWeight: "bold" }, // black text on turquoise
});
