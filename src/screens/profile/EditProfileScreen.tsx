import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, unwrapUser } from "../../api/services/authService";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, token, refreshUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name || user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.last_name || user?.name?.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await updateProfile({ first_name: firstName, last_name: lastName, email }, token);
      const updatedUser = unwrapUser(response);
      if (updatedUser) {
        await refreshUser();
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
    setIsLoading(false);
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
    return user?.email?.split("@")[0] || "";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.profileSection}>
        <View>
          {user?.profile_photo ? (
            <Image source={{ uri: user.profile_photo }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.avatarPlaceholder]}>
              <Text style={styles.avatarText}>{getInitials()}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.editIcon}>
            <FontAwesome name="pencil" size={16} color="#00D9F5" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{getDisplayName()}</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#7C7C98"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13122B",
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#1C1B3A",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  profileSection: {
    alignItems: "center",
    marginTop: 30,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  avatarPlaceholder: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: { color: "#fff", fontSize: 36, fontWeight: "bold" },

  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 5,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1E1D3D",
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 18,
  },

  emailText: {
    color: "#9C9CB0",
    fontSize: 18,
    marginTop: 6,
  },

  form: {
    marginTop: 35,
  },

  inputWrapper: {
    marginBottom: 28,
  },

  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
  },

  input: {
    height: 68,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#242448",
    paddingHorizontal: 24,
    color: "#fff",
    fontSize: 18,
    backgroundColor: "#171733",
  },

  errorInput: {
    borderColor: "#FF3B5C",
  },

  errorText: {
    color: "#FF3B5C",
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
  },

  passwordContainer: {
    height: 68,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#242448",
    paddingHorizontal: 24,
    backgroundColor: "#171733",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  passwordInput: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
  },

  saveBtn: {
    height: 70,
    backgroundColor: "#F2242A",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  saveText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  bottomNav: {
    marginTop: "auto",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
  },

  activeTab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1D3D",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },

  activeText: {
    color: "#00D9F5",
    fontSize: 18,
    fontWeight: "600",
  },
});