import { createRoot } from "react-dom/client";
import App from "@src/pages/content/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { Provider } from "jotai";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "chatgpt-archive-extension-root";
document.querySelector("html").appendChild(root);

if (window.location.pathname.includes("auth/login")) {
  console.log("Please login first");
} else {
  createRoot(root).render(
    <Provider>
      <App />
    </Provider>
  );
}
