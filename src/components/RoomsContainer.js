import React from "react";
import { withRoomConsumer } from "../context";
import Loading from "./Loading";
import Title from "./Title";
import RoomsList from "./RoomsList";

function RoomContainer({ context }) {
  const { loading, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <section className="filter-container">
        <Title title="Houses" />
        <RoomsList rooms={rooms} />
      </section>
    </>
  );
}

export default withRoomConsumer(RoomContainer);
