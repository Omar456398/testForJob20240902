import { useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      setCatSelectedID(
        Math.max(
          catState.findIndex(
            (item) => "/" + item.name.toLowerCase() === location.pathname
          ),
          0
        )
      ),
    [location]
  );

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
              <Link
                data-testid={`${
                  index === catSelectedID ? "active-" : ""
                }category-link`}
                to={"/" + item.name.toLowerCase()}
              >
                <button
                  key={index}
                  className={`${
                    index === catSelectedID
                      ? "text-green-500 border-b-2 border-green-500"
                      : "text-gray-500"
                  } pb-2 h-16`}
                  style={{ marginBottom: -3 }}
                >
                  {item.name?.toUpperCase()}
                </button>
              </Link>
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
