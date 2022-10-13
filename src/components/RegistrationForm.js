import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { port } from '../config';

function RegistrationForm({ modalIsOpen, setIsOpen }) {
    const [emailAvailable, setEmailAvailable] = useState(true);
    
    const SignUpSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Email is required")
            /*.test('Unique Email', 'Email already in use',
                function (value) {
                    return new Promise((resolve, reject) => {
                        axios.get(`${port}/users/available/${value}`)
                            .then((response) => {
                                resolve(response.data);
                            });
                    })
                }
            )*/,

        username: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Username is required"),

        password: Yup.string()
            .matches(/\d+/, {message: "Digits only"})
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum"),

        confirmPassword: Yup.string()
            .required()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const initialValues = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    async function onFormSubmit(values, { setSubmitting, resetForm }) {
        setSubmitting(true);
        const response = await axios.post(`${port}/users/add`,
            values
        );
        if (Object.keys(response.data).length > 0) {
            console.log(response.data);
            setIsOpen(false);
            resetForm();
        } else {
            setEmailAvailable(false);
        }
        setSubmitting(false);
    }

    return (
        <Formik
            onSubmit={onFormSubmit}
            initialValues={initialValues}
            validationSchema={SignUpSchema}
        >
            {(formik) => {
                const { values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    dirty } = formik;
                return (
                    <FormikForm onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Field
                                className="form-control"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={(e) => {
                                    setEmailAvailable(true);
                                    return handleChange(e);
                                }}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email &&
                                <ErrorMessage name="email" component='div' className='alert alert-danger mt-2' />
                            }
                            {!emailAvailable &&
                                <div className='alert alert-danger mt-2'>Email already in use</div>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Field
                                className="form-control"
                                name="username"
                                type="text"
                                placeholder="Enter name"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username &&
                                <ErrorMessage name="username" component='div' className='alert alert-danger mt-2' />
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Field
                                className="form-control"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password &&
                                <ErrorMessage name="password" component='div' className='alert alert-danger mt-2' />
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Field
                                className="form-control"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirmPassword && touched.confirmPassword &&
                                <ErrorMessage name="confirmPassword" component='div' className='alert alert-danger mt-2' />
                            }
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className={dirty && isValid ? "" : "disabled-btn"}
                            disabled={!(dirty && isValid)}
                        >
                            Submit
                        </Button>
                    </FormikForm>
                );
            }}
        </Formik>
    );
}

export default RegistrationForm;
