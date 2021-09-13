import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import firebase, { FirebaseContext } from "./firebase";
import Ordenes from "./components/pages/Ordenes";
import Menu from "./components/pages/Menu";
import Platillo from "./components/pages/Platillo";
import Sidebar from "./components/ui/Sidebar";

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className="md:flex min-h-screen">
        <Router>
          <Sidebar />
          <div className="md:w-2/5 xl:w-1/5 p-6">
            <Switch>
              <Route path="/" exact={true}>
                <Ordenes />
              </Route>
              <Route path="/menu" exact={true}>
                <Menu />
              </Route>
              <Route path="/nuevo-platillo" exact={true}>
                <Platillo />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
