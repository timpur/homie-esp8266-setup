import "./utils/sierra-libary.scss";
import "./index.scss";

import "linkstate/polyfill";
import "unfetch/polyfill";

import { h, render } from "preact";

import store from "./store";

const root = document.getElementsByTagName("app")[0];
root.innerHTML = "";
render(h(store, {}), root);
