import { createElement, Fragment } from "react";

export const htmlToReact = (topElement) => {
  const children = topElement.childNodes;
  console.log([...children]);
  return [...children].map((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      return createElement(child.tagName, {}, htmlToReact(child));
    } else if (child.nodeType === Node.TEXT_NODE) {
      return child.textContent.trim();
    }
    return null;
  });
};

export const htmlStringToReact = (stringInput) => {
  const parent = document.createElement("div");
  parent.innerHTML = stringInput;
  return createElement(Fragment, {}, htmlToReact(parent));
};
