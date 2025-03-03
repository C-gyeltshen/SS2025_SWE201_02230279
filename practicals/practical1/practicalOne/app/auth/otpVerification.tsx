import { StyleSheet, View, Text, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function OtpVerification() {
    const [number, onChangeNumber] = useState('');
    const { width } = useWindowDimensions(); // Get current screen width

    // Set input width based on screen size
    const inputWidth = width > 1024 ? "40%" : "80%"; // 40% for desktop, 80% for tablet & phone

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter OTP via E-mail</Text>
            <Text style={styles.subText}>
                We have sent an email to <Text style={styles.email}>chimi@gmail.com</Text>
            </Text>
            <Text style={styles.otp}>OTP</Text>
            <TextInput
                style={[styles.input, { width: inputWidth }]} // Apply dynamic width
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter your OTP"
                keyboardType="numeric"
                maxLength={6}
            />
            <TouchableOpacity style={[styles.button, {width: inputWidth}]} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Try Another Method</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subText: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
    email: {
        fontWeight: "bold",
        color: "#007BFF",
    },
    otp: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: "center",
        backgroundColor: "white",
        elevation: 3, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007BFF", // Blue color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
