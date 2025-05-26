// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashbord from '../Components/Dashbord/Dashbord';
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import CompanyDetail from "../Components/Productss/Company/CompanyDetail";
import CategoryDetail from "../Components/Productss/ProductCategory/CategoryDetail";
import SubCatDetail from "../Components/Productss/ProductSubCategory/SubCatDetail";
import Product from "../Components/Productss/CreateProduct/Product";
import AddSalesMan from "../Components/SalesMan/AddSalesMan";
import DisplaySalesMan from "../Components/SalesMan/DisplaySalesMan";
import BillingReport from "../Components/Invoice/BillingReport";
import DisplayInvoice from "../Components/Invoice/DisplayInvoice";
import GenerateInvoice from "../Components/Invoice/GenerateInvoice";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardCards />} />
        <Route path="/company" element={<CompanyDetail />} />
        <Route path="/pro-categories" element={<CategoryDetail />} />
        <Route path="/pro-SubCat" element={<SubCatDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/add-salesman" element={<AddSalesMan />} />
        <Route path="/display-salesman" element={<DisplaySalesMan />} />
        <Route path="/add-invoice" element={<BillingReport />} />
        <Route path="/generate-invoice" element={<GenerateInvoice />} />
        <Route path="/display-invoice" element={<DisplayInvoice />} />
        <Route path="/generate-invoice/:id" element={<GenerateInvoice />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
