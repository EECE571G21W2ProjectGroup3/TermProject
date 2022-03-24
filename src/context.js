import React, { useState, useEffect } from "react";
import items from "./data";
//import Client from "./Contentful";

const RoomContext = React.createContext();

const RoomProvider = (props) => {
  let [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    airconditioning: false,
    garden: false,
  });

  // getData = async () => {
  //   try {
  //     let response = await Client.getEntries({
  //       content_type: "beachResortRoom"
  //     });
  //     let rooms = formatData(response.items);
  //     //
  //     let maxPrice = Math.max(...rooms.map(item => item.price));
  //     let maxSize = Math.max(...rooms.map(item => item.size));
  //     setState({
  //       rooms,
  //       sortedRooms: rooms,
  //       loading: false,
  //       //
  //       price: maxPrice,
  //       maxPrice,
  //       maxSize
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getData();
    let rooms = formatData(items);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    setState({
      rooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }, []);

  let formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let house = { ...item.fields, images, id };
      return house;
    });
    return tempItems;
  };

  let getRoom = (slug) => {
    let tempRooms = [...state.rooms];
    const house = tempRooms.find((house) => house.slug === slug);
    return house;
  };

  let handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    setState(
      {
        [name]: value,
      },
      filterRooms
    );
  };

  let filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      airconditioning,
      garden,
    } = state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((house) => house.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((house) => house.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((house) => house.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      (house) => house.size >= minSize && house.size <= maxSize
    );
    //filter by airconditioning
    if (airconditioning) {
      tempRooms = tempRooms.filter((house) => house.airconditioning === true);
    }
    //filter by garden
    if (garden) {
      tempRooms = tempRooms.filter((house) => house.garden === true);
    }
    setState({
      sortedRooms: tempRooms,
    });
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        getRoom: getRoom,
        handleChange: handleChange,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};
const RoomConsumer = RoomContext.Consumer;

export default RoomProvider;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
