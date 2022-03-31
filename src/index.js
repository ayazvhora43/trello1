import "./index.css";
import React from "react";
import store from "./store";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login";
import { Provider } from "react-redux";
import Home from "./components/HomePage";
import Signup from "./components/Signup";
import * as serviceWorker from "./serviceWorker";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import Boards from "./components/Boards";
import Sharedapp from "./components/shared/Sharedapp";
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const rootElement = document.getElementById("root");

  ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<PublicRoute> <Home />  </PublicRoute>} />
                    <Route exact path="login" element={<PublicRoute> <Login/> </PublicRoute>} />
                    <Route exact path="signup" element={ <PublicRoute> <Signup/> </PublicRoute>} />
                    <Route exact path="*" element={ <PublicRoute> <Home/> </PublicRoute>} />
                    <Route exact path="trello" element={<PrivateRoute> <App /> </PrivateRoute>} />
                    <Route exact path="Boards" element={<PrivateRoute> <Boards /> </PrivateRoute>} />
                    <Route exact path="shared" element={<PrivateRoute> <Sharedapp /> </PrivateRoute>} />
                </Routes>
            </BrowserRouter>
    </Provider>,
    rootElement
  );

serviceWorker.unregister();
