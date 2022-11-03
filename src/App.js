import React, { useEffect } from "react";
// routes
import Router from "./router/routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/auth/authAction";
import {getCurrentProfile} from "./redux/profile/profileAction";
import setAuthToken from "./utils/setAuthToken";
import Toast from "./layouts/dashboard/Toast";
// ----------------------------------------------------------------------

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {

  const auth = JSON.parse(localStorage.getItem("bayqi_erp_userloaded"));

  useEffect(() => {
    store.dispatch(loadUser());

    if((auth != null) && (auth.isAuthenticated && !auth.loading && auth.roles)){
      store.dispatch(getCurrentProfile());
    } 
  }, [auth]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Toast />
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </ThemeProvider>{" "}
    </Provider>
  );
}
