import "./App.scss";
import AddEvent from "./screens/add_event/add_event.screen";
import { ToastContainer, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ListEvent from "./screens/list_event/list_event.screen";
import EditEvent from "./screens/edit_event/edit_event.screen";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListEvent} />
          <Route exact path="/add" component={AddEvent} />
          <Route exact path="/edit/:id" component={EditEvent} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
