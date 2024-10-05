

//В сервисах содержатся функции и данные для работы с функциями и данными проекта
//Это помогает разделить логику в контроллере от логики обработки запросов
//Сервисы можно легко тестировать и модифицировать без необходимости изменять контроллеры или маршруты
 

const moment = require("moment");

let posts = [
    {
        id: 1,
        name: 'post1',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description',
        author: "Author1"
    },
    {
        id: 2,
        name: 'post2',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description2',
        author: "Author2"
    },
    {
        id: 3,
        name: 'post3',
        time: moment().format("YYYY/MM/DD hh:mm:ss"),
        description: 'description3',
        author: "Author3"
    },
];

function getCurrentDate() {
    return moment().format("YYYY/MM/DD hh:mm:ss");
}

function getAllPosts() {
    return posts;
}

function getPostById(id) {
    if (id > 0 && id <= posts.length) {
        return { post: posts[id - 1], error: null }//без этого null у меня выводилась ошибка но не выводились данные нормальных id жаловалось что не может найти этот тип данных
    }
    return { error: "Такого поста не существует" }
}

module.exports = {
    getCurrentDate,
    getAllPosts,
    getPostById
};
