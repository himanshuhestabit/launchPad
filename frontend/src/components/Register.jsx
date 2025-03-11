import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/user/register`,
        data
      );
      console.log("User registered successfully:", response.data);
      if (response.status === 201) {
        navigate("/login");
      }
      toast.success("User registered successfully!");
    } catch (error) {
      toast.error("Failed to register user");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#1A1A1D] text-white flex-col">
      <div>
        <p className="text-3xl font-bold container mx-auto mb-6">
          {" "}
          Register User
        </p>
      </div>
      <div className="w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-full container mx-auto flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Name</label>
            <input
              {...register("name")}
              className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Email</label>
            <input
              {...register("email")}
              className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Password</label>
            <input
              {...register("password")}
              className="bg-[#3B1C32] w-3/4 p-3 rounded-md"
            />
          </div>
          <div>
            {/* <input type="submit" value="Submit" /> */}
            <input
              className="bg-[#6A1E55] text-white px-4 py-2 rounded"
              type="submit"
              value={isSubmitting ? "Submitting..." : "Submit"}
              disabled={isSubmitting}
            />
          </div>
        </form>
        <div className="text-center text-blue-300">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
