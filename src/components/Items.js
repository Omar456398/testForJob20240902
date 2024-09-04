import React, { useContext, useRef } from "react";
import { Context } from "../App";
import ItemTile from "./ItemTile";

function Items() {
  const { prodState, setBagState, catState, catSelectedID } =
    useContext(Context);
  const cat = catState[catSelectedID];
  const addToBag = useRef((id) => {
    console.log(id);
    setBagState((prev) => {
      const curr = JSON.parse(JSON.stringify(prev));
      const newItem = {
        id,
        selectedAttributes: {},
        count: 1,
      };
      prodState
        .find((item) => item.id === id)
        ?.attributes?.forEach((element) => {
          newItem.selectedAttributes[element.id] = element.items?.[0]?.id;
        });
      const prodExistent = curr.find((item) => {
        let filterBool = item.id === newItem.id;
        if (filterBool) {
          Object.keys(item.selectedAttributes || {}).forEach((key) => {
            if (
              item.selectedAttributes[key] !== newItem.selectedAttributes[key]
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
        curr.push(newItem);
      }
      return curr;
    });
  }).current;
  return (
    <div className="flex w-full flex-wrap">
      {prodState
        .filter(
          (item) =>
            !cat ||
            cat.name.toLowerCase?.() === "all" ||
            cat.name === item.category
        )
        .map((item) => (
          <ItemTile prod={item} addToBag={addToBag} />
        ))}
    </div>
  );
}

export default Items;
