const BASE_URL = 'http://api-quiz-arras.my.id:8080/api/quiz/';

export const getQuizData = async (token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJ1c2VyX2lkIjoyfQ.ETsCbS_dYr4hJjv8ypqMT-y_Vkm3tfvzuIJxNiO4Drs`,
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