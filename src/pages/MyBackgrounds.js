import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import NavBar from "../components/Navbar";
import { contractWrapper } from "../contractWrapper";
// import { withRoomConsumer } from "../context";

const MyBackgrounds = () => {
  // const { rooms } = context;

  const contract = contractWrapper();
  const [showLoader, setShowLoader] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [backgrounds,setBackgrounds] = useState({});

  useEffect(() => {
    const getTenantBG = async () => {

      // setBackgrounds({
      //   ...backgrounds
      // });
      // const userID = (await contract.getUser()).result.userID;
      // for (const room of rooms) {
      //   if (room.userID === userID) {
      //     setHouse({ ...room });
      //     break;
      //   }
      // }
      // setBackgrounds()
    };
    getTenantBG();
  }, [contract]);

  let handleSubmit = async (formContent) => {
    let { age, income,isMale, description} = formContent;
    setShowLoader(true);
    const result = await contract.editBackground(
      age,
      income,
      isMale,
      description
    );
    setShowLoader(false);
    setShowEdit(false);
    if (!result.error) {
      alert("Successfully edited your background!");
      window.location.reload();
    }
  };

  let formProps = {
    title: "Please add/edit your Personal Background",
    details: "Include anything about yourself here.",
    textInputArray: [
      ["age", ""],
      ["income", "$"],
      ["gender", ""],
    ],
    submitFunction: handleSubmit,
  };

  return (
    <>
      {showEdit ? (
        <>
          <NavBar />
          {showLoader ? (
            <section className="single-house-info loader">
              <button className="btn-primary ee">
                <i className="fa fa-refresh fa-spin"></i>Loading
              </button>
            </section>
          ) : (
            <>
              <Form {...formProps} />
              <div className="single-house-info">
                <button
                  className="desc submit"
                  onClick={() => {
                    setShowEdit(false);
                  }}
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <NavBar />
          <section className="single-house">
            {/* <div className="single-house-images">
              {house.images.map((item, index) => (
                <img key={index} src={item} alt="" />
              ))}
            </div> */}
            <div className="single-house-info">
              <article className="desc">
                <h3>details</h3>
                <p>{backgrounds.description}</p>
              </article>
              <article className="info">
                <h3>info</h3>
                <h6>age : {backgrounds.age}</h6>
                <h6>income : {backgrounds.income}</h6>
                <h6>isMale : {backgrounds.isMale}</h6>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Edit Your Background
                </button>
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MyBackgrounds;

// Original code################################################
// import React, {useState, useEffect} from "react";
// import NavBar from "../components/Navbar";
// import Form from "../components/Form";
// import {contractWrapper} from "../contractWrapper"

// const MyBackgrounds = () => {
//   {
//     const contract = contractWrapper();
//     const [showLoader, setShowLoader] = useState(false);
//     const [showEdit, setShowEdit] = useState(false);



//     // let background = {
//     //   age: "25",
//     //   income: "100000",
//     //   isMale: "female",
//     //   description: "Hello world",
//     // };

//     background = undefined;

//     if (!background) {
//       let submitFunction = (formContent) => {
//         console.log("See content");
//         console.log(formContent);
//         alert(JSON.stringify(formContent));
//       };
//       let formProps = {
//         title: "Please add/edit your background info...",
//         details: "Include anything about yourself here.",
//         textInputArray: [
//           ["Age", ""],
//           ["Income", "$CAD"],
//           ["Sex", "Female or Male"],
//         ],
//         submitFunction: submitFunction,
//       };
//       return (
//         <>
//           <NavBar />
//           <Form {...formProps} />;
//         </>
//       );
//     }

//     const { age, income, isMale, description } = background;
//     //const [...defaultImages] = images;

//     return (
//       <>
//         (
//         <NavBar />
//         <section className="single-house">
//           <div className="single-house-info">
//             <article className="desc">
//               <h3>describe yourself</h3>
//               <p>{description}</p>
//             </article>
//             <article className="info">
//               <h3>personal Info</h3>
//               <h6>age: {age}</h6>
//               <h6>income : {income}</h6>
//               <h6>isMale : {isMale}</h6>
//             </article>
//           </div>
//         </section>
//         )
//       </>
//     );
//   }
// }

// export default MyBackgrounds;
