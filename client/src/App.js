import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import CreateGoalPage from "./pages/goals/CreateGoalPage";
import ViewAllGoalsPage from "./pages/goals/ViewAllGoalsPage";
import ViewGoalPage from "./pages/goals/ViewGoalPage";
import CreateSessionPage from "./pages/session/CreateSessionPage";
import ViewSessionPage from "./pages/session/ViewSessionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/session/:id" exact element={<ViewSessionPage />} />
        <Route path="/createsession" exact element={<CreateSessionPage />} />
        <Route path="/goals/view/:id" exact element={<ViewGoalPage />} />
        <Route path="/goals/view" exact element={<ViewAllGoalsPage />} />
        <Route path="/goals/create" exact element={<CreateGoalPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/" exact element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
