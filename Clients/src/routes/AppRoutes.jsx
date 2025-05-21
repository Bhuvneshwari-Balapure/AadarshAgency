// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashbord from '../Components/Dashbord/Dashbord';
import Composite from "../Components/Masters/Composite/Composite";
import Layout from "../Layout/Layout";
import DashboardCards from "../Components/Dashbord/DashboardCards";
import Area from "../Components/Masters/Leads/Area";
import City from "../Components/Masters/Leads/City";
import LeadOccupation from "../Components/Masters/Leads/LeadOccupation";
import LeadSource from "../Components/Masters/Leads/LeadSource";
import SubArea from "../Components/Masters/Leads/SubArea";
import MarketingTask from "../Components/Masters/Marketing/MarketingTask";
import ServicingTask from "../Components/Masters/Servicing/ServicingTask";
import AddProspectLead from "../Components/Customer/AddProspectLead";
import AddSuspect from "../Components/Customer/AddSuspect";
import CustomerDetail from "../Components/Customer/CustomerDetail";
import ImportLead from "../Components/Customer/ImportLead";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardCards />} />
        <Route path="/composite" element={<Composite />} />
        <Route path="/area" element={<Area />} />
        <Route path="/city" element={<City />} />
        <Route path="/lead-occupation" element={<LeadOccupation />} />
        <Route path="/lead-source" element={<LeadSource />} />
        <Route path="/sub-area" element={<SubArea />} />
        <Route path="/marketing-task" element={<MarketingTask />} />
        <Route path="/servicing-task" element={<ServicingTask />} />
        <Route path="/add-prospect-lead" element={<AddProspectLead />} />
        <Route path="/add-suspect-lead" element={<AddSuspect />} />
        <Route path="/customer-detail" element={<CustomerDetail />} />
        <Route path="/import-lead" element={<ImportLead />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
