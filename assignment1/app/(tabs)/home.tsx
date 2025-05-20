import { useUser } from "@/shared/services/userAccount";
import React from "react";
import { View, Text } from "react-native";

export default function ProfileScreen() {   
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <Text>User ID: {user.id}</Text>
      ) : (
        <Text>User not logged in</Text>
      )}
    </View>
  );
}