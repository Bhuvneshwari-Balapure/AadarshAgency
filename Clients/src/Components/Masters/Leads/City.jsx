import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

const City = () => {
  const [leadType, setLeadType] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadOccupations, setLeadOccupations] = useState([
    'Bhopal',
    'Indore',
    'Ujjain',
    

  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leadType && leadName) {
      const newEntry = `${leadName} (${leadType})`;
      setLeadOccupations([...leadOccupations, newEntry]);
      setLeadName('');
      setLeadType('');
    }
  };

  return (
    <Container fluid className="container mt-4" >
      <h3 className="mb-4">Add New City</h3>
      <Row>
        {/* Left Side - Add Add New City */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>Add  New City</Card.Title>
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="leadName">
                  <Form.Label>Add city</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary">submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side - All Add New Citys */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Add New City</Card.Title>
              <ListGroup variant="flush">
                {leadOccupations.map((Occupation, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {Occupation}
                    <span>
                      <i className="fas fa-edit text-primary me-3" style={{ cursor: 'pointer' }}></i>
                      <i className="fas fa-trash-alt text-danger" style={{ cursor: 'pointer' }}></i>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default City;
