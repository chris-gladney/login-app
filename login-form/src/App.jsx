import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminReg from "./Components/AdminReg";
import ItemsToBuy from "./Components/ItemsToBuy";
import AddItems from "./Components/AddItems";
import ProtectedRoute from "./Components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/admin-reg" element={<AdminReg />} />

        {/* The routes below this point will be dependent on whether the user has an admin token */}
        <Route
          path="/purchase-items"
          element={
            <ProtectedRoute allowedRole="user">
              <ItemsToBuy />
            </ProtectedRoute>
          }
        />
        <Route path="/add-items" element={
            <ProtectedRoute allowedRole="admin">
              <AddItems />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
