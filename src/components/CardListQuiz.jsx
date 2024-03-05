import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../core/theme";

const CardListQuiz = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.date}>
        Started: {formatDate(props.startedAt)} - Finished:{" "}
        {formatDate(props.finishedAt)}
      </Text>
    </View>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginVertical: 12,
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 19,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  date: {
    fontSize: 12,
    color: theme.colors.secondary,
    paddingTop: 8,
    fontStyle: "italic",
  },
});

export default CardListQuiz;