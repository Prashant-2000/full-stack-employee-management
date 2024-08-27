import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

/*  const dummyData = [
    {
        "id": 1,
        "firstName": "Tony",
        "lastName": "Stark",
        "email": "tony@example.com"
    },
    {
        "id": 2,
        "firstName": "Steve",
        "lastName": "Jobs",
        "email": "steve@example.com"
    },
    {
        "id": 3,
        "firstName": "Rohit",
        "lastName": "Mehra",
        "email": "rohit@example.com"
    },
  ]  
*/

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
       getAllEmployees();

    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data)
        }).catch(error => {
            console.error(error)
            // handle error here, perhaps show an alert to the user
        })
    }

    //add new employee
    function addNewEmployee(){
        //when user will click on the addNewEmployee button then it'll navigate to /add-employee page
        navigator('/add-employee')
    }

    //update employee
    function updateEmployee(id){
        //when user will click on the update button then it'll navigate to /edit-employee/${id} page
        navigator(`/edit-employee/${id}`)
    }

    //deleteEmployee
    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

  return (

    <div className='container'>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    // dummyData.map(employee => 
                    // here employee state variable holds response of the REST API    
                    employees.map(employee =>      
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft: '10px'}}
                                    >Delete</button>
                            </td>
                        </tr>
                    )
                }
                <tr>

                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent