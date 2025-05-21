import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';

const LeadSource = () => {
  const [leadType, setLeadType] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadSources, setLeadSources] = useState([
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
      setLeadSources([...leadSources, newEntry]);
      setLeadName('');
      setLeadType('');
    }
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#edf2f7', minHeight: '100vh' }}>
      <h3 className="mb-4">Lead Source</h3>
      <Row>
        {/* Left Side - Add Lead Source */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-primary">
            <Card.Body>
              <Card.Title>Add Lead Source</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="leadSource">
                  <Form.Label>Lead Source</Form.Label>
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

        {/* Right Side - All Lead Sources */}
        <Col md={6}>
          <Card className="shadow-sm border-top border-success">
            <Card.Body>
              <Card.Title>All Lead Source</Card.Title>
              <ListGroup variant="flush">
                {leadSources.map((source, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {source}
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

export default LeadSource;
