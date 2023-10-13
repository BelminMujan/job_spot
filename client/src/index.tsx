import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.scss"





const anchor = document.getElementById("root") as Element
const dom = createRoot(anchor)
dom.render(<App />)