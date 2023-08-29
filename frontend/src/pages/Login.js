import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row as ReactstrapRow } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import { Row, Col as ReactstrapCol, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import userContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {
    const userContxtData = useContext(userContext);
    const navigate = useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event, field) => {
        let actualValue = event.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        });
    };

    const handleReset = () => {
        setLoginDetail({
            username: '',
            password: ''
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail);

        // validation
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("Username or Password is required !!");
            return;
        }

        // submit the data to server to generate token
        loginUser(loginDetail).then((data) => {
            console.log("user login: ");
            console.log(data);

            // save the data to local storage
            doLogin(data, () => {

                console.log("Login detail is saved to local storage");
                     userContxtData.setUser({
                                 data: data.user,
                                    login: true
                                                     });
                // redirect to user dashboard page
                navigate("/user/dashboard");
            });

            toast.success("Login success");
        }).catch(error => {
            console.log(error);
            if (error.response.status === 400 || error.response.status === 404) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong on the server !!");
            }
        });
    };

    return (
        <Base>
            <Container>
                <ReactstrapRow className="mt-4">
                    <ReactstrapCol sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Login Here !!</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleFormSubmit}>
                                    {/* Email field */}
                                    <FormGroup>
                                        <Label for="email">
                                            Enter Email
                                        </Label>
                                        <Input
                                            type="text"
                                            id="email"
                                            value={loginDetail.username}
                                            onChange={(e) => handleChange(e, 'username')}
                                        />
                                    </FormGroup>
                                    {/* Email password */}
                                    <FormGroup>
                                        <Label for="password">
                                            Enter password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Container className="text-center">
                                            <Button color="light" outline>Login</Button>
                                            <Button onClick={handleReset} className="ms-2" outline color="secondary">Reset</Button>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </ReactstrapCol>
                </ReactstrapRow>
            </Container>
        </Base>
    );
};

export default Login;