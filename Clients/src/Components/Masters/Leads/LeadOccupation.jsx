import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

const LeadOccupation = () => {
  const [leadType, setLeadType] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadOccupations, setLeadOccupations] = useState([
    'Barkatullah (Organization Data)',
    'Facebook (Digital Platform)',
    'Instagram (Digital Platform)',
    'Google Search (Digital Platform)',
    'Youtube (Digital Platform)',

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
    <Container fluid className="p-4" style={{ backgroundColor: '#edf2f7', minHeight: '100vh' }}>
      <h3 className="mb-4">Lead Occupation</h3>
      <Row>
        {/* Left Side - Add Lead Occupation */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>Add Lead Occupation</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="leadOccupation">
                  <Form.Label>Lead Occupation</Form.Label>
                  <Form.Select
                    value={leadType}
                    onChange={(e) => setLeadType(e.target.value)}
                  >
                    <option value="">--Choose--</option>
                    <option value="Digital Platform">Digital Platform</option>
                    <option value="Organization Data">Organization Data</option>
                    <option value="Administrator Referral">Administrator Referral</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="leadName">
                  <Form.Label>Lead Name</Form.Label>
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

        {/* Right Side - All Lead Occupations */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Lead Occupation</Card.Title>
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

export default LeadOccupation;
