import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import axios from "../../../Config/axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    companyId: "",
    categoryId: "",
    subCategoryId: "",
    productName: "",
    primaryUnit: "",
    secondaryUnit: "",
    primaryPrice: "",
    secondaryPrice: "",
    availableQty: "",
    hsnCode: "",
    gstPercent: 9,
  });

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/product");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [companyRes, categoryRes, subCategoryRes] = await Promise.all([
          axios.get("/company"),
          axios.get("/category"),
          axios.get("/Subcategory"),
        ]);

        setCompanies(companyRes.data || []);
        setCategories(categoryRes.data || []);
        setSubCategories(subCategoryRes.data || []);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };

    fetchDropdownData();
    fetchProducts(); // Load products on initial mount
  }, []);
  console.log(products, "products");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        lastUpdated: new Date(),
      };

      await axios.post("/product", productData);
      alert("Product created successfully!");
      setFormData({
        companyId: "",
        categoryId: "",
        subCategoryId: "",
        productName: "",
        primaryUnit: "",
        secondaryUnit: "",
        primaryPrice: "",
        secondaryPrice: "",
        availableQty: 0,
        hsnCode: "",
        gstPercent: 9,
      });
      fetchProducts();
      // Refresh product list after creation
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product.");
    }
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const productToDelete = products[index];
    if (!productToDelete?._id) return;

    try {
      await axios.delete(`/product/${productToDelete._id}`);
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="container mt-2">
      <h3 className="mb-3">Create Product</h3>
      <div className="row-2">
        {/* Form Section */}
        <div className="col-md-12 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">
                {editIndex !== null ? "Edit Product" : "Add New Product"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Company */}
                  <div className="col-md-4 mb-3">
                    <label>Company</label>
                    <select
                      name="companyId"
                      value={formData.companyId}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.companyName || c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="col-md-4 mb-3">
                    <label>Category</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SubCategory */}
                  <div className="col-md-4 mb-3">
                    <label>Sub Category</label>
                    <select
                      name="subCategoryId"
                      value={formData.subCategoryId}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select SubCategory</option>
                      {subCategories.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.subCat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Other inputs */}
                  <div className="col-md-4 mb-3">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label>Primary Unit</label>
                    <input
                      type="text"
                      name="primaryUnit"
                      value={formData.primaryUnit}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label>Primary Price</label>
                    <input
                      type="number"
                      name="primaryPrice"
                      value={formData.primaryPrice}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label>Secondary Unit</label>
                    <input
                      type="text"
                      name="secondaryUnit"
                      value={formData.secondaryUnit}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label>Secondary Price</label>
                    <input
                      type="number"
                      name="secondaryPrice"
                      value={formData.secondaryPrice}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-2 mb-3">
                    <label>Available Qty</label>
                    <input
                      type="number"
                      name="availableQty"
                      value={formData.availableQty}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>HSN Code</label>
                    <input
                      type="text"
                      name="hsnCode"
                      value={formData.hsnCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* gst */}
                  <div className="col-md-3 mb-3">
                    <label>GST %</label>
                    <input
                      type="Number"
                      name="gstPercent"
                      value={formData.gstPercent}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {editIndex !== null ? "Update Product" : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Product List Table Section */}
        <div className="col-md-12 mb-4">
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-success mb-3">Product List</h5>
              {products.length === 0 ? (
                <p>No products added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Company</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Primary Unit</th>
                        <th>Primary Price</th>
                        <th>Secondary Unit</th>
                        <th>Secondary Price</th>
                        <th>Available Qty</th>
                        <th>HSN Code</th>
                        <th>GST %</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product._id || index}>
                          <td>{index + 1}</td>
                          <td>{product.productName}</td>
                          <td>
                            {product.categoryName ||
                              product.categoryName ||
                              "N/A"}
                          </td>
                          <td>
                            {product.categoryId?.cat || "Unknown Category"}
                          </td>
                          <td>
                            {product.subCategoryId?.subCat ||
                              "Unknown SubCategory"}
                          </td>
                          <td>{product.primaryUnit}</td>
                          <td>₹ {product.primaryPrice}</td>
                          <td>{product.secondaryUnit}</td>
                          <td>₹ {product.secondaryPrice}</td>
                          <td>{product.availableQty ?? 0}</td>
                          <td>{product.hsnCode || "-"}</td>
                          <td>{product.gstPercent ?? 9}%</td>
                          <td className="d-flex g-2">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(index)}
                              title="Edit"
                            >
                              <PencilFill size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(index)}
                              title="Delete"
                            >
                              <TrashFill size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
