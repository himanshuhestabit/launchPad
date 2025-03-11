import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/features/blogSlice";

const useGetBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state) => state.blogs || { blogs: [] }
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return { blogs: Array.isArray(blogs) ? blogs : [], loading, error };
};

export default useGetBlogs;
