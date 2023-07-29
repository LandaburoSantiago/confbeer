import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { UserInfo } from "../../UserInfoContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useContext(UserInfo);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const loginWithEmailAndPassword = useCallback(async () => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setUser(userData);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error(
        "Ocurrió un error al intentar ingresar. Por favor contáctese con un administrador"
      );
      Alert.alert(
        "Algo salió mal",
        "Ocurrió un error al intentar ingresar. Por favor contáctese con un administrador",
        [{ text: "OK" }]
      );
    }
  }, [auth, email, password]);

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const userData = await signInWithPopup(auth, provider);
      setUser(userData);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error(
        "Ocurrió un error al intentar ingresar. Por favor contáctese con un administrador"
      );
      Alert.alert(
        "Algo salió mal",
        "Ocurrió un error al intentar ingresar. Por favor contáctese con un administrador",
        [{ text: "OK" }]
      );
    }
  };

  const navigation = useNavigation();
  useEffect(() => {
    if (user)
      navigation.navigate(
        "Tabs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "
      );
  }, [user]);

  return (
    <View>
      <Text style={styles.title}> Bienvenido a ConfBeer! </Text>
      <View>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Email o número de teléfono"
        ></TextInput>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        ></TextInput>
        <Text style={styles.question}>¿Olvidó su contraseña?</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          loginWithEmailAndPassword();
        }}
      >
        <Animated.View style={styles.btnLogin}>
          <Text style={styles.textBtn}> Ingresar</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <View>
        <Text style={styles.google}>O continúe con Google</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            loginWithGoogle();
          }}
        >
          <Animated.View style={styles.btnGoogle}>
            <Text style={styles.textBtn}> Google</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Crear Cuenta")}
        >
          <Animated.View>
            <Text style={styles.question}>
              ¿No tenés cuenta? Registrate aqui
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#4C0070",
    fontWeight: "700",
    fontSize: "22px",
    marginTop: 30,
  },
  conteiner: {
    textAlign: "center",
    marginTop: "5px",
    fontWeight: "500",
    fontSize: "15px",
    color: "#9FA5C0",
  },
  question: {
    fontWeight: "500",
    fontSize: "15px",
    textAlign: "center",
    color: "#79018C",
    marginTop: 16,
  },
  btnLogin: {
    alignItems: "center",
    width: 270,
    height: 40,
    backgroundColor: "#FF7600",
    borderRadius: "32px",
    justifyContent: "center",
    margin: "auto",
    marginVertical: 10,
    marginTop: 30,
  },
  textBtn: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  btnGoogle: {
    alignItems: "center",
    width: 270,
    height: 40,
    backgroundColor: "#FF5842",
    borderRadius: "32px",
    justifyContent: "center",
    margin: "auto",
    marginVertical: 10,
  },
  google: {
    color: "#9FA5C0",
    textAlign: "center",
    marginTop: 20,
  },

  input: {
    marginTop: 30,
    height: 40,
    width: 270,
    margin: "auto",
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#fff",
    borderRadius: 20,
    color: "#9FA5C0",
    fontWeight: 500,
    padding: 20,
  },
});
export default Login;
