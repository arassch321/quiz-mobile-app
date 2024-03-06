import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Background from "../components/Background";
import CardQuestionQuiz from "../components/CardQuestionQuiz";
import { getQuestionData, postSubmitAnswer } from "../api/userAPI";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";

const StartQuiz = ({ route, navigation }) => {
  const [questions, setQuestions] = useState([]);
  const { quizId } = route.params;

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const data = await getQuestionData(quizId);
        // Initialize selectedOption to null for each question
        const questionsWithSelection = data.map(question => ({
          ...question,
          selectedOption: null
        }));
        setQuestions(questionsWithSelection);
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

  const handleOptionSelect = (option, questionIndex) => {
    // Handle option selection
    console.log("Selected option:", option);
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = option;
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async () => {
    // Filter out questions without selected options
    const answeredQuestions = questions.filter(question => question.selectedOption !== null);

    // Check if all questions are answered
    if (answeredQuestions.length !== questions.length) {
      Alert.alert("Incomplete Quiz", "Please answer all questions before submitting.");
      return;
    }

    try {
      // Prepare data for submission
      const answers = answeredQuestions.map(question => ({
        questionID: question.ID,
        answer: question.selectedOption
      }));
      
      answers.sort((a, b) => a.questionID - b.questionID);

      // Send answers to the server
      await postSubmitAnswer(quizId, answers);
      Alert.alert("Quiz Submitted", "Your quiz has been submitted successfully.");
      // You can navigate to another screen or perform any other action upon successful submission
    } catch (error) {
      console.error("Error submitting quiz:", error);
      Alert.alert("Info", "Your already submitted this quiz.");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text style={styles.title}>Quiz Questions</Text>
      <ScrollView contentContainerStyle={styles.container}>
        {questions.map((question, index) => (
          <CardQuestionQuiz
            key={index}
            question={question.Question}
            options={question.Options}
            onSelectOption={(option) => handleOptionSelect(option, index)}
            selectedOption={question.selectedOption}
          />
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitQuiz}>
          <Text style={styles.submitButtonText}>Submit Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 310,// Adjust paddingBottom to ensure the last question is fully visible
  },
  title: {
    fontSize: 25,
    color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 13,
    marginTop: 25,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
  },
  submitButtonText: {
    fontSize: 18,
    color: theme.colors.surface,
    fontWeight: "bold",
  },
});

export default StartQuiz;
