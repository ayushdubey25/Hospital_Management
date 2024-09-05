import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const HomePage = () => {
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "") {
      console.error("No token found in local storage");
      return;
    }
    try {
      console.log("Token:", token);
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;
