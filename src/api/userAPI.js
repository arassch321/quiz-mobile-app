import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://api-quiz-arras.my.id:8080';

export const getQuizData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/quiz`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.payload;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};

export const postLogin = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // console.log('Login response:', data);
    
    // Simpan token ke session menggunakan AsyncStorage
    await AsyncStorage.setItem('token', data.payload);

    return data.payload;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getQuestionData = async (quizId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/question/questions/${quizId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.questions;
    }
    catch (error) {
        console.error('Error fetching question data:', error);
        throw error;
    }
};