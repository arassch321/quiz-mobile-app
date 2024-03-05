import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import HeaderDashboard from '../components/HeaderDashboard';
import Button from '../components/Button';
import { getQuizData } from '../api/userAPI';
import CardListQuiz from '../components/CardListQuiz';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardAdmin = ({ navigation }) => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Mengambil token dari AsyncStorage
        const token = await AsyncStorage.getItem('token');
        // Memanggil getQuizData dengan token yang diperoleh
        const data = await getQuizData(token);
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  return (
    <Background>
      <HeaderDashboard>List Quiz</HeaderDashboard>
      {quizData.map((quiz) => (
        <CardListQuiz
          key={quiz.ID}
          title={quiz.Title}
          description={quiz.Description}
          startedAt={quiz.StartedAt}
          finishedAt={quiz.FinishedAt}
        />
      ))}
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
};

export default DashboardAdmin;
