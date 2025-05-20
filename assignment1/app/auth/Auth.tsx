import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
} from "react-native";
// import { makeRedirectUri } from "expo-auth-session";
import { Button, Input } from "@rneui/themed";
import { supabase } from "@/app/lib/supabase";
import { Redirect, useRouter, useFocusEffect } from 'expo-router';
// import { useRouter,  } from 'expo-router';


export default function Auth() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  // Sign in with email/password
  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }else{
      router.replace('/(tabs)/todo')
    }
    setLoading(false);
  };

  //  Sign up with email/password
  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Email */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      {/* Magic Link */}
      <Button
          title="Use Magic Link"
          disabled={loading}
          onPress={() =>router.navigate('/auth/magicLink')}
        />
      {/* Phone Auth */}
      <View style={styles.verticallySpaced}>
        <Button
          title="Login Using Phone Number"
          disabled={loading}
          onPress={() =>router.navigate('/auth/phoneAuth')}
        />
      </View>
      {/* Sign In */}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>

      {/* Sign Up */}
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  megicLinkText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dddfe2",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
