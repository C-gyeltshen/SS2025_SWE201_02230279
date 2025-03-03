import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useEffect } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { router } from 'expo-router'

SplashScreen.preventAutoHideAsync();

export default function Home() {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync(); // Hide Splash Screen
            // navigation.replace("LandingPage"); // Navigate after 10 seconds
            router.replace('/auth/landing')
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: "https://console.kr-asia.com/wp-content/uploads/2019/07/Vertical_Logo-287x300.png" }} 
                style={styles.logo} 
            />
            {/* <Button 
                title="Go to Next Screen" 
                onPress={() => navigation.navigate("LandingPage")} 
                color="#05ae01"
            /> */}
            <Text style={styles.text}>from</Text>
            <Text style={styles.gojo}>goto</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    },
    logo: {
        width: 200, 
        height: 200, 
        resizeMode: "contain"
    },
    text: {
        color: "black", 
        fontSize: 30
    },
    gojo:{
        color: '#05ae01', 
        fontSize: 30
    }
});
