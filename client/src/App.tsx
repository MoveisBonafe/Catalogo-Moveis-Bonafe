import { Router, Route, Switch, useLocation } from "wouter";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/gestao" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;