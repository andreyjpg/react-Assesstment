import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import PhotosContainer from "./components/PhotosContainer";
import PhotoDetail from "./components/PhotoDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<PhotosContainer />} />
      <Route path="/photo/:id" element={<PhotoDetail />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
