import { useContext, useMemo } from "react";
import { Context } from "../App";

const MyBag = () => {
  const { bagState, setBagState, prodState, isCartOpen } = useContext(Context);
  const bagDisplay = useMemo(
    () =>
      bagState
        .map((item) => ({
          ...(prodState.find((item2) => item.id === item2.id) || {}),
          ...item,
        }))
        .filter((item) => item.inStock),
    [bagState, prodState]
  );
  const bagCount = useMemo(
    () => bagDisplay.reduce((a, b) => a + (b.count || 0), 0),
    [bagDisplay]
  );
  const bagTotal = useMemo(
    () =>
      bagDisplay.reduce(
        (a, b) => a + (b.count * b?.prices?.[0]?.amount || 0),
        0
      ),
    [bagDisplay]
  );
  return isCartOpen ? (
    <div
      className="p-4 bg-white w-full max-w-md right-20 fixed top-16"
      style={{ zIndex: 3 }}
    >
      <h2 className="text-lg mb-4">
        <span className="font-semibold">My Bag{bagCount ? "," : ""}</span>{" "}
        {bagCount ? (
          <>
            {bagCount} {bagCount === 1 ? "item" : "items"}
          </>
        ) : null}
      </h2>
      <div
        style={{ maxHeight: "calc(100vh - 17.875rem)", overflowY: "scroll" }}
      >
        {bagDisplay.map((item, index) => (
          <div key={item.id} className="flex items-center mb-12 h-52 space-x-2">
            <div className="ml-4 flex flex-1 flex-col h-full justify-between">
              <div>
                <h3
                  className="text-md text-lg font-light"
                  style={{
                    maxWidth: 150,
                    width: 150,
                    textOverflow: "ellipsis",
                    textWrap: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {item.name}
                </h3>
                <p className="font-semibold">
                  ${(item?.prices?.[0]?.amount || 0).toFixed(2)}
                </p>
              </div>
              {item.attributes.map((attribute) => (
                <div
                  key={attribute.id}
                  data-testid={`cart-item-attribute-${attribute.id?.toLowerCase()}`}
                >
                  <label key={attribute.id + "_0"} className="text-sm">
                    {attribute.name}:
                  </label>
                  <div
                    key={attribute.id + "_1"}
                    className="flex items-center space-x-2"
                  >
                    {attribute.items.map((item2) => (
                      <button
                        data-testid={`cart-item-attribute-${attribute.id?.toLowerCase()}-${item2.id?.toLowerCase()}${
                          attribute.items.find(
                            (item3) =>
                              item3.id === item2.id &&
                              item3.id ===
                                item.selectedAttributes?.[attribute.id]
                          )
                            ? "-selected"
                            : ""
                        }`}
                        key={item2.id}
                        onClick={() => {
                          setBagState((prev) => {
                            let curr = JSON.parse(JSON.stringify(prev));
                            if (curr[index]?.selectedAttributes) {
                              curr[index].selectedAttributes[attribute.id] =
                                item2.id;
                            }
                            return curr;
                          });
                        }}
                        className={
                          "pt-0 py-0 " +
                          (attribute.type === "text"
                            ? `h-7 w-min-7 ${
                                attribute.items.find(
                                  (item3) =>
                                    item3.id === item2.id &&
                                    item3.id ===
                                      item.selectedAttributes?.[attribute.id]
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
                                    item.selectedAttributes?.[attribute.id]
                              )
                                ? "border-green-400"
                                : "border-gray-100")
                            }
                          >
                            <div
                              className="w-5 h-5"
                              style={{ backgroundColor: item2.value }}
                            ></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col-reverse h-full items-center justify-between">
              <button
                data-testid="cart-item-amount-decrease"
                className="px-2 py-0 border text-4xl border-black font-light active:bg-gray-300 w-8 h-8"
                onClick={() => {
                  setBagState((prev) => {
                    let curr = JSON.parse(JSON.stringify(prev));
                    if (curr[index]) {
                      curr[index].count--;
                    }
                    if (curr[index].count <= 0) {
                      curr = curr.filter((_, index2) => index2 !== index);
                    }
                    return curr;
                  });
                }}
              >
                <div className="mt--0.7">-</div>
              </button>
              <span
                className="text-base font-semibold"
                data-testid="cart-item-amount"
              >
                {item.count}
              </span>
              <button
                data-testid="cart-item-amount-increase"
                className="px-2 py-0 border text-4xl border-black font-light active:bg-gray-300 w-8 h-8"
                onClick={() => {
                  setBagState((prev) => {
                    let curr = JSON.parse(JSON.stringify(prev));
                    if (curr[index]) {
                      curr[index].count++;
                    }
                    return curr;
                  });
                }}
              >
                <div className="mt--0.5">+</div>
              </button>
            </div>
            <img
              src={item.gallery?.[0]}
              alt={item.name}
              className="w-32 h-52 object-contain rounded"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-md font-bold">Total</span>
        <span className="text-lg font-bold" data-testid="cart-total">
          ${bagTotal.toFixed(2)}
        </span>
      </div>
      <button
        onClick={() => {
          setBagState([]);
        }}
        className="w-full mt-4 py-4 bg-green-500 disabled:bg-gray-500 text-white"
        disabled={bagCount === 0}
      >
        PLACE ORDER
      </button>
    </div>
  ) : null;
};

export default MyBag;
