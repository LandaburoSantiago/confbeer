import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "@react-navigation/native";
import { ScrollView } from "react-native-web";
import { UserInfo } from "../../UserInfoContext";
import { useConferences } from "../hooks/useConferences";

const Conferences = () => {
  const { getAllConferences } = useConferences();
  const [conferences, setConferences] = useState();
  const [loadingConferences, setLoadingConferences] = useState(true);
  const navigation = useNavigation();
  const { setUser } = useContext(UserInfo);

  const getConferences = async () => {
    try {
      const response = await getAllConferences();
      const data = response.map((doc) => doc.data());
      setConferences(data);
    } catch (error) {
    } finally {
      setLoadingConferences(false);
    }
  };

  useEffect(() => {
    getConferences();
  }, []);
  const RenderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.person}>{item.personName}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        style={{
          width: "100%",
          height: "150px",
          borderRadius: 5,
        }}
        source={item.image}
      ></Image>
      <Text style={styles.duration}>Duración: {item.duration}</Text>
      <Text style={styles.duration}>
        Comienza el día: {item.start_date.toDate().toLocaleString()}
      </Text>
      <Link
        to={{ screen: "Detalles", params: { item: item } }}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.info}>Más info...</Text>
      </Link>
    </View>
  );

  return (
    <ScrollView>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.conf}>Conferencias</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setUser(undefined);
              navigation.navigate("Login");
            }}
          >
            <Animated.View>
              <Text style={styles.btnLogOut}>Salir</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        {loadingConferences ? (
          <>
            <ActivityIndicator
              size="small"
              color="#FF7600"
              style={styles.loading}
            />
          </>
        ) : (
          <>
            {conferences &&
              conferences.map((conferencia, index) => {
                return (
                  <>
                    <RenderItem item={conferencia} key={index} />
                  </>
                );
              })}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnLogOut: {
    backgroundColor: "#FF7600",
    color: "white",
    padding: 10,
    borderRadius: "20px",
    marginRight: "16px",
  },
  conf: {
    color: "#4C0070",
    fontSize: 19,
    fontWeight: 700,
    padding: 20,
  },
  person: {
    color: "#000000",
    fontSize: 13,
    marginTop: 5,
    fontWeight: 700,
  },
  title: {
    color: "#79018C",
    fontSize: 18,
    fontWeight: 700,
  },
  duration: {
    color: "#3C4048",
    fontSize: 12,
    fontWeight: 600,
  },
  info: {
    color: "white",
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: "#FF7600",
    borderRadius: "20px",
    padding: 10,
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10,
  },
  loading: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Conferences;
