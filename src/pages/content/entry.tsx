import { createRoot } from "react-dom/client";
import App from "@src/pages/content/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { Provider } from "jotai";
import { initializeShadowRoot } from "./root";

refreshOnUpdate("pages/content");

const shadowRoot = initializeShadowRoot();

const cssPath = "assets/css/Style.chunk.css";
const cssFullPath = chrome.runtime.getURL(cssPath);
const cssLink = document.createElement("link");
cssLink.setAttribute("rel", "stylesheet");
cssLink.setAttribute("href", cssFullPath);

if (window.location.pathname.includes("auth/login")) {
  console.log("Please login first");
} else {
  createRoot(shadowRoot).render(
    <Provider>
      <link rel="stylesheet" href={cssFullPath} />
      <style>
        {`
#chatgpt-archive-content-view-container {
  --bg-main: rgb(52, 53, 65);
  --bg-main-2: rgb(32, 33, 35);
  --fg-main: rgb(217, 217, 227);
  --bg-card-hover: rgba(115, 115, 115, 0.1);

  // slate
  --bg-50: 220 20% 97%;
  --bg-100: 220 19% 94%;
  --bg-200: 222 18% 86%;
  --bg-300: 214 17% 74%;
  --bg-400: 215 17% 60%;
  --bg-500: 215 16% 47%;
  --bg-600: 217 18% 39%;
  --bg-700: 218 18% 32%;
  --bg-800: 220 17% 27%;
  --bg-900: 220 15% 24%;
  --bg-950: 218 14% 16%;

  // teal
  --primary-50: 166 76% 97%;
  --primary-100: 167 85% 89%;
  --primary-200: 168 84% 78%;
  --primary-300: 171 77% 64%;
  --primary-400: 172 66% 50%;
  // --primary-500: 173 80% 40%;
  --primary-600: 175 84% 32%;
  --primary-700: 175 77% 26%;
  --primary-800: 176 69% 22%;
  --primary-900: 176 61% 19%;
  --primary-950: 179 84% 10%;

  --primary-500: 142 71% 45%;


  --text: var(--bg-950);
  --background: 0 0% 100%;
  --primary: var(--primary-500);
  --secondary: 216 49% 86%;
  --accent: var(--bg-100);

  --text-2: var(--bg-200);
  --background-2: var(--bg-100);

  --foreground: var(--text);

  --card: var(--background);
  --card-foreground: var(--text);

  --popover: var(--background);
  --popover-foreground: var(--text);

  --primary-foreground: var(--text);

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --muted: var(--bg-100);
  --muted-foreground: var(--bg-500);

  --accent-foreground: var(--text);

  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  --border: var(--bg-700);
  --input: var(--bg-500);
  --ring: 222.2 84% 4.9%;

  --radius: 0.5rem;

  --page-px: 8px;
  --content-px: 12px;
  --header-h: 4rem;

  background-color: hsl(var(--background));
  ;
  color: hsl(var(--text));
}

#chatgpt-archive-content-view-container.dark {
  --text: var(--bg-50);
  // --background: var(--bg-950);
  --background: 216 16% 6%;
  --secondary: 216 48% 6%;
  --accent: var(--bg-800);

  --text-2: var(--bg-700);
  --background-2: var(--bg-800);

  --card: 215 25% 27%;

  // --primary: 210 40% 98%;
  // --primary-foreground: 222.2 47.4% 11.2%;

  --primary-foreground: var(--background);

  // --secondary: 217.2 32.6% 17.5%;
  // --secondary-foreground: 210 40% 98%;

  --secondary-foreground: var(--background);

  --muted: var(--bg-950);
  --muted-foreground: var(--bg-400);

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: var(--bg-200);
  --input: var(--bg-500);
  --ring: 212.7 26.8% 83.9%;

}
`}
      </style>
      <App />
    </Provider>
  );
}
