import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Error from "./features/error";
import Loading from "./features/loading";
import ErrorBoundary from "./components/errorBoundary";

const HomePage = lazy(() => import("./features/home"));
const ClaimsPage = lazy(() => import("./features/claimsPage"));

function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/claims-page" component={ClaimsPage} />
    </Switch>
  );
}

export default App;
