import React from "react";
import { useState } from "react";
import { useRef } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import useApi from "../hooks/useApi";

interface Props {
  navigation: any;
}

const LoginScreen = ({ navigation }: Props) => {
  const emailRef = useRef<TextInput>(null);
  const [email, setEmail] = useState<string | undefined>();
  const passwordRef = useRef<TextInput>(null);
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { userLogin } = useApi();

  const onLoginPress = () => {
    if (!email) {
      Alert.alert("Email is required.");
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }
    if (!password) {
      Alert.alert("Password is required.");
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }
    const postData = {
      email,
      password,
    };
    setLoading(true);
    userLogin(postData)
      .then((res) => {})
      .catch((err) => {
        Alert.alert("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%", alignItems: "center" }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "800",
                marginTop: 150,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              COUNTEROFFER
            </Text>
            <TextInput
              ref={emailRef}
              placeholder="Email"
              placeholderTextColor="#c4c3cb"
              style={{
                height: 43,
                fontSize: 14,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#eaeaea",
                backgroundColor: "#fafafa",
                paddingLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              value={email}
              onChangeText={(value: string) => setEmail(value)}
              editable={!loading}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
            <TextInput
              ref={passwordRef}
              placeholder="Password"
              placeholderTextColor="#c4c3cb"
              style={{
                height: 43,
                fontSize: 14,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#eaeaea",
                backgroundColor: "#fafafa",
                paddingLeft: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
              secureTextEntry={true}
              value={password}
              onChangeText={(value: string) => setPassword(value)}
              editable={!loading}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
            <Button
              buttonStyle={{
                backgroundColor: "#3897f1",
                borderRadius: 5,
                height: 45,
                marginTop: 10,
                width: 350,
                alignItems: "center",
              }}
              onPress={() => onLoginPress()}
              title="Login"
              disabled={loading}
            />
            {/* TODO: actually, it should maybe be GitHub login */}
            {/* <View style={[{ marginTop: 10, alignItems: "center" }]}>
              <Text
                style={{ color: "#c4c3cb", fontSize: 16, fontWeight: "700" }}
              >
                Login with
              </Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={onFbLoginPress} disabled={loading}>
                  <SocialIcon type="facebook" />
                </TouchableOpacity>
                <TouchableOpacity disabled={loading}>
                  <SocialIcon type="google" />
                </TouchableOpacity>
                <TouchableOpacity disabled={loading}>
                  <SocialIcon type="linkedin" />
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={[{ marginTop: 10, alignItems: "center" }]}>
              <Text
                style={{ color: "#c4c3cb", fontSize: 16, fontWeight: "700" }}
              >
                {" "}
                - OR -{" "}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  disabled={loading}
                  style={{ marginVertical: 10 }}
                >
                  <Text>Signup</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={hanldeForgotPassword}
                  disabled={loading}
                  style={{ marginVertical: 10 }}
                >
                  <Text>Forgot Password</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
