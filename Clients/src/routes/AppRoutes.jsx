// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashbord from '../Components/Dashbord/Dashbord';
import Composite from "../Components/Masters/Composite/Composite";
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import Area from "../Components/Masters/Leads/Area";
import MarketingTask from "../Components/Masters/Marketing/MarketingTask";
import ServicingTask from "../Components/Masters/Servicing/ServicingTask";

import CustomerDetail from "../Components/Customer/CustomerDetail";
import AddSalesMan from "../Components/Masters/SalesMan/AddSalesMan";
import DisplaySalesMan from "../Components/Masters/SalesMan/DisplaySalesMan";
import ProductBillingReport from "../Components/Masters/SalesMan/ProductBillingReport";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardCards />} />
        <Route path="/composite" element={<Composite />} />
        <Route path="/area" element={<Area />} />
        <Route path="/marketing-task" element={<MarketingTask />} />
        <Route path="/servicing-task" element={<ServicingTask />} />
        <Route path="/customer-detail" element={<CustomerDetail />} />
        <Route path="/add-salesman" element={<AddSalesMan />} />
        <Route path="/display-salesman" element={<DisplaySalesMan />} />
        <Route
          path="/display-billing-report"
          element={<ProductBillingReport />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
