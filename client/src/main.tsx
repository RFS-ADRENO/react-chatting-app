import React from "react";
import ReactDOM from "react-dom/client";

import "./scss/index.scss";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    //<React.StrictMode>
			<App />
    //</React.StrictMode>
);

