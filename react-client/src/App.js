
import Main from "./components/screens/Main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Col, Container, Row} from "react-bootstrap";

function App() {
  return (
      <Container>
          <Row >
              <Col>
                  <Main />
              </Col>
          </Row >
      </Container>
  );
}

export default App;
