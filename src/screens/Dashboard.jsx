import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import HeaderDashboard from '../components/HeaderDashboard';
import Button from '../components/Button';
import { getQuizData } from '../api/userAPI';
import CardListQuiz from '../components/CardListQuiz';

const DashboardAdmin = ({ navigation }) => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuizData();
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
