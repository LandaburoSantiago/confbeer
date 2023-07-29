import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";
import { useNavigation } from "@react-navigation/native";

const REGEXP_PASSWORD = new RegExp(/\d/);
const REGEXP_EMAIL = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);

const RegisterUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = useCallback(async () => {
    try {
      console.log();
      if (!REGEXP_PASSWORD.test(password) || !password.length > 6) {
        console.error(
          "La contraseña que elegiste no cumple con los requerimientos"
        );
        Alert.alert(
          "Debes cambiar la contraseña",
          "La contraseña que elegiste no cumple con los requerimientos",
          [{ text: "OK" }]
        );
        return;
      }
      if (!REGEXP_EMAIL.test(email)) {
        console.error("El formato del email no es correcto");
        Alert.alert("Email incorrecto", "El formato del email no es correcto", [
          { text: "OK" },
        ]);
        return;
      }
      setLoadingRegisterUser(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(
        "Usuario creado exitosamente",
        "Haga click en ok para ir al login",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      Alert.alert(
        "Ocurrió un error al registrar el usuario.",
        "Por favor intente mas tarde o contáctese con un administrador",
        [{ text: "OK" }]
      );
    } finally {
      setLoadingRegisterUser(false);
    }
  }, [auth, email, password]);

  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.title}> Bienvenido a ConfBeer! </Text>
      <Text style={styles.subtitle}>
        {" "}
        Por favor, ingrese los siguientes datos para registrarse{" "}
      </Text>
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
      </View>
      <View style={styles.containerPasswordRequirements}>
        <Text style={styles.titleRequirements}>
          {" "}
          Tu contraseña debe contener:
        </Text>
        <Text style={styles.requirement}> - Al menos 6 caracteres</Text>
        <Text style={styles.requirement}> - Contiene números </Text>
      </View>
      {loadingRegisterUser ? (
        <>
          <ActivityIndicator
            size="small"
            color="#FF7600"
            style={styles.loading}
          />
        </>
      ) : (
        <>
          <TouchableWithoutFeedback onPress={() => handleCreateAccount()}>
            <Animated.View style={styles.btnCreate}>
              <Text style={styles.btnCreateText}>Crear Cuenta</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login")}
          >
            <Animated.View>
              <Text style={styles.question}>
                ¿Ya tenés cuenta? Pulsa aqui para ir al login
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 16,
  },
  title: {
    textAlign: "center",
    color: "#4C0070",
    fontWeight: "700",
    fontSize: "22px",
    marginTop: 30,
  },
  subtitle: {
    textAlign: "center",
    marginTop: "5px",
    fontWeight: "500",
    fontSize: "15px",
    color: "#9FA5C0",
  },
  btnCreate: {
    alignItems: "center",
    width: 270,
    height: 40,
    backgroundColor: "#FF7600",
    borderRadius: "32px",
    justifyContent: "center",
    margin: "auto",
    marginVertical: 10,
    marginTop: 40,
  },
  btnCreateText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 400,
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
  containerPasswordRequirements: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleRequirements: {
    fontSize: 15,
    fontWeight: 500,
    marginTop: 30,

    color: "#4C0070",
  },
  requirement: {
    fontSize: 14,
    color: "#9C2C77",
    fontWeight: 500,

    marginTop: 10,
  },
  question: {
    textAlign: "center",
    color: "#79018C",
    marginTop: 30,
    fontWeight: "500",
    fontSize: "15px",
  },
});
export default RegisterUser;
