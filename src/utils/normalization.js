const normalizeOffer = (data) => {
  return {
    author: {
      name: data.name,
      avatar: data.avatar,
    },
    offer: {
      title: data.title,
      address: data.address,
      description: data.description,
      price: parseInt(data.price, 10),
      type: data.type,
      rooms: parseInt(data.rooms, 10),
      guests: parseInt(data.guests, 10),
      checkin: data.checkin,
      checkout: data.checkout,
      features: data.features,
    },
    location: {
      x: data.address ? parseInt(data.address.split(`,`)[0].trim(), 10) : null,
      y: data.address ? parseInt(data.address.split(`,`)[1].trim(), 10) : null,
    },
    date: data.date ? String(data.date) : String(Date.now())
  };
};

module.exports = {normalizeOffer};
