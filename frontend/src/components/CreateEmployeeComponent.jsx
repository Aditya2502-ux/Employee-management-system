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

    // If there is an 'id' in the URL, it means we are UPDATING an existing employee.
    useEffect(() => {
        if (id) {
            // Fetch the employee's existing data to fill the form.
            EmployeeService.getEmployeeById(id).then((res) => {
                let employee = res.data;
                setFirstName(employee.firstName);
                setLastName(employee.lastName);
                setEmailId(employee.emailId);
            });
        }
    }, [id]); // This runs whenever the 'id' changes.

    // Function that runs when the "Save" button is clicked.
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault(); // Prevents the page from refreshing.
        let employee = { firstName, lastName, emailId }; // Create an object from the form data.

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
