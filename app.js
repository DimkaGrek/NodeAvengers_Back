// Імпортуємо express
const express = require('express');
// Створюємо екземпляр додатку
const app = express();

// Встановлюємо базовий маршрут та обробник для нього
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Обробник маршруту /about
app.get('/about', (req, res) => {
    res.send('About page');
});

// Встановлюємо порт, на якому буде слухати сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
