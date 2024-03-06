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

  // Fungsi untuk menavigasi ke layar StartQuiz dengan parameter quizId
  const handleStartQuiz = (quizId) => {
    navigation.navigate('StartQuiz', { quizId });
  };

  const handleLogout = () => {
    // Hapus token dari AsyncStorage
    AsyncStorage.removeItem('token');
    // Navigasi ke halaman StartScreen
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  }

  return (
    <Background>
      <HeaderDashboard>List Quiz</HeaderDashboard>
      {quizData.map((quiz) => (
        <React.Fragment key={quiz.ID}>
          <CardListQuiz
            title={quiz.Title}
            description={quiz.Description}
            startedAt={quiz.StartedAt}
            finishedAt={quiz.FinishedAt}
          />
          <Button
            mode="contained"
            onPress={() => handleStartQuiz(quiz.ID)}
            style={{ marginTop: 10 }}
          >
            Start Quiz
          </Button>
        </React.Fragment>
      ))}
      <Button
        mode="outlined"
        onPress={() => handleLogout()
        }
        style={{ marginTop: 20 }}
      >
        Logout
      </Button>
    </Background>
  );
};

export default DashboardAdmin;