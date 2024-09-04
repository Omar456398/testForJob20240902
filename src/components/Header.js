import { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { Context } from "../App";
import Logo from "./Logo.js";

const Header = () => {
  const {
    bagState,
    catState,
    catSelectedID,
    setCatSelectedID,
    isCartOpen,
    setIsCartOpen,
  } = useContext(Context);
  const bagCount = useMemo(
    () => bagState.reduce((a, b) => a + (b.count || 0), 0),
    [bagState]
  );
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {isCartOpen ? (
        <div
          className="fixed bg-gray-900 opacity-25 top-0 left-0"
          style={{ height: "100vh", width: "100vw" }}
          onClick={() => setIsCartOpen(false)}
        ></div>
      ) : null}
      <div className="fixed w-full top-0">
        <nav className="flex justify-between items-center px-20 bg-white h-16">
          <div className="flex space-x-8">
            {catState.map((item, index) => (
              <button
                data-testid={`${
                  index === catSelectedID ? "active-" : ""
                }category-link`}
                key={index}
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                  setCatSelectedID(index);
                }}
                className={`${
                  index === catSelectedID
                    ? "text-green-500 border-b-2 h-16 border-green-500"
                    : "text-gray-500"
                } pb-2`}
                style={{ marginBottom: -3 }}
              >
                {item.name?.toUpperCase()}
              </button>
            ))}
          </div>
          <CartIcon itemCount={bagCount}></CartIcon>
        </nav>
      </div>
      <div
        className="fixed w-full h-16 top-0 flex justify-center items-center"
        style={{ pointerEvents: "none" }}
      >
        <Logo></Logo>
      </div>
    </>
  );
};

export default Header;
