import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilterData } from "./FilterData";
import { ListData } from "./ListData";
import { useAuth } from "../account/Authentication";

function Navbar() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { isLoggedIn } = useAuth();
  const { allSubCategory } = FilterData();

  return (
    <div>
      <nav className="flex justify-between items-center font-semibold p-3">
        <div className="flex space-x-3">
          <button
            className="p-1 pl-1 pr-1 border-2 border-black rounded-md"
            onClick={toggleDropdown}
          >
            Category
          </button>
          <Link
            to="/discount"
            className="p-1 pl-1 pr-1 border-2 border-black rounded-md"
          >
            Fresh Sale
          </Link>
          <Link
            to="/cart"
            className="p-1 pl-1 pr-1 border-2 border-black rounded-md"
          >
            Go to Cart
          </Link>
          <Link
            to="/admin/order-list"
            className="p-1 pl-1 pr-1 border-2 border-black rounded-md"
          >
            Order List
          </Link>
          <Link
            to="/admin/update-product"
            className="p-1 pl-1 pr-1 border-2 border-black rounded-md"
          >
            Update Product
          </Link>
        </div>

        {isLoggedIn? UserDashboard("vggfg"): <LoginSignup />}
      </nav>
      {toggle && (
        <div className="absolute flex flex-col bg-red-200 left-5 border rounded-md">
          {allSubCategory.map((sc) => (
            <div key={sc.id} index={sc.id}>
              <Link
                to={`/subcategory/${sc.id}`}
                onClick={toggleDropdown}
                className="p-1"
              >
                {sc.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function toggleDropdown() {
    setToggle(!toggle);
  }
}

export default Navbar;


function LoginSignup() {
  return (
      <Link to="/login" className="p-1 pl-1 pr-1 border-2 border-black rounded-md ml-auto">
          Login
        </Link>
  )
}

function UserDashboard(name) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  }
  return (
      <div className='relative inline-block'>
      <button className='border-2 border-black rounded p-1'
          onClick={toggleDropdown}>
        {name}
      </button>
  {isDropdownOpen && (
      <div className=" absolute -left-28 right-0 mt-2 space-y-2
          bg-white border rounded-md shadow-lg" onClick={toggleDropdown}>
        <div>
        <Link to="/order-list" className="px-4 py-2 text-sm text-gray-700
            hover:bg-gray-100 hover:text-red-700" onClick={toggleDropdown}>
          Profile
        </Link>
        </div>

        <div>
        <Link to="/logout" className="px-4 py-2 text-sm text-gray-700
            hover:bg-gray-100 hover:text-red-700" onClick={toggleDropdown}>
          Logout
        </Link>
        </div>
      </div>
  )}
      </div>
  )
}

export {Navbar}