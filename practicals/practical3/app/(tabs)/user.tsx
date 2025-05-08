import React from "react";
import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { getUsers } from "@/shared/services/userAccount";

export default function GetUserScreen() {
  async function GetUser() {
    try {
      const user = await getUsers();
      console.log("User fetched:", user);
      Alert.alert("User fetched", JSON.stringify(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.alert("Error", "Failed to fetch user.");
    }
  }

  return (
    <View style={styles.view}>
      <Pressable style={styles.button} onPress={GetUser}>
        <Text style={styles.text}>Get User</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});
