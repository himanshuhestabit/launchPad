import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import RecentlyAddedBlogs from "../components/RecentlyAddedBlogs";
import AllBlogs from "../components/AllBlogs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) || false;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <HeroSection />
      <RecentlyAddedBlogs />
      <AllBlogs />
    </div>
  );
};

export default Home;
