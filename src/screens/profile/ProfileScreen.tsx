import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutPress = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await logout();
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleEditProfile = () => {
    (navigation as any).navigate("EditProfile");
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.name) {
      return user.name[0].toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "?";
  };

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.name) return user.name;
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.profileRow}>
            {user?.profile_photo ? (
              <Image source={{ uri: user.profile_photo }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{getInitials()}</Text>
              </View>
            )}

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.name}>{getDisplayName()}</Text>
              <Text style={styles.email}>{user?.email || "example@gmail.com"}</Text>
            </View>

            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={22} color="#fff" />
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.item} onPress={() => (navigation as any).navigate("ChangePassword")}>
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

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal transparent visible={showLogoutConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalText}>
              Logout? Why would you logout? Our cinema is not interesting!
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutModalButton]}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.logoutModalText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={handleCancelLogout}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
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
    backgroundColor: "#d40000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  modalOverlay: {
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  logoutModalButton: { backgroundColor: "red" },
  cancelModalButton: { backgroundColor: "#ee1a1a" },
  logoutModalText: { color: "#f8f1f1", fontWeight: "bold" },
  cancelModalText: { color: "#fff", fontWeight: "bold" },
});
