import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  username: string;
  onLogout: () => void;
};

const Navbar: React.FC<Props> = ({ username, onLogout }) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.userInfo}>
        <MaterialIcons name="account-circle" size={28} color="#fff" />
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  logout: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navbar;
