// CardQuestionQuiz.jsx
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { theme } from "../core/theme";

const CardQuestionQuiz = (props) => {
  const { question, options, onSelectOption, selectedOption } = props;

  // Parse options string to object
  const parsedOptions = JSON.parse(options);

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {Object.entries(parsedOptions).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.option,
            selectedOption === key && styles.selectedOption,
          ]}
          onPress={() => onSelectOption(key)}
        >
          <Text style={[styles.optionText, selectedOption === key && styles.selectedOptionText]}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
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
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
  },
  optionText: {
    color: theme.colors.text, // default text color
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
  },
  selectedOptionText: {
    color: theme.colors.surface, // change text color when selected
  },
});

export default CardQuestionQuiz;
