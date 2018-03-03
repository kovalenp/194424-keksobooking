const _ = require(`lodash`);

const data = require(`../data/keksobooking`);

const generateEntity = () => {
  const location = {x: _.random(300, 900), y: _.random(150, 500)};
  const date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).getTime(); // Random date in epoch
  return {
    author: {
      avatar: `http://robohash.org/${_.random(999999)}`
    },
    offer: {
      title: _.sample(data.TITLES),
      address: `${location.x}, ${location.y}`,
      price: _.random(1000, 1000000),
      type: _.sample(data.TYPES),
      rooms: _.random(1, 5),
      guests: _.random(1, 20),
      checkin: _.sample(data.TIMES),
      checkout: _.sample(data.TIMES),
      features: _.sampleSize(data.FEATURES, _.random(1, data.FEATURES.length)),
      description: ``,
      photos: _.shuffle(data.PHOTOS)
    },
    location,
    date,
  };
};

module.exports = {generateEntity};
