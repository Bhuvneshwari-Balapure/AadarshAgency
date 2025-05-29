import React, { useEffect, useState } from "react";
import { Container, Table, Image, Button } from "react-bootstrap";
import axios from "../../Config/axios";

const API_BASE = import.meta.env.VITE_API;
const IMAGE_BASE = API_BASE.replace(/\/api$/, "");

function DisplaySalesMan() {
  const [salesmen, setSalesmen] = useState(null);

  useEffect(() => {
    fetchSalesmen();
  }, []);

  const fetchSalesmen = async () => {
    try {
      const response = await axios.get("/salesman");
      setSalesmen(response.data);
    } catch (error) {
      console.error("Error fetching salesmen:", error);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <Container className="my-4">
      <h3>Salesman List</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salesmen &&
            salesmen.Data.map((s) => (
              <tr key={s._id}>
                <td>
                  {s.photo ? (
                    <Image
                      src={`${IMAGE_BASE}/Images/${s.photo}`}
                      roundedCircle
                      width={50}
                      height={50}
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td>{s.name}</td>
                <td>{s.designation}</td>
                <td>{s.mobile}</td>
                <td>{s.email}</td>
                <td>{s.city}</td>
                <td>{s.username}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Button variant="link" className="text-primary">
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default DisplaySalesMan;
