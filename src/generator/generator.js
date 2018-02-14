const data = require(`../data/keksobooking`);

const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const generateEntity = () => {
  return {
    author: {
      avatar: `http://`
    },
    offer: {
      title: getRandomFromArr(data.TITLES),
      address: `{}`,
      price: 10,
      type: ``,
      rooms: 5,
      guests: 10,
      checkin: `12:00`,
      chekout: `14:00`,
      features: [`wifi`],
      description: ``,
      photos: ``
    },
    location: {
      x: 300,
      y: 500,
    }
  };
};

module.exports = {generateEntity};

// {
//   "author": {
//   "avatar": строка, адрес изображения, можно использовать https://robohash.org/{{random-string}}
//     },
//
//   "offer": {
//   "title": строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде". Значения не должны повторяться.
//   "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
//   "price": число, случайная цена от 1000 до 1 000 000
//   "type": строка с одним из трёх фиксированных значений: flat, palace, house или bungalo
//   "rooms": число, случайное количество комнат от 1 до 5
//   "guests": число, случайное количество гостей, которое можно разместить
//   "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//     "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//   "features": массив строк случайной длины из неповторяющихся элементов: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//     "description": пустая строка,
//     "photos": массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
// },
//
//   "location": {
//   "x": случайное число, координата x метки на карте от 300 до 900,
//     "y": случайное число, координата y метки на карте от 150 до 500
// }
// }
