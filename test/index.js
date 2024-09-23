
// Предполагается, что у вас установлен axios для выполнения HTTP-запросов
const axios = require('axios');

async function createUser(username, password, email) {
  try {
    const response = await axios.post('http://netbitadmincontrol.ru:5050/api/register', {
      username: username,
      password: password,
      email: email
    });
    
    console.log('User created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response.data);
    throw error;
  }
}

// Пример использования
createUser('Kazilsky', 'Outpork', 'Test@example.com')
  .then(user => {
    console.log('New user ID:', user.id);
  })
  .catch(error => {
    console.error('Failed to create user');
  });
