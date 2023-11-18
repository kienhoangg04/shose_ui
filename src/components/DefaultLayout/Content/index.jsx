import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from '../Navbar';
import './styles.scss';

function Content({ children }) {
    return (
        <div className="content">
            <Container>
                <Row>
                    <Col xs={3}>
                        <Navbar />
                    </Col>
                    <Col xs={9}>{children}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Content;
