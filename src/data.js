import room1 from "./images/details-1.jpg";
import room2 from "./images/details-2.jpeg";
import room3 from "./images/details-3.jpeg";
import room4 from "./images/details-4.jpeg";
import room5 from "./images/details-5.jpg";
import img1 from "./images/house-1.jpg";
import img2 from "./images/house-2.jpg";
import img3 from "./images/house-3.jpg";
import img4 from "./images/house-4.jpg";
// import img5 from "./images/house-5.jpg";
// import img6 from "./images/house-6.jpg";
// import img7 from "./images/house-7.jpg";
// import img8 from "./images/house-8.jpg";
// import img9 from "./images/house-9.jpg";
// import img10 from "./images/house-10.jpg";
// import img11 from "./images/house-11.jpg";
// import img12 from "./images/house-12.jpg";

export default [
  {
    fields: {
      landlordId: "1",
      name: "Single family",
      availability: true,
      rent: 145000,
      period: 100,
      address: "UBC",
      description:
        "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
      images: [img1, room2, room3, room4],
    },
  },
  {
    fields: {
      landlordId: "2",
      name: "single basic",
      availability: true,
      rent: 220000,
      period: 110,
      address: 5,
      garden: false,
      airconditioning: false,
      featured: false,
      description:
        "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
      extras: [
        "Fresh exterior paint",
        "Radiant-heated bathroom floors",
        "Glass tiles",
        "Low-flow showerheads",
        "On-demand water heater",
        "Water re-circulator",
        "Folding patio-door",
      ],
      images: [img2, room2, room3, room5],
    },
  },
  {
    fields: {
      landlordId: "3",
      name: "single standard",
      availability: true,
      rent: 135000,
      period: 150,
      address: 4,
      garden: true,
      airconditioning: false,
      featured: false,
      description:
        "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
      extras: [
        "Fresh exterior paint",
        "Radiant-heated bathroom floors",
        "Glass tiles",
        "Low-flow showerheads",
        "On-demand water heater",
        "Water re-circulator",
        "Folding patio-door",
      ],
      images: [img3, room2, room3, room4],
    },
  },
  {
    fields: {
      landlordId: "4",
      name: "single deluxe",
      availability: true,
      rent: 440000,
      period: 150,
      address: 6,
      garden: true,
      airconditioning: true,
      featured: false,
      description:
        "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
      extras: [
        "Fresh exterior paint",
        "Radiant-heated bathroom floors",
        "Glass tiles",
        "Low-flow showerheads",
        "On-demand water heater",
        "Water re-circulator",
        "Folding patio-door",
      ],
      images: [img4, room2, room3, room4],
    },
  },
];
