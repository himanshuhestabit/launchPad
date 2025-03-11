import React from "react";
import Blogs from "./Pages/Blogs";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateBlog from "./Pages/CreateBlog";
import ReadBlog from "./Pages/ReadBlog";
import Authentication from "./Pages/Authentication";
import Login from "./components/Login";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/readBlog" element={<ReadBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
