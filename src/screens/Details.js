import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Details = (item) => {
  const conference = item.route.params.item;
  const { title, personName, image, start_date, description } = conference;

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: "100%",
          height: "150px",
          borderRadius: 5,
        }}
        source={image}
      />
      <Text style={styles.person}>{personName}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>{description} </Text>
      <Text style={styles.detail}>
        Comienza el día: {start_date.toDate().toLocaleString()}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginTop: "5px",
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    color: "#79018C",
    fontSize: 17,
    fontWeight: 700,
    marginTop: 10,
  },
  detail: {
    color: "#3C4048",
    fontSize: 14,
    marginTop: 10,
    textAlign: "left",
    fontWeight: 500,
  },
  titulo: {
    color: "#CD104D",
    fontSize: 16,
    fontWeight: 700,
    marginTop: 20,
  },
  caract: {
    color: "#000000",
    fontSize: 14,
    marginTop: 10,
    fontWeight: 500,
  },
  person: {
    color: "#000000",
    fontSize: 13,
    marginTop: 5,
    fontWeight: 700,
  },
});
export default Details;
