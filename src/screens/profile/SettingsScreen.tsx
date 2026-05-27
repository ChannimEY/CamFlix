import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.profileRow}>
          <Image
          source={require('@/assets/images/mimi.jpg')}
          style={styles.avatar}
        />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.name}>Example</Text>
            <Text style={styles.email}>example@gmail.com</Text>
          </View>
          <Ionicons name="create-outline" size={22} color="#fff" />
        </View>
        
        <View style={styles.premiumBanner}>
          <Text style={styles.premiumTitle}>Premium Member</Text>
          <Text style={styles.premiumText}>
            New movies are coming for you, Download Now!
          </Text>
        </View>

      
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>

        
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Country</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Clear Cache</Text>
        </TouchableOpacity>

      
        <Text style={styles.sectionTitle}>More</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Legal and Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Help & Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    margin: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { color: "#fff", fontSize: 18, fontWeight: "600" },
  email: { color: "#aaa", fontSize: 14 },
  premiumBanner: {
    backgroundColor: "#ff8800",
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  premiumTitle: { color: "#fff", fontWeight: "bold", marginBottom: 5 },
  premiumText: { color: "#fff", fontSize: 14 },
  sectionTitle: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { color: "#fff", fontSize: 16 },
  logoutButton: {
    backgroundColor: "#00d4aa",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  
});
