import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import axios from "../../Config/axios";

const PurchaseForm = () => {
  const [vendors, setVendors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [purchaseData, setPurchaseData] = useState({
    vendorId: "",
    companyId: "",
    productId: "",
    purchaseRate: "",
    quantity: "",
  });

  const fetchInitialData = async () => {
    try {
      const [vRes, cRes, pRes, purRes] = await Promise.all([
        axios.get("/vendor"),
        axios.get("/company"),
        axios.get("/product"),
        axios.get("/purchase"),
      ]);
      setVendors(vRes.data);
      setCompanies(cRes.data);
      setProducts(pRes.data || []);
      setPurchases(purRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  console.log(purchases, "Purchases Data");

  useEffect(() => {
    fetchInitialData();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPurchaseData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productId") {
      const selectedProduct = products.find((p) => p._id === value);
      setPurchaseData((prev) => ({
        ...prev,
        productId: value,
        quantity: selectedProduct ? selectedProduct.availableQty : "",
        purchaseRate: selectedProduct ? selectedProduct.purchaseRate : "",
      }));
    } else {
      setPurchaseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/purchase/${editingId}`, purchaseData);
        alert("Purchase updated successfully");
      } else {
        await axios.post("/purchase", purchaseData);
        alert("Purchase saved successfully");
      }
      setPurchaseData({
        vendorId: "",
        companyId: "",
        productId: "",
        purchaseRate: "",
        quantity: "",
      });
      setEditingId(null);
      fetchInitialData();
    } catch (err) {
      console.error(err);
      alert("Failed to save/update purchase");
    }
  };

  const handleEdit = (purchase) => {
    setPurchaseData({
      vendorId: purchase.vendorId,
      companyId: purchase.companyId,
      productId: purchase.productId,
      purchaseRate: purchase.purchaseRate,
      quantity: purchase.quantity,
    });
    setEditingId(purchase._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      try {
        await axios.delete(`/purchase/${id}`);
        alert("Purchase deleted");
        fetchInitialData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete purchase");
      }
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 mb-4">
        <h4 className="mb-3">{editingId ? "Edit Purchase" : "Add Purchase"}</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Vendor</Form.Label>
                <Form.Select
                  name="vendorId"
                  value={purchaseData.vendorId}
                  onChange={handleChange}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Select
                  name="companyId"
                  value={purchaseData.companyId}
                  onChange={handleChange}
                >
                  <option value="">Select Company</option>
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product</Form.Label>
                <Form.Select
                  name="productId"
                  value={purchaseData.productId}
                  onChange={handleChange}
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.productName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Purchase Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="purchaseRate"
                  value={purchaseData.purchaseRate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={purchaseData.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant={editingId ? "warning" : "primary"}>
            {editingId ? "Update Purchase" : "Save Purchase"}
          </Button>
        </Form>
      </Card>

      <Card className="p-3">
        <h5>Purchase List</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Company</th>
              <th>Product</th>
              <th>Rate</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p._id}>
                <td>{p.vendorId?.name}</td>
                <td>{p.companyId?.name}</td>
                <td>{p.productId?.productName}</td>
                <td>{p.purchaseRate}</td>
                <td>{p.quantity}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default PurchaseForm;
