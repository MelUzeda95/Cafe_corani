import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import Branches from "./pages/Branches";
import BranchDetail from "./pages/BranchDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Products />}
        />
        <Route
          path="/productos"
          element={<Products />}
        />

        <Route
          path="/sucursales"
          element={<Branches />}
        />

        <Route
          path="/sucursales/:id"
          element={<BranchDetail />}
        />

        <Route
          path="/contacto"
          element={<Contact />}
        />
        <Route
          path="*"
          element={
            <main
              style={{
                padding: "40px",
                textAlign: "center",
              }}
            >
              <h1>Página no encontrada</h1>
              <p>
                La página que buscas no existe.
              </p>
            </main>
          }
        />

      </Route>
    </Routes>
  );
}

export default App;