import React, { useCallback, useContext } from "react";
import { Context } from "../App";
import ItemTile from "./ItemTile";

function Items() {
  const { prodState, setBagState, catState, catSelectedID } =
    useContext(Context);
  const cat = catState[catSelectedID];
  const addToBag = useCallback((id) => {
    setBagState((prev) => {
      const curr = JSON.parse(JSON.stringify(prev));
      const newItem = {
        id,
        selectedAttributes: {},
        count: 1,
      };
      console.log('orig', prodState)
      prodState
        .find((item) => item.id === id)
        ?.attributes?.forEach((element) => {
          newItem.selectedAttributes[element.name] = element.items?.[0]?.value;
        });
        console.log(newItem)
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
  }, [prodState, setBagState]);
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
