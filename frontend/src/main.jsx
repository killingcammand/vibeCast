import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App.jsx"
import { BrowserRouter } from "react-router-dom"
import {AuthProvider} from "./features/auth/context/AuthContext.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
      <BrowserRouter>
          <AuthProvider>
             <App />
           </AuthProvider>
      </BrowserRouter>
   
)


