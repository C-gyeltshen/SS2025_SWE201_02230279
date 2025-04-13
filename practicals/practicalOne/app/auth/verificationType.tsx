import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

export default function VerificationType() {
    const { width } = useWindowDimensions();
    const router = useRouter();
    const containerWidth = width > 1024 ? "50%" : "95%";

    const handleVerification = () => {
        router.push('/auth/otpVerification');
    };

    return (
        <View style={styles.placeholder}>
            <View style={[styles.container, { width: containerWidth }]}>
                <Text style={styles.h1}>Choose Verification Method:</Text>
                <TouchableOpacity style={styles.button} onPress={handleVerification}>
                    <Text style={styles.buttonText}>OTP via Email</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.button} onPress={handleVerification}>
                    <Text style={styles.buttonText}>OTP via WhatsApp</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacing} />
                <TouchableOpacity style={styles.button} onPress={handleVerification}>
                    <Text style={styles.buttonText}>OTP via SMS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    container: {
        alignItems: "center",
        padding: 16,
        elevation: 2,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "black",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonSpacing: {
        height: 16,
    },
    h1: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    }
});
