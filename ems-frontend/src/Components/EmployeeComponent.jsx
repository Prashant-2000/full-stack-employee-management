import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    //state variables
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    //useParams
    const {id} = useParams();


    //useState variables to initialize state variables that will hold validation errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })


    //useNavigate
    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])


    //1way
    function handleFirstName(e) {
        setFirstName(e.target.value)
    }

    //2way
    const handleLastName = (e) => setLastName(e.target.value);


    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        //if validateForm true then execute
        if (validateForm()) {
            const employee = { firstName, lastName, email }
            console.log(employee)

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        //here i used spread operator
        const errorCopy = { ...errors }

        //for firstName
        if (firstName.trim()) {
            errorCopy.firstName = '';
        }
        else {
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        //for lastName
        if (lastName.trim()) {
            errorCopy.lastName = '';
        }
        else {
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }

        //for email
        if (email.trim()) {
            errorCopy.email = '';
        }
        else {
            errorCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    // Note -> JavaScript code should be written in {Curly Braces}
    
    return (
        <div className='container'>
            <br /> <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {/* <h2 className="text-center">Add Employee</h2> */}
                    {
                        pageTitle()       //added page title dynamically based on employee id
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className='form-label'>First Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}        //is-invalid and invalid-feedback is css property
                                    onChange={handleFirstName}
                                ></input>
                                {/* //error message */}
                                {errors.firstName && <span className='invalid-feedback'>{errors.firstName}</span>}
                            </div>

                            <div className="form-group mb-2">
                                <label className='form-label'>Last Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                ></input>
                                {/* //error message */}
                                {errors.lastName && <span className='invalid-feedback'>{errors.lastName}</span>}
                            </div>

                            <div className="form-group mb-2">
                                <label className='form-label'>First Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}       //3way
                                ></input>
                                {/* //error message */}
                                {errors.email && <span className='invalid-feedback'>{errors.email}</span>}
                            </div>

                            {/* //submit button */}
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent