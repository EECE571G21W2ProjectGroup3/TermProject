import React, { useState, useEffect } from "react";
import items from "./data";

const RoomContext = React.createContext();

const RoomProvider = (props) => {
  let [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    loading: true,
    rent: 0,
  });

  // getData = async () => {
  //   try {
  //     let response = await Client.getEntries({
  //       content_type: "beachResortRoom"
  //     });
  //     let rooms = formatData(response.items);
  //     //
  //     let maxPrice = Math.max(...rooms.map(item => item.rent));
  //     let maxSize = Math.max(...rooms.map(item => item.size));
  //     setState({
  //       rooms,
  //       sortedRooms: rooms,
  //       loading: false,
  //       //
  //       rent: maxPrice,
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
    setState({
      rooms,
      sortedRooms: rooms,
      loading: false,
    });
  }, []);

  let formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.fields.landlordId;
      let images = item.fields.images;

      let house = { ...item.fields, images, id };
      return house;
    });
    return tempItems;
  };

  let getRoom = (name) => {
    let tempRooms = [...state.rooms];
    const house = tempRooms.find((house) => house.name === name);
    return house;
  };

  let handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    setState({
      [name]: value,
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
