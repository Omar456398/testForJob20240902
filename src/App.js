import { gql, useMutation, useQuery } from "@apollo/client";
import Header from "./components/Header";
import ItemDetails from "./components/ItemDetails";
import Items from "./components/Items";
import MyBag from "./components/MyBag";
import { useState, createContext, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

export const Context = createContext();

const isLocalStorageAvailable = () => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const GET_PRODUCTS = gql`
  query {
    products {
      attributes {
        id
        items {
          display_value
          value
        }
        name
        type
      }
      brand
      category
      description
      gallery {
        url
      }
      id
      inStock
      name
      type
      prices {
        amount
        currency_label
        currency_symbol
      }
    }
  }
`;
const GET_CATS = gql`
  query {
    categories {
      name
    }
  }
`;
const CREATE_ORDER = gql`
  mutation CreateOrder($order_json: String!) {
    createOrder(order_json: $order_json) {
      id
      order_json
    }
  }
`;

const Provider = ({ children }) => {
  const { data: categories } = useQuery(GET_CATS);
  const [catSelectedID, setCatSelectedID] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data } = useQuery(GET_PRODUCTS);
  const prodState = useMemo(() => data?.products || [], [data]);
  const catState = useMemo(() => categories?.categories || [], [categories]);
  const [bagState, setBagState] = useState(
    isLocalStorageAvailable ? JSON.parse(window.localStorage.getItem("myBag") || '[]') : []
  );
  const [
    addOrder,
    {
      data: createdOrderData,
      loading: addOrderLoading,
      error: orderCreationError,
      reset: addOrderReset,
    },
  ] = useMutation(CREATE_ORDER);
  useEffect(() => {
    if (isLocalStorageAvailable) {
      window.localStorage.setItem("myBag", JSON.stringify(bagState));
    }
    if(bagState.length) {
      setIsCartOpen(true)
    }
  }, [bagState]);
  return (
    <Context.Provider
      value={{
        prodState,
        bagState,
        setBagState,
        catState,
        catSelectedID,
        setCatSelectedID,
        isCartOpen,
        setIsCartOpen,
        addOrder,
        addOrderLoading,
        addOrderReset,
        orderCreationError,
        createdOrderData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

function App() {
  return (
    <Provider>
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                element={
                  <>
                    <div className="h-20 w-full"></div>
                    <Items />
                    <Header></Header>
                    <MyBag />
                  </>
                }
              />
              <Route
                exact
                path="/:id"
                element={
                  <>
                    <div className="h-20 w-full"></div>
                    <Items />
                    <Header></Header>
                    <MyBag />
                  </>
                }
              />
              <Route
                path="/details/:id"
                element={
                  <>
                    <div className="h-20 w-full"></div>
                    <ItemDetails />
                    <Header></Header>
                    <MyBag />
                  </>
                }
              />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
