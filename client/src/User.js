import React, { useState } from "react";
import axios from "axios";

const User = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    birthdate: "",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newUser.photo || !newUser.birthdate || !newUser.name) {
      console.log("data field missing");

      return;
    }

    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("birthdate", newUser.birthdate);
    formData.append("name", newUser.name);

    axios
      .post("http://localhost:5000/users/add/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("Your data has been submitted!");
    setNewUser({
      name: "",
      birthdate: "",
      photo: "",
    });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  return (
    <div className="flex content-center justify-center my-40">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <div className="my-2 font-bold">
            <label htmlFor="name">Enter your Name: </label>
          </div>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="name"
            name="name"
            id="name"
            value={newUser.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <div className="my-2 font-bold">
            <label htmlFor="birthdate">Enter Date of Birth: </label>
          </div>
          <input
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="birthdate"
            id="birthdate"
            value={newUser.birthdate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <div className="my-2 font-bold">
            <label htmlFor="Attach_Image">Attach Image: </label>
          </div>
          <input
            className="shadow appearance-none border bg-blue-200 border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            accept=".png, .jpg, .jpeg"
            id="Attach_Image"
            name="photo"
            onChange={handlePhoto}
          />
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default User;
