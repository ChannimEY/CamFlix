import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,

} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen({ navigation }: { navigation?: any }) {
  return (
    <SafeAreaView style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.profileSection}>
        <View>
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.profileImage}
          />

          <TouchableOpacity style={styles.editIcon}>
            <FontAwesome name="pencil" size={16} color="#00D9F5" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Tiffany</Text>
        <Text style={styles.emailText}>Tiffanyjearsey@gmail.com</Text>
      </View>

      <View style={styles.form}>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            placeholder="Tiffany"
            placeholderTextColor="#fff"
            style={[styles.input, styles.errorInput]}
          />

          <Text style={styles.errorText}>* Name already exist</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            placeholder="Tiffanyjearsey@gmail.com"
            placeholderTextColor="#7C7C98"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="••••••••••••"
              placeholderTextColor="#7C7C98"
              secureTextEntry
              style={styles.passwordInput}
            />

            <Ionicons
              name="eye-off-outline"
              size={22}
              color="#7C7C98"
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            placeholder="+1 82120142305"
            placeholderTextColor="#7C7C98"
            style={styles.input}
          />
        </View>
      </View>


      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={26} color="#7C7C98" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="search" size={26} color="#7C7C98" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="download-outline" size={26} color="#7C7C98" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.activeTab}>
          <Ionicons name="person" size={22} color="#00D9F5" />
          <Text style={styles.activeText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
