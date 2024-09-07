import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import CelebrityContextProvider from "./context/CelebrityContext.jsx"

createRoot(document.getElementById("root")).render(
	<CelebrityContextProvider>
		<App />
	</CelebrityContextProvider>
)
