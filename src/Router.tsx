import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./Routes/coin";
import Coins from "./Routes/coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
