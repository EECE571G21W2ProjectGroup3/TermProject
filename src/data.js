import room2 from "./images/details-2.jpeg";
import room3 from "./images/details-3.jpeg";
import room4 from "./images/details-4.jpeg";
import img3 from "./images/house-3.jpg";
import img4 from "./images/house-4.jpg";

export default [
  {
    userName: "terry",
    password: "terry",
    phone: "(+1) 2369991999",
    email: "terry@gmail.com",
    userType: "tenant",

    age: 24,
    income: 120000,
    isMale: true,
    description:
      "I am a master student at UBC majoring in ECE, and am looking for a great house that is close to UBC!",
  },
  {
    userName: "leslie",
    password: "leslie",
    phone: "(+1) 2360000000",
    email: "leslie@gmail.com",
    userType: "landlord",

    userID: "2",
    name: "single standard",
    isHouseAvailable: true,
    rental: 600,
    period: "Immediately available for upto 6 months",
    address: "Marine gateway 46, Vancouver, BC",
    description:
      "This house is located in the center of Vancouver, with gorgeous seaview and with amazing infrastrutures around, such as T&T and Superstore. Plus it's close to UBC :)",
    images: [img3, room2, room3, room4],
  },
  {
    userName: "langara",
    password: "langara",
    phone: "(+1) 2361239876",
    email: "langara@gmail.com",
    userType: "landlord",

    userID: "3",
    name: "single deluxe",
    isHouseAvailable: true,
    rental: 888,
    period: "June, 2022",
    address: "Langara College, Vancouver, BC",
    description:
      "Just right in Langara college with many bus lines around that could bring to anywhere in Vancouver at no cost almost! Super cheap price with super convenient commutation if you are a Langara student!",
    images: [img4, room2, room3, room4],
  },
];

  // {
  //   userName: "tiger",
  //   password: "tiger",
  //   phone: "(+1) 2360002000",
  //   email: "tiger@gmail.com",
  //   userType: "tenant",

  //   age: 20,
  //   income: 88888,
  //   isMale: true,
  //   description:
  //     "I am a mature tiger and am ready to swallow your house \./",
  // },