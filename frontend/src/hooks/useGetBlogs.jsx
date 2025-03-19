import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";

const useGetBlogs = () => {
  const dispatch = useDispatch();
  const {
    blogs = [],
    loading = false,
    error = null,
  } = useSelector(
    (state) => state.blogs || { blogs: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return { blogs, loading, error };
};

export default useGetBlogs;
