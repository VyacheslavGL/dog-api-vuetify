'use strict';
//стандартный модуль ноды для работы с путями файлов
const path = require('path');
//импорт express (установили через npm)
const express = require('express');

//создание веб-сервера
const app = express();
//порт получаем из переменных окружения (могут быть заданы ключами при запуске ноды)
const port = process.env.PORT || 8080;

//включаем сервер статических файлов из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

//на все запросы методом get отвечаем содержимым файлом index.html
//чтобы при обращении к несуществующим вайлам на сервере грузился именно index.html
// а дальше vue router сам разберется
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));


//запускаем сервер
app.listen(port, (err)=> {
    if(err) return console.error(err);
    return console.log(`Сервер успешно запущен на порту ${port}`);
});