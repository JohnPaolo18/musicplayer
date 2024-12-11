import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ERPifyLogo from "../assets/icons/ERPify.png";

const LoginScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={ERPifyLogo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Title - Updated */}
        <Text style={styles.title}>Listen to Your Music</Text>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorLine} />
        </View>

        {/* Music Player Button - Updated */}
        <Pressable
          style={styles.listenButton}
          onPress={() => navigation.navigate("Player")}
        >
          <Text style={styles.listenButtonText}>Play Music</Text>
        </Pressable>

        {/* Footer - Optional: Can be removed or updated */}
        <Text style={styles.footerText}>
          Explore a world of music.{" "}
          <Text style={styles.signUpText}>Get Started</Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 350,
    height: 350,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 40,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#C0C0C0",
  },
  listenButton: {
    // Updated styling for the button
    backgroundColor: "#20BCF5", // Spotify green color for a familiar look
    padding: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  listenButtonText: {
    // Updated text styling
    color: "white",
    fontWeight: "600",
  },
  footerText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#1DB954",
    fontWeight: "600",
  },
});

export default LoginScreen;
