import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import Movie from "./pages/Pages/Movie";
import TVShow from "./pages/Pages/TVShow";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Movie />} />
            <Route path="/movie/new" element={<Movie />} />
            <Route path="/movie/hits" element={<Movie />} />
            <Route index path="/tv" element={<TVShow />} />
            <Route path="/tv/new" element={<TVShow />} />
            <Route path="/tv/hits" element={<TVShow />} />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}


