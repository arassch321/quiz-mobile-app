import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Background from "../components/Background";
import CardQuestionQuiz from "../components/CardQuestionQuiz";
import { getQuestionData } from "../api/userAPI";

const StartQuiz = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const { quizId } = route.params;

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const data = await getQuestionData(quizId);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching question data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    // Check if quizId exists before fetching data
    if (quizId) {
      fetchQuestionData();
    } else {
      console.error("Quiz ID is missing.");
      // Handle missing quiz ID, such as displaying an error message to the user
    }
  }, [quizId]); // Ensure useEffect runs when quizId changes

  const handleOptionSelect = (option) => {
    // Handle option selection
    console.log("Selected option:", option);
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Questions</Text>
        {questions.map((question, index) => (
          <CardQuestionQuiz
            key={index}
            question={question.Question}
            options={question.Options}
            onSelectOption={handleOptionSelect}
          />
        ))}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default StartQuiz;
