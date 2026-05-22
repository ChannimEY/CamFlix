import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }: { navigation?: any }) => {
  const showLogoutPopup = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation?.navigate("Logout"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i1-e.pinimg.com/1200x/e6/91/2f/e6912f709474be6a30a0f70cd84bd423.jpg" }}
          style={styles.profileImage}
        />

        <Text style={styles.name}>Channim</Text>
        <Text style={styles.email}>nim32@gmail.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation?.navigate("EditProfile")}
        >
          <View style={styles.menuIcon}>
            <Ionicons name="create-outline" size={22} color="#00D9F5" />
          </View>

          <Text style={styles.menuText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={22} color="#7C7C98" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={showLogoutPopup}>
          <View style={styles.menuIcon}>
            <Ionicons name="log-out-outline" size={22} color="#F2242A" />
          </View>

          <Text style={styles.menuText}>Logout</Text>
          <Ionicons name="chevron-forward" size={22} color="#7C7C98" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13122B",
    paddingHorizontal: 24,
  },

  header: {
    paddingTop: 10,
    marginBottom: 28,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 36,
  },

  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 18,
  },

  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  email: {
    color: "#9C9CB0",
    fontSize: 16,
    marginTop: 6,
  },

  menu: {
    gap: 14,
  },

  menuItem: {
    minHeight: 64,
    borderRadius: 18,
    backgroundColor: "#1C1B3A",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#242448",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  menuText: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
