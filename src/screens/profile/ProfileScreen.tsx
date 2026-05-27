import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LogoutModalExample() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.iconCircle}>
              <Ionicons name="help" size={40} color="#fff" />
            </View>
            <Text style={styles.title}>Are you sure?</Text>
            <Text style={styles.description}>
              Logout!? Why you to logout ? that our cinema not interested!
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={() => console.log("Logged out")}
              >
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#1c1c1c",
    width: "85%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  iconCircle: {
    backgroundColor: "orange",
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  description: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  logoutButton: { backgroundColor: "turquoise" },
  cancelButton: { backgroundColor: "#333" },
  logoutText: { color: "#000", fontWeight: "bold" },
  cancelText: { color: "#fff", fontWeight: "bold" },
});
