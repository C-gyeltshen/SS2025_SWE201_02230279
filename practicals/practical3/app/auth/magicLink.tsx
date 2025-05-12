import { useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { supabase } from "@/app/lib/supabase";
// import { makeRedirectUri } from "expo-auth-session";

export default function MagicLink() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    // const redirectTo = makeRedirectUri();

    const sendMagicLink = async () => {
        if (!email) {
            alert("Please enter a valid email.");
            return;
        }
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                
            },
        });
        if (error) {
            alert(error.message);
            return;
        }
        alert("Magic link sent! Please check your email.");
        };

    return (
        <View style={styles.container}>
            <View style={styles.phoneInput}>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    containerStyle={styles.inputContainer}
                />
                <Button title="Send Magic Link" onPress={sendMagicLink} disabled={loading} />
            </View>
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
        width: "100%",     
        marginBottom: 20,
    },
    buttonWrapper: {
        width: "100%",    
        marginTop: 10,
    },
});
