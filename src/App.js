import Header from "./components/Header";
import ItemDetails from "./components/ItemDetails";
import Items from "./components/Items";
import MyBag from "./components/MyBag";
import { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";

export const Context = createContext();

const Provider = ({ children }) => {
  const [catState, setCatState] = useState([]);
  const [catSelectedID, setCatSelectedID] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prodState, setProdState] = useState([]);

  const [bagState, setBagState] = useState([]);

  return (
    <Context.Provider
      value={{
        prodState,
        setProdState,
        bagState,
        setBagState,
        catState,
        setCatState,
        catSelectedID,
        setCatSelectedID,
        isCartOpen,
        setIsCartOpen,
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
