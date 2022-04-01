import React, { useState, useEffect } from "react";
import { contractWrapper } from "./contractWrapper";
import { getHousesImg, getRoomsImg } from "./imgGenerator";

const RoomContext = React.createContext();

const RoomProvider = (props) => {
  const contract = contractWrapper();
  let [state, setState] = useState({
    rooms: [],
    loading: true,
  });

  const getData = async () => {
    let rooms = (await contract.getAllHousesAndLandlords()).result;
    rooms = rooms.map((room) => {
      return { ...room, images: [...getHousesImg(1), ...getRoomsImg(2)] };
    });
    setState({
      rooms,
      loading: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  let getRoom = (name) => {
    let tempRooms = [...state.rooms];
    const house = tempRooms.find((house) => house.name === name);
    return house;
  };

  let handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

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
