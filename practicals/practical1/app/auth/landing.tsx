import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { Link } from "expo-router";

const slides = [
    {
        image: "https://lxbwebkumugyhysshekq.supabase.co/storage/v1/object/sign/my-image/Screenshot_2025-05-15_at_10.57.57_AM-removebg-preview%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MjU2NmJiLWE0ODgtNGQ0My04N2QzLTg4ZWI0N2RjZjU1YyJ9.eyJ1cmwiOiJteS1pbWFnZS9TY3JlZW5zaG90XzIwMjUtMDUtMTVfYXRfMTAuNTcuNTdfQU0tcmVtb3ZlYmctcHJldmlldyAoMSkucG5nIiwiaWF0IjoxNzQ3MjkxNTk3LCJleHAiOjE3Nzg4Mjc1OTd9.9uCLyidFmSb3bSXpFvoTrHlV6AnnYGA2uD_kSwegO2w",
        header: "Welcome to Gojek",
        text: "Your go-to app for a hassle-free life. We're here to help with all your needs anytime, anywhere.",
    },
    {
        image: "https://lxbwebkumugyhysshekq.supabase.co/storage/v1/object/sign/my-image/Screenshot_2025-05-15_at_12.47.47_PM-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MjU2NmJiLWE0ODgtNGQ0My04N2QzLTg4ZWI0N2RjZjU1YyJ9.eyJ1cmwiOiJteS1pbWFnZS9TY3JlZW5zaG90XzIwMjUtMDUtMTVfYXRfMTIuNDcuNDdfUE0tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NDcyOTE3MDgsImV4cCI6MTc3ODgyNzcwOH0.QwZ0-doTqN_s9cdqOvHr1FJJlYMKfeS0PDsxUyUjkAc",
        header: "Transport & Logistics",
        text: "Daily commute and goods delivery made easy.",
    },
    {
        image: "https://lxbwebkumugyhysshekq.supabase.co/storage/v1/object/sign/my-image/Screenshot_2025-05-15_at_12.47.47_PM-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzg3MjU2NmJiLWE0ODgtNGQ0My04N2QzLTg4ZWI0N2RjZjU1YyJ9.eyJ1cmwiOiJteS1pbWFnZS9TY3JlZW5zaG90XzIwMjUtMDUtMTVfYXRfMTIuNDcuNDdfUE0tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NDcyOTE4MDMsImV4cCI6MTc3ODgyNzgwM30.6r6M6aKcQBsA_cszqjhGPyRhgyCC-1zczgktznFO-Ww",
        header: "Get food & groceries",
        text: "Either needs or cravings, we got you covered.",
    }
];

const { width, height } = Dimensions.get("window");

export default function Login() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({ index, animated: true });
    };

    return (
        <View style={styles.container}>
            <Carousel
                ref={ref}
                width={width}
                height={height * 0.6} 
                data={slides}
                onProgressChange={(progressValue) => {
                    progress.value = progressValue;
                }}
                renderItem={({ index }) => (
                    <View style={styles.slide}>
                        <Image source={{ uri: slides[index].image }} style={styles.image} />
                        <Text style={styles.header}>{slides[index].header}</Text>
                        <Text style={styles.text}>{slides[index].text}</Text>
                    </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={slides}
                dotStyle={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    width: width * 0.02,
                    height: width * 0.02,
                    borderRadius: width * 0.01,
                }}
                containerStyle={{ gap: width * 0.01, marginTop: 10 }}
                onPress={onPressPagination}
            />

            <TouchableOpacity style={styles.button}>
                <Link href={"/auth/login"} style={styles.buttonText}>
                    Log in
                </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton}>
                <Link href={"/auth/login"} style={styles.Text}>
                    I'm new, sign me up
                </Link>
            </TouchableOpacity>
            <Text style={styles.termsText}>
                By logging in or registering, you agree to our{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "green",\\\\
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    slide: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20, 
    },
    image: {
        width: "90%",
        height: "70%", 
        resizeMode: "cover",
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: "center",
        width: "85%",
        color: "#333",
        marginTop: 5,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        width: "85%",
        color: "#333",
        marginTop: 10, 
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
    },
    signupButton: {
        borderWidth: 2,            
        borderColor: "green",     
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    Text: {
        color: "green",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    termsText: {
        fontSize: 14,
        color: "gray",
        marginTop: 15,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    linkText: {
        color: "green",
        fontWeight: "bold",
    }
});
