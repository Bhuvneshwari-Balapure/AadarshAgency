import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Toast } from "react-bootstrap";
import axios from "../../Config/axios";
import { ToastContainer, toast } from "react-toastify";

function AddCustomer({ refresh, editingCustomer, setEditingCustomer }) {
  const [customer, setCustomer] = useState({
    firm: "",
    name: "",
    mobile: "",
    address: "",
    gstNumber: "",
    creditLimit: "",
    creditDay: "",
  });

  // edit customer
  useEffect(() => {
    if (editingCustomer) {
      setCustomer({
        name: editingCustomer.name || "",
        firm: editingCustomer.firm || "",
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
      setCustomer({ name: "", firm: "", creditLimit: "", creditDay: "" });
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
              <Form.Group className="mb-3">
                <Form.Label>Firm</Form.Label>
                <Form.Control
                  name="firm"
                  type="text"
                  placeholder="Enter Firm Name"
                  value={customer.firm}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {/* <Form.Select
                name="firmId"
                value={customer.firmId}
                onChange={handleChange}
                required
                type="text"
              > */}
              {/* <option value="">Select Firm</option>
                {companies.map((comp) => (
                  <option key={comp._id} value={comp._id}>
                    {comp.name}
                  </option>
                ))} */}
              {/* </Form.Select>*/}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contract Person</Form.Label>
              <Form.Control
                name="name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                name="mobile"
                value={customer.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={customer.address}
                onChange={handleChange}
                required
              />
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

            <Form.Group className="mb-3">
              <Form.Label>GST No.</Form.Label>
              <Form.Control
                name="gstNumber"
                className="form-control"
                placeholder="GST No."
                value={customer.gstNumber}
                onChange={handleChange}
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
