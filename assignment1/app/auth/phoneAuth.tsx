import { Input } from "@rneui/themed";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Redirect } from 'expo-router';

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [Otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false); // 🔥 Track if OTP is verified

  const fullPhoneNumber = `+975${phoneNumber.trim()}`;

  const sendPhoneOTP = async () => {
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhoneNumber,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert(`OTP sent to ${fullPhoneNumber}`);
      setOtpSent(true);
    }
  };

  const verifyOTP = async () => {
    if (!Otp) {
      alert("Please enter the OTP.");
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: fullPhoneNumber,
      token: Otp,
      type: "sms",
    });

    if (error) {
      alert(error.message);
    } else {
      Alert.alert("Success", "Phone number verified!");
      console.log("Session:", data.session);
      setVerified(true); 
    }
  };

  if (verified) {
    return <Redirect href="/(tabs)/todo" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.phoneInput}>
        <Input
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          containerStyle={styles.inputContainer}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Send OTP" onPress={sendPhoneOTP} disabled={loading} />
      </View>

      {otpSent && (
        <>
          <TextInput
            style={styles.otpInput}
            placeholder="Enter the OTP"
            value={Otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
          <Pressable onPress={verifyOTP}>
            <Text style={styles.OtpInputText}>Verify OTP</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  phoneInput: {
    width: "80%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "80%",
    marginTop: 10,
  },
  otpInput: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
  OtpInputText: {
    color: "white",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
});
