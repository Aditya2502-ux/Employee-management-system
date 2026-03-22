/**
 * This component displays a list of all employees in a table.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {
    // 'employees' is where we store the list we get from the backend.
    // 'setEmployees' is the function we use to update that list.
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate(); // This helps us switch between pages (like going to 'Add Employee' page)

    // useEffect is a hook that runs automatically when the component loads.
    useEffect(() => {
        // Fetch all employees from the backend when the page opens.
        EmployeeService.getEmployees().then((res) => {
            setEmployees(res.data); // Update our 'employees' state with the data from the backend.
        });
    }, []); // The empty brackets [] mean this only runs ONCE when the component starts.

    // Function to navigate to the 'Add Employee' page.
    const addEmployee = () => {
        navigate('/add-employee');
    };

    // Function to navigate to the 'Edit Employee' page with a specific ID.
    const editEmployee = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    // Function to delete an employee.
    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(res => {
            // After deleting from the backend, update our local 'employees' list
            // by filtering out the one we just deleted.
            setEmployees(employees.filter(employee => employee.id !== id));
        });
    };

    return (
        <div>
            <h2 className="text-center mt-4">Employees List</h2>
            <div className="row">
                <button className="btn btn-primary w-auto mb-3" onClick={addEmployee}> Add Employee</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Email Address</th>
                            <th> Mobile</th>
                            <th> Location</th>
                            <th> DOB</th>
                            <th> Salary</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // This maps over our 'employees' array and creates a table row for each one.
                            employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td> {employee.firstName} </td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td> {employee.mobileNumber}</td>
                                        <td> {employee.location}</td>
                                        <td> {employee.dob}</td>
                                        <td> {employee.salary}</td>
                                        <td>
                                            <button onClick={() => editEmployee(employee.id)} className="btn btn-info">Update </button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListEmployeeComponent;
