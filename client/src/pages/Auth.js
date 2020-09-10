import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const initialFormState = {
  username: "",
  password: "",
};

function Auth() {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      const updatedState = { ...current, [name]: value };
      return updatedState;
    });
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <p>Login</p>
        <Form.Group>
          {Object.keys(form).map((formName) => (
            <Row>
              <Form.Control
                type="text"
                name={formName}
                placeholder={formName}
                value={form[formName]}
                onChange={handleChange}
              />
            </Row>
          ))}
          <Row>
            <Button>Submit</Button>
          </Row>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default Auth;
