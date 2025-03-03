import { Dimensions, View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

const data = [
    { label: '🇧🇭 +64', value: '1' },
    { label: '🇦🇫 +78', value: '2' },
    { label: '🇧🇹 +953', value: '3' },
    { label: '🇧🇴 +63', value: '4' },
    { label: '🇹🇩 +83', value: '5' },
    { label: '🇬🇶 +73', value: '6' },
    { label: '🇳🇺 +89', value: '7' },
    { label: '🇺🇾 +43', value: '8' },
];

export default function Login() {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [number, onChangeNumber] = useState('');
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Responsive width
    const containerWidth = width > 1024 ? "50%" : "95%"; // 50% for desktop, 80% for tablets & mobile

    return (
        <View style={styles.placeholder}>
            <Text style={styles.header1}>Welcome to Gojek!</Text>
            <Text style={styles.subText}>Enter or create an account in a few easy steps.</Text>

            <View style={[styles.container, { width: containerWidth }]}>
                <Text style={styles.phoneLabel}>Phone Number</Text>

                <View style={styles.inputRow}>
                    <View style={styles.dropdownContainer}>
                        {/* <Text style={styles.label}>Country Code</Text> */}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="checkcircleo"
                                    size={20}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="Enter your number"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.container, { width: containerWidth }]}>
            <TouchableOpacity 
                style={styles.signupButton} 
                onPress={() => router.push('/auth/verificationType')}
            >
                <Text style={styles.Text}>Continue</Text>
            </TouchableOpacity>
                <Text style={styles.termsText}>
                    I agree to Gojek's{' '}
                    <Text style={styles.linkText}>Terms of Service</Text> &{' '}
                    <Text style={styles.linkText}>Privacy Policy</Text>.
                </Text>
                <TouchableOpacity style={styles.CButton} onPress={() => router.push('/auth/login')}>
                    <Text style={styles.LText}>Issue with number ?</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: "center"
    },
    subText: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
        textAlign: "center"
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    phoneLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
    },
    dropdownContainer: {
        flex: 0.4, 
        position: "relative",
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    inputContainer: {
        flex: 0.6,
        position: "relative",
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        fontSize: 12,
        color: "gray",
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    signupButton: {
        backgroundColor: "#bdbdbd",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        elevation: 3, 
    },
    CButton: {
        backgroundColor: "white",
        borderColor: "black",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        elevation: 5, // Drop shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    
    Text: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
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
    },
    LText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
    },
});

