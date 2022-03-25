import React, { useState } from "react";
import { FaComment } from "react-icons/fa";
import { IoIosPricetag, IoIosSearch } from "react-icons/io";
import Title from "./Title";

const Services = () => {
  let [state] = useState({
    services: [
      {
        icon: <IoIosPricetag />,
        title: "Distributed and Secure on Ethereum Blockchain",
        info: "The rental platform and its data are all safely distributed on the blockchain",
      },
      {
        icon: <IoIosSearch />,
        title: "Highly Efficient and Clean UI/UX",
        info: "We follow the idea of minimalism to create the best ever user experience",
      },
      {
        icon: <FaComment />,
        title: "Connect Your Metamask Account Before Use",
        info: "You should connect your metamask account to the platform to use our services",
      },
    ],
  });
  return (
    <section className="services">
      <Title title="features" />
      <div className="services-center">
        {state.services.map((item) => {
          return (
            <article key={`item-${item.title}`} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
