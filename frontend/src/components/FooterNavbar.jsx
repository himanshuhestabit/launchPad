import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterNavbar = () => {
  return (
    <footer className="bg-gray-200 text-white py-8 px-4 md:px-16">
      <div className="lg:max-w-[1300px] md:max-w-[800px] max-w-[300px] mx-auto flex items-start justify-between lg:flex-row flex-col lg:gap-0 gap-2">
        {/* Company Info */}
        <div className="lg:w-1/3 w-full">
          <Link
            to={"/home"}
            className="text-3xl font-black bg-gradient-to-r from-[#AF57C5] to-[#D33427] text-transparent bg-clip-text"
          >
            Blogs
          </Link>
          <p className="mt-2 text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
            eveniet eius libero quam cum consequuntur blanditiis esse qui at
            assumenda.
          </p>
        </div>

        {/* Important Links */}
        <div className="lg:w-1/3 w-full  lg:text-center text-start ">
          <h2 className="text-xl font-bold text-gray-600">Important Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to={"/home"} className="text-gray-400 hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-400 hover:text-gray-600">
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to={"/yourBlog"}
                className="text-gray-400 hover:text-gray-600"
              >
                Your Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="lg:w-1/3 w-full flex flex-col lg:items-end items-start">
          <h2 className="text-xl font-bold text-gray-600">Follow Us</h2>
          <div className="mt-2 flex space-x-4">
            <Link
              to={"/"}
              className="text-gray-400 hover:text-gray-600 text-2xl "
            >
              <FaFacebook />
            </Link>
            <Link
              to={"/"}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaTwitter />
            </Link>
            <Link
              to={"/"}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNavbar;
