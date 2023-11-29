import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styles.scss';
import { Link } from 'react-router-dom';

function Crum(props) {
    const { title, to, titletwo, totwo } = props;
    return (
        <div className="break__crumb">
            <Container>
                <Row>
                    <Col xs lg={12} className="text-left">
                        <ul className="crumb__list">
                            <li className="home">
                                <Link to={'/'}>
                                    <span>Trang Chủ</span>
                                </Link>
                                <span className="mr_lr">
                                    <FontAwesomeIcon icon={faSlash} />
                                </span>
                            </li>
                            {titletwo && totwo && (
                                <li>
                                    <Link to={totwo}>
                                        <span>{titletwo}</span>
                                    </Link>
                                    <span className="mr_lr">
                                        <FontAwesomeIcon icon={faSlash} />
                                    </span>
                                </li>
                            )}
                            <li>
                                <Link to>
                                    <strong>
                                        <span>{title}</span>
                                    </strong>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Crum;
