import house1 from "./images/house-1.jpg";
import house2 from "./images/house-2.jpg";
import house3 from "./images/house-3.jpg";
import house4 from "./images/house-4.jpg";
import house5 from "./images/house-5.jpg";
import house6 from "./images/house-6.jpg";
import house7 from "./images/house-7.jpg";
import house8 from "./images/house-8.jpg";
import house9 from "./images/house-9.jpg";
import house10 from "./images/house-10.jpg";
import house11 from "./images/house-11.jpg";
import house12 from "./images/house-12.jpg";
import room1 from "./images/room-1.jpeg";
import room2 from "./images/room-2.jpeg";
import room3 from "./images/room-3.jpeg";
import room4 from "./images/room-4.jpeg";
import room5 from "./images/room-5.jpeg";
import room6 from "./images/room-6.jpeg";
import room7 from "./images/room-7.jpeg";
import room8 from "./images/room-8.jpeg";
import room9 from "./images/room-9.jpeg";
import room10 from "./images/room-10.jpeg";
import room11 from "./images/room-11.jpeg";
import room12 from "./images/room-12.jpeg";
import detail1 from "./images/details-1.jpg";
import detail2 from "./images/details-2.jpeg";
import detail3 from "./images/details-3.jpeg";
import detail4 from "./images/details-4.jpeg";
import detail5 from "./images/details-5.jpg";

const rooms = [
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
  room7,
  room8,
  room9,
  room10,
  room11,
  room12,
];

const houses = [
  house1,
  house2,
  house3,
  house4,
  house5,
  house6,
  house7,
  house8,
  house9,
  house10,
  house11,
  house12,
];

const details = [detail1, detail2, detail3, detail4, detail5];

export const getRoomsImg = (quantity) => {
  let imgs = [];
  for (let i = 0; i < quantity; ++i) {
    const randomIdx = Math.floor(Math.random() * rooms.length);
    imgs.push(rooms[randomIdx]);
  }
  return imgs;
};

export const getHousesImg = (quantity) => {
  let imgs = [];
  for (let i = 0; i < quantity; ++i) {
    const randomIdx = Math.floor(Math.random() * houses.length);
    imgs.push(houses[randomIdx]);
  }
  return imgs;
};

export const getDetailsImg = (quantity) => {
  let imgs = [];
  for (let i = 0; i < quantity; ++i) {
    const randomIdx = Math.floor(Math.random() * details.length);
    imgs.push(details[randomIdx]);
  }
  return imgs;
};
