import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

// Pages
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import CreateGoalPage from "./pages/goals/CreateGoalPage";
import ViewAllGoalsPage from "./pages/goals/ViewAllGoalsPage";
import ViewGoalPage from "./pages/goals/ViewGoalPage";
import CreateSessionPage from "./pages/session/CreateSessionPage";
import ViewSessionPage from "./pages/session/ViewSessionPage";
import ViewAllSessionsPage from "./pages/session/ViewAllSessionsPage";
import CreateInstrumentPage from "./pages/instruments/CreateInstrumentPage";
import ViewAllInstrumentsPage from "./pages/instruments/ViewAllInstrumentsPage";
import ViewInstrumentPage from "./pages/instruments/ViewInstrumentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/session/view" exact element={<PrivateRoute />}>
          <Route path="/session/view" element={<ViewSessionPage />} />
        </Route>
        <Route path="/session/create" exact element={<PrivateRoute />}>
          <Route path="/session/create" element={<CreateSessionPage />} />
        </Route>
        <Route path="/sessions" exact element={<PrivateRoute />}>
          <Route path="/sessions" element={<ViewAllSessionsPage />} />
        </Route>
        <Route path="/goals/view" exact element={<PrivateRoute />}>
          <Route path="/goals/view" element={<ViewGoalPage />} />
        </Route>
        <Route path="/goals" exact element={<PrivateRoute />}>
          <Route path="/goals" element={<ViewAllGoalsPage />} />
        </Route>
        <Route path="/goals/create" exact element={<PrivateRoute />}>
          <Route path="/goals/create" element={<CreateGoalPage />} />
        </Route>
        <Route path="/instruments/view" exact element={<PrivateRoute />}>
          <Route path="/instruments/view" element={<ViewInstrumentPage />} />
        </Route>
        <Route path="/instruments" exact element={<PrivateRoute />}>
          <Route path="/instruments" element={<ViewAllInstrumentsPage />} />
        </Route>
        <Route path="/instruments/create" exact element={<PrivateRoute />}>
          <Route
            path="/instruments/create"
            element={<CreateInstrumentPage />}
          />
        </Route>
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/" exact element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
