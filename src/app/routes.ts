import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import PCCSColorWheel from "./components/PCCSColorWheel";
import JISColors from "./components/JISColors";
import EyeStructure from "./components/EyeStructure";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pccs",
    Component: PCCSColorWheel,
  },
  {
    path: "/jis-colors",
    Component: JISColors,
  },
  {
    path: "/eye-structure",
    Component: EyeStructure,
  },
]);
