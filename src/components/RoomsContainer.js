import React from "react";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";
import Title from "./Title";
import RoomsList from "./RoomsList";

function RoomContainer({ context }) {
  const { loading, sortedRooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <section className="filter-container">
        <Title title="Houses" />
        <RoomsList rooms={sortedRooms} />
      </section>
    </>
  );
}

export default withRoomConsumer(RoomContainer);
