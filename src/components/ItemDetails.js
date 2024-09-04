import { useCallback, useContext, useMemo, useState } from "react";
import { htmlStringToReact } from "../helper";
import { Context } from "../App";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery";

function ItemDetails() {
  const { id } = useParams();
  const { prodState, setBagState } = useContext(Context);
  const prod = prodState.find((item) => item.id === id);
  const reactHTML = useMemo(
    () => htmlStringToReact(prod?.description || ""),
    [prod]
  );
  const [prodObj, setProdObj] = useState(() => {
    const newItem = {
      id,
      selectedAttributes: {},
      count: 1,
    };
    prodState
      .find((item) => item.id === id)
      ?.attributes?.forEach((element) => {
        newItem.selectedAttributes[element.id] = null;
      });
    return newItem;
  });
  const isAvailable = useMemo(() => {
    let availBool = prod?.inStock;
    if (availBool) {
      Object.keys(prodObj.selectedAttributes || {}).forEach((key) => {
        if (prodObj.selectedAttributes[key] === null) {
          availBool = false;
        }
      });
    }
    return availBool;
  }, [prod, prodObj]);
  const addToBag = useCallback(
    (id) => {
      setBagState((prev) => {
        const curr = JSON.parse(JSON.stringify(prev));

        const prodExistent = curr.find((item) => {
          let filterBool = item.id === prodObj.id;
          if (filterBool) {
            Object.keys(item.selectedAttributes || {}).forEach((key) => {
              if (
                item.selectedAttributes[key] !== prodObj.selectedAttributes[key]
              ) {
                filterBool = false;
              }
            });
          }
          return filterBool;
        });
        if (prodExistent) {
          prodExistent.count++;
        } else {
          curr.push(prodObj);
        }
        return curr;
      });
    },
    [prodObj, setBagState]
  );
  return prod ? (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <Gallery images={prod.gallery || []} />
        <div
          className="ml-4 flex flex-1 flex-col h-full justify-between"
          style={{ maxWidth: "24rem" }}
        >
          <div>
            <h3 className="text-3xl font-semibold mb-8">{prod.name}</h3>
          </div>
          {prod.attributes.map((attribute) => (
            <div
              key={attribute.id}
              data-testid={`product-attribute-${attribute.id?.toLowerCase()}`}
            >
              <label key={attribute.id + "_0"} className="text-lg font-bold">
                {attribute.name?.toUpperCase()}:
              </label>
              <div
                key={attribute.id + "_1"}
                className="flex items-center flex-wrap mt-2 mb-8"
              >
                {attribute.items.map((item2) => (
                  <button
                    data-testid={`product-attribute-${attribute.id?.toLowerCase()}-${item2.id?.toLowerCase()}${
                      attribute.items.find(
                        (item3) =>
                          item3.id === item2.id &&
                          item3.id ===
                            prodObj.selectedAttributes?.[attribute.id]
                      )
                        ? "-selected"
                        : ""
                    }`}
                    onClick={() => {
                      setProdObj((prev) => {
                        let curr = JSON.parse(JSON.stringify(prev));
                        if (curr.selectedAttributes) {
                          curr.selectedAttributes[attribute.id] = item2.id;
                        }
                        return curr;
                      });
                    }}
                    key={item2.id}
                    className={
                      "pt-0 py-0 mr-4 mb-2 " +
                      (attribute.type === "text"
                        ? `h-12 w-min-16 p-2 ${
                            attribute.items.find(
                              (item3) =>
                                item3.id === item2.id &&
                                item3.id ===
                                  prodObj.selectedAttributes?.[attribute.id]
                            )
                              ? "text-white"
                              : "text-black bg-white"
                          } active:bg-gray-300 bg-black`
                        : "") +
                      ` text-center align-center border ${
                        attribute.type === "text"
                          ? "border-black"
                          : "border-white"
                      }`
                    }
                  >
                    {attribute.type === "text" ? (
                      item2.value
                    ) : (
                      <div
                        className={
                          "p-0.5 border " +
                          (attribute.items.find(
                            (item3) =>
                              item3.id === item2.id &&
                              item3.id ===
                                prodObj.selectedAttributes?.[attribute.id]
                          )
                            ? "border-green-400"
                            : "border-gray-100")
                        }
                      >
                        <div
                          className="w-7 h-7"
                          style={{ backgroundColor: item2.value }}
                        ></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <label className="text-lg font-bold">PRICE:</label>
            <div className="flex items-center space-x-4 mt-2 mb-8 text-2xl font-bold">
              ${(prod?.prices?.[0]?.amount || 0).toFixed(2)}
            </div>
          </div>
          <button
            data-testid="add-to-cart"
            disabled={!isAvailable}
            className="px-6 py-4 bg-green-400 disabled:bg-gray-400 active:bg-green-500 text-white"
            onClick={() => addToBag(id)}
          >
            ADD TO CART
          </button>
          <div className="h-8" data-testid="product-description" />
          {reactHTML}
        </div>
      </div>
    </div>
  ) : null;
}

export default ItemDetails;
