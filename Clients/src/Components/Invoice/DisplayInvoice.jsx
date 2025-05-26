import React, { useEffect, useState } from "react";
import axios from "../../Config/axios";
import { Table, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify"; // ✅ Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS
import { useNavigate } from "react-router-dom";

const DisplayInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/pro-billing");
      setInvoices(response.data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      toast.error("Failed to fetch invoices");
    }
  };

  const handlePrint = (invoiceId) => {
    // window.print();
    navigate(`/generate-invoice/${invoiceId}`); // ✅ Works correctly now)
  };

  const handleDelete = async (invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?"))
      return;

    try {
      await axios.delete(`/pro-billing/${invoiceId}`);
      toast.success("Invoice deleted successfully");
      fetchInvoices(); // Refresh list
    } catch (error) {
      toast.error("Failed to delete invoice");
      console.error("Delete error:", error);
    }
  };

  return (
    <div
      className="w-full mt-4"
      style={{
        width: "100vw",
        padding: "0 1rem",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <h2 className="mb-4">All Invoices</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Date</th>
            <th>Item Purchased</th>
            <th>Quantity</th>
            <th>Total Price</th>
            {/* <th>Salesman</th> */}
            <th>Print</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => {
            const { customer = {}, billing = [], companyId } = invoice;

            return (
              <tr key={invoice._id}>
                <td>{companyId?.name || "-"}</td>
                <td>
                  {customer.Billdate
                    ? new Date(customer.Billdate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <ul className="mb-0">
                    {billing.map((item, idx) => (
                      <li key={idx}>{item.productName || "-"}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul className="mb-0">
                    {billing.map((item, idx) => (
                      <li key={idx}>{item.qty || "-"}</li>
                    ))}
                  </ul>
                </td>
                <td>{invoice.finalAmount || 0}</td>
                {/* <td>{invoice.salesmanId?.name || "-"}</td> */}
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePrint(invoice._id)}
                  >
                    Print
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(invoice._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* ✅ Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DisplayInvoice;
