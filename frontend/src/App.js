import React from "react";
import Blogs from "./Pages/Blogs";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateBlog from "./Pages/CreateBlog";
import ReadBlog from "./Pages/ReadBlog";
import Authentication from "./Pages/Authentication";
import Login from "./components/Login";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import YourBlogs from "./Pages/YourBlogs";
import CreateCategory from "./components/CreateCategory";
import FooterNavbar from "./components/FooterNavbar";
import { useSelector } from "react-redux";
import VerifyOTP from "./components/VerifyOTP";

const App = () => {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) || false;
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
          <Route path="/createCategory" element={<CreateCategory />} />
          <Route path="/yourBlog" element={<YourBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/readBlog" element={<ReadBlog />} />
        </Routes>
        {isAuthenticated && <FooterNavbar />}
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
