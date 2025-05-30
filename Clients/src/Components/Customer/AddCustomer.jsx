import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Toast } from "react-bootstrap";
import axios from "../../Config/axios";
import { ToastContainer, toast } from "react-toastify";

function AddCustomer({ refresh, editingCustomer, setEditingCustomer }) {
  const [companies, setCompanies] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    brandId: "",
    creditLimit: "",
    creditDay: "",
  });

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("/company");
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch companies");
    }
  };
  console.log(companies, "Companies fetched");

  useEffect(() => {
    fetchCompanies();
  }, []);

  // edit customer
  useEffect(() => {
    if (editingCustomer) {
      setCustomer({
        name: editingCustomer.name || "",
        brandId: editingCustomer.brandId?._id || editingCustomer.brandId || "",
        creditLimit: editingCustomer.creditLimit || "",
        creditDay: editingCustomer.creditDay?.slice(0, 10) || "",
      });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        // Update existing customer
        await axios.put(`/customer/${editingCustomer._id}`, customer);
        toast.success("Customer updated successfully!");
      } else {
        // Add new customer
        await axios.post("/customer", customer);
        toast.success("Customer saved successfully!");
      }

      // Reset form and refresh data
      setCustomer({ name: "", brandId: "", creditLimit: "", creditDay: "" });
      setEditingCustomer(null);
      if (refresh) refresh();
    } catch (error) {
      toast.error("Failed to save customer.");
      console.error("Error saving customer:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>Add Customer</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                name="name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                name="brandId"
                value={customer.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                {companies.map((comp) => (
                  <option key={comp._id} value={comp._id}>
                    {comp.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Credit Limit</Form.Label>
              <Form.Control
                type="number"
                name="creditLimit"
                value={customer.creditLimit}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Credit Day</Form.Label>
              <Form.Control
                type="date"
                name="creditDay"
                value={customer.creditDay}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit">
              {editingCustomer ? "Update Customer" : "Add Customer"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Container>
  );
}

export default AddCustomer;
