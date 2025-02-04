import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import ViewUser from "./components/ViewUser/ViewUser";
import AddRole from "./components/AddRole/AddRole";
import RemoveRole from "./components/RemoveRole/RemoveRole";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< UserList/>} /> {/* Ruta principal */}
        <Route path="/view/id/:id" element={< ViewUser/>} /> {/* Ruta para ver usuario */}
        <Route path="/add_role/id/:id" element={<AddRole/>} /> {/* Ruta para agregar rol */}
        <Route path="/remove_role/id/:id" element={<RemoveRole/>} /> {/* Ruta para eliminar rol */}
      </Routes>
    </Router>
  );
}

export default App;
