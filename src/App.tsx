import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import RootLayout from "./components/layouts/RootLayout";
import Home from "./pages/onboarding/Home";
import Recommendation from "./pages/onboarding/Recommendation";
import AuthRootLayout from "./components/layouts/AuthRootLayout";
import AssetsLayout from "./components/layouts/AssetsLayout";
import AddPlansLayout from "./components/layouts/AddPlansLayout";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import NewPassword from "./pages/auth/NewPassword";
import Dashboard from "./pages/main/Dashboard";
import DashBoardHome from "./pages/main/DashBoardHome";
import Assets from "./pages/main/Assets";
import AddAsset from "./pages/main/AddAsset";

import EstatePlans from "./pages/main/EstatePlans";
import MyEstatePlan from "./pages/main/EstatePlan/MyEstatePlan";
import Beneficiaries from "./pages/main/EstatePlan/Beneficiaries";
import AddEstatePlan from "./pages/main/EstatePlan/AddEstatePlan";
import Settings from "./pages/main/Settings";

import SimpleWill from "./pages/main/EstatePlan/Plans/SimpleWill";
import ComprehensiveWill from "./pages/main/EstatePlan/Plans/ComprehensiveWill";
import EducationTrust from "./pages/main/EstatePlan/Plans/EducationTrust";
import NominatedFund from "./pages/main/EstatePlan/Plans/NominatedFund";

function App() {
  const [cookie] = useCookies(["auth"]);

  const ProtectedRoutes = () => {
    const auth = cookie.auth;
    return auth?.token ? <Dashboard /> : <Navigate to="/auth/SignIn" replace />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Recommendation", element: <Recommendation /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthRootLayout />,
      children: [
        { index: true, path: "SignIn", element: <SignIn /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "verifyotp", element: <VerifyOtp /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "newpassword", element: <NewPassword /> },
      ],
    },
    {
      path: "/Dashboard",
      element: <ProtectedRoutes />,

      children: [
        { index: true, element: <DashBoardHome /> },
        {
          path: "Assets",
          element: <AssetsLayout />,
          children: [
            { index: true, element: <Assets /> },
            { path: "addassets", element: <AddAsset /> },
          ],
        },
        {
          path: "EstatePlans",
          element: <EstatePlans />,
          children: [
            { index: true, element: <MyEstatePlan /> },
            { path: "Beneficiaries", element: <Beneficiaries /> },
            {
              path: "AddPlans",
              element: <AddPlansLayout />,
              children: [
                { index: true, element: <AddEstatePlan /> },
                { path: "educationTrust", element: <EducationTrust /> },
                { path: "simplewill", element: <SimpleWill /> },
                { path: "comprehensivewill", element: <ComprehensiveWill /> },
                { path: "nominatedfund", element: <NominatedFund /> },
              ],
            },
          ],
        },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;