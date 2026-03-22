/**
 * This component is used for both adding a new employee and updating an existing one.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 'id' comes from the URL (e.g., /edit-employee/1)

    // State variables to store the input values from the form.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [salary, setSalary] = useState('');
    const [dob, setDob] = useState('');
    const [location, setLocation] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    // If there is an 'id' in the URL, it means we are UPDATING an existing employee.
    useEffect(() => {
        if (id) {
            // Fetch the employee's existing data to fill the form.
            EmployeeService.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmailId(employee.emailId);
                setSalary(employee.salary || '');
                setDob(employee.dob || '');
                setLocation(employee.location || '');
                setMobileNumber(employee.mobileNumber || '');
            });
        }
    }, [id]); // This runs whenever the 'id' changes.

    // Function that runs when the "Save" button is clicked.
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault(); // Prevents the page from refreshing.
        let employee = { firstName, lastName, emailId, salary, dob, location, mobileNumber }; // Create an object from the form data.

        if (id) {
            // Update existing employee
            EmployeeService.updateEmployee(employee, id).then(res => {
                navigate('/employees'); // Go back to the list page
            });
        } else {
            // Create new employee
            EmployeeService.createEmployee(employee).then(res => {
                navigate('/employees'); // Go back to the list page
            });
        }
    };

    // Go back to the list page without saving.
    const cancel = () => {
        navigate('/employees');
    };

    // Decide which title to show based on whether we are adding or updating.
    const getTitle = () => {
        if (id) {
            return <h3 className="text-center">Update Employee</h3>
        } else {
            return <h3 className="text-center">Add Employee</h3>
        }
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="form-group mb-2">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label> Email Id: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                                </div>
                                <div className="form-group mb-2">
                                    <label> Mobile Number: </label>
                                    <input placeholder="Mobile Number" name="mobileNumber" className="form-control"
                                        value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                                <div className="form-group mb-2">
                                    <label> Location: </label>
                                    <input placeholder="Location" name="location" className="form-control"
                                        value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="form-group mb-2">
                                    <label> Date of Birth: </label>
                                    <input type="date" name="dob" className="form-control"
                                        value={dob} onChange={(e) => setDob(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label> Salary: </label>
                                    <input type="number" placeholder="Salary" name="salary" className="form-control"
                                        value={salary} onChange={(e) => setSalary(e.target.value)} />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeComponent;
