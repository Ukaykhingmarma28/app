import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CryptoJS from "crypto-js";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Signing = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const iv = "V3k6oMP7C8Jt3E4o";
  const secretKey = "rW7aT6RZoP3hjty0";

  const handleLogin = async () => {
    // Convert IV and Secret Key to CryptoJS format (UTF-8 encoded)
    const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
    const secretKeyUtf8 = CryptoJS.enc.Utf8.parse(secretKey);

    // Encrypt the plain text
    const encrypted = CryptoJS.AES.encrypt(password, secretKeyUtf8, {
      iv: ivUtf8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Set the encrypted text (Base64 format)
    const encryptedOutput = encrypted.toString();

    await login(studentId, encryptedOutput);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={80} // Adjust based on header/navigation bar height
    >
      <Animatable.View
        animation="fadeInUp"
        duration={2000}
        className="flex-1 items-center px-3"
      >
        <Image
          source={require("@/assets/images/iub-logo-1.png")}
          className="w-1/2 h-1/2 mt-4"
        />
        <TextInput
          className="w-full h-12 border border-blue-500 rounded-lg pl-2 mb-5"
          placeholder="Student ID"
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="numeric"
          placeholderTextColor="black"
        />
        <TextInput
          className="w-full h-12 border border-gray-300 rounded-lg pl-2 mb-5"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="black"
        />
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full h-12 bg-[#2D2E83] justify-center items-center rounded-full"
        >
          <Text className="text-white text-lg font-bold">Log In</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default Signing;
