import React, { Component } from 'react'
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { Row, Col, } from 'antd';
export class PrivacyPolicy extends Component {
    render() {
        return (
            <div>

                <div className="navTop">
                    <Row justify="center" >
                        <Col span={8}>
                                <h1 style={{color:"#FFFFFF"}}>PrivacyPolicy</h1>
                        </Col>
                    </Row>


                </div>
                <Row justify="center" style={{ marginTop: "20px" }}>
                    <Col span={16}>
                        <div className="Nav">
                            <p>PrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            PrivacyPolicyPrivacyPolicyPrivacyPolicyPrivacyPolicy
                            </p>
                        </div>
                    </Col>
                </Row>



                <Row justify="center" style={{ marginTop: "50px" }}>
                    <Col span={8}> <Link to="/"><button className="btn-cancel">BACK</button></Link></Col>
                </Row>

            </div>
        )
    }
}

export default PrivacyPolicy
