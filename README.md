﻿# BlackAndWhiteOnReact-Next.js-
 
## -О проекте-
 Это тестовая демо версия игры [ЧЁРНОЕ/БЕЛОЕ](https://www.youtube.com/watch?v=cBpenCBMMjA&t=1621s), для тренировки навыков React.js и Node.js
 
 ## -Стэк-
 Frontend: react, next, socket.io (client), scss
 Backend: node.js, express, socket.io (server)
 +Различные небольшие библиотеки
 
## -Как запустить проект-
 1) Введите в консоль IDE
## git clone https://github.com/Sgadmer/BlackAndWhiteOnReact-Next.js-.git
2) Откройте в вашем IDE папку black-white-on-react
3) Введите в консоль
## npm install
4) Дождитесь конца установки
5) Введите в консоль 
## npm run all
6) После компиляции перейдите по адресу, который будет предложен в консоли (в основном http://localhost:3000)

## -Что есть в проекте-
1) Страница ввода имени
2) Страница выбора ведущего
3) Страница выбора кол-ва игроков
4) Возможность дать ссылку для подключения игроков
5) Страница загрузки
6) Страница-оповещение о переполнении комнаты и переходом на главную страницу через 10 сек.
7) Проверка на индивидуальность имени
8) Начало первого раунда:
## Анимация раздачи карт
## Оповещение о игроке, который ходит
## Оповещение игроков в комнате, когда ходящий игрок наводится на карту (в будущем - анимация на этой карту у других игроков)
9) Комментарии в файле сервера 

 ## -FUTURES-
1) 1,2,3 раунд
2) Анимация карты у игроков в комнате, когда ходящий наводит на эту карту мышь
3) Адаптация под разный устройства
4) Кроссбраузерность
5) Разбиение файла сервера на модули
6) Решение ситуаций с выходом игрока, переподключением и дисконектом на разных этапах игры
