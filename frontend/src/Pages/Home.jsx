import React from "react";
import HeroSection from "../components/HeroSection";
import RecentlyAddedBlogs from "../components/RecentlyAddedBlogs";
import AllBlogs from "../components/AllBlogs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <RecentlyAddedBlogs />
      <AllBlogs />
    </div>
  );
};

export default Home;
