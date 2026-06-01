import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  CastMember,
  getProfileUrl,
} from "../../api/services/movieService";

interface CastTabProps {
  cast: CastMember[];
}

const CastTab = ({ cast }: CastTabProps) => {
  if (cast.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No cast information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cast.slice(0, 12).map((member) => {
        const profileUrl = getProfileUrl(member.profile_path);

        return (
          <View key={member.id} style={styles.castItem}>
            {profileUrl ? (
              <Image source={{ uri: profileUrl }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
              </View>
            )}

            <Text style={styles.name} numberOfLines={1}>
              {member.name}
            </Text>

            <Text style={styles.character} numberOfLines={1}>
              {member.character || "Cast"}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default CastTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  castItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 22,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginBottom: 10,
    backgroundColor: "#1E293B",
  },

  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  name: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  character: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },

  emptyContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: "center",
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});
