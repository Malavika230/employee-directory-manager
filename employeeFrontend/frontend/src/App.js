import './App.css';
import React, { useState, useEffect } from 'react';
import Model from './components/Model'
import EditModel from './components/EditModel'
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import Confirm from './components/Confirm';



function App() {

  const [isopen, setIsopen] = useState(false)
  const [isEditopen, setIsEditopen] = useState(false)
  const [employee, setemployee] = useState([])
  const [addEmployee, setAddEmployee] = useState({
    empid: '',
    name: '',
    role: '',
    location: ''
  });
  const { empid, name, role, location } = addEmployee;
  const [error, setError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [editSubmit, setEditSubmit] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)



  /*input handler*/
  const onInputChange = e => {
    console.log(e.target.value);
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value })
  }
  /* end*/


  /*form handler*/
  const inputFormHandle = e => {
    e.preventDefault();
    setError(validate(addEmployee))
    setIsSubmit(true)
    // console.log(addEmployee)   
  }
  /* end*/


  /*Edit form handler*/
  const editFormHandle = e => {
    e.preventDefault();
    setError(validate(addEmployee))
    setEditSubmit(true)
  }


  /*inputform validation*/
  useEffect(() => {
    console.log(error)
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log(addEmployee)
      addDataToServer(addEmployee)
      setAddEmployee({
        empid: '',
        name: '',
        role: '',
        location: ''
      })
    }
  }, [error, isSubmit]);

  useEffect(() => {
    console.log(error)
    if (Object.keys(error).length === 0 && editSubmit) {
      console.log(addEmployee)
      updateDataToServer(addEmployee)
      setAddEmployee({
        empid: '',
        name: '',
        role: '',
        location: ''
      })
    }
  }, [error, editSubmit]);

  const validate = (values) => {
    const err = {};
    const regex1 = /^[0-9\b]+$/;
    const regex2 = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;

    if (!values.empid) {
      err.empid = 'EmpID is required!'
    }
    else if (!regex1.test(values.empid)) {
      err.name = 'EmpID can only have numbers!'
    }

    if (!values.name) {
      err.name = 'Name is required!'
    }
    else if (!regex2.test(values.name)) {
      err.name = 'Name should not conatin numbers or special characters!'
    }

    if (!values.role) {
      err.role = 'Role is required!'
    }

    if (!values.location) {
      err.location = 'Location is required!'
    }

    return err;
  }
  /*end*/


  /* (POST)add data to the server */
  const addDataToServer = (data) => {
    axios.post("/postemployees", data).then(
      (response) => {
        console.log(response);
        setIsopen(false)
        alert("Employee added sucessfully");
      }, (error) => {
        console.log(error);
        alert("Operation failes");
      }
    );
  }
  /* end */


  /* (POST)update data to the server */
  const updateDataToServer = (data) => {
    axios.post("/postemployees", data).then(
      (response) => {
        console.log(response);
        setIsEditopen(false)
        alert("Employee details updated Successfully");
      }, (error) => {
        console.log(error);
        alert("Operation failes");
      }
    );
  }
  /* end */


  /* (GET)Getting employee list from the api */
  useEffect(() => {
    const getemployee = async () => {
      const res = await fetch("/getemployees", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const getdata = await res.json();
      setemployee(getdata);
      console.log(getdata);
    };
    getemployee();
    setIsSubmit(false)
    setEditSubmit(false)
  }, [isSubmit, editSubmit]);
  /* End*/


  /* Deleting an employee record*/
  const deleteEmployee = (empid) => {
    axios.delete("/deleteemployees/" + empid).then
      ((response) => {
        if (response.data != null) {
          setIsConfirm(false)
        }
      });
    window.location.reload(true);
  }
  /* End*/


  /*Editing employee record*/
  const editEmployee = (id) => {
    setIsEditopen(true)
    setAddEmployee({
      empid: id.empid,
      name: id.name,
      role: id.role,
      location: id.location
    })
  }
  /* End*/

  /* model closing*/
  const newFormClosing = () => {
    setIsopen(false)
    setAddEmployee({
      empid: '',
      name: '',
      role: '',
      location: ''
    })
    setError('')
  }
  const editFormClosing = () => {
    setIsEditopen(false)
    setAddEmployee({
      empid: '',
      name: '',
      role: '',
      location: ''
    })
    setError('')
  }
  /* end*/

  return (
    <div className="App">
      <div className='header'>
        <button className='mainButton' onClick={() => setIsopen(true)}>Create new employee</button>
        {/*New Employee form*/}
        <div className='empForm'>
          <Model open={isopen} onClose={() => newFormClosing()}>
            <h2>New employee details</h2>
            <form onSubmit={e => inputFormHandle(e)}>
              <div className='formGroup'>
                <label>Emp. ID: </label>
                <input type='number' name='empid' placeholder='Enter EmpID' value={empid} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.empid}</p>
              <div className='formGroup'>
                <label>Name: </label>
                <input type='text' name='name' placeholder='Enter Fullname' value={name} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.name}</p>
              <div className='formGroup'>
                <label>Role: </label>
                <input type='text' name='role' placeholder='Enter Role' value={role} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.role}</p>
              <div className='formGroup'>
                <label>Location: </label>
                <input type='text' name='location' placeholder='Enter Location' value={location} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.location}</p>
              <button class="button-1" type='submit'>Add employee</button>
            </form>
          </Model>
        </div>
        {/*New Employee form ends*/}

        {/*Edit Employee form starts*/}
        <div className='empForm'>
          <EditModel open={isEditopen} onClose={() => editFormClosing()}>
            <h2>Update employee details</h2>
            <form onSubmit={e => editFormHandle(e)}>
              <div className='formGroup'>
                <label>Emp. ID: </label>
                <input type='number' name='empid' placeholder='Enter EmpID' value={empid} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.empid}</p>
              <div className='formGroup'>
                <label>Name: </label>
                <input type='text' name='name' placeholder='Enter Fullname' value={name} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.name}</p>
              <div className='formGroup'>
                <label>Role: </label>
                <input type='text' name='role' placeholder='Enter Role' value={role} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.role}</p>
              <div className='formGroup'>
                <label>Location: </label>
                <input type='text' name='location' placeholder='Enter Location' value={location} onChange={(e) => onInputChange(e)} />
              </div>
              <p>{error.location}</p>
              <button class="button-4" type='submit'>Update employee</button>
            </form>
          </EditModel>
        </div>
        {/*Edit Employee form ends*/}

        <h1>Employee Details</h1>
      </div>
      {/* Employee details table */}
      <div>
        <table>
          <thead>
            <tr>
              <th>Emp. ID.</th>
              <th>Name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((getemp) => (
              <><tr key={getemp.empid}>
                <td>{getemp.empid}</td>
                <td>{getemp.name}</td>
                <td>{getemp.role}</td>
                <td>{getemp.location}</td>
                <td><button class="button-2" onClick={() => setIsConfirm(true)}><AiFillDelete /></button>
                  <button class="button-3" onClick={() => editEmployee(getemp)}><AiFillEdit /></button>
                </td>
              </tr>
                <Confirm open={isConfirm} onClose={() => setIsConfirm(false)}>
                  <p className='confirm'>Are you sure you want to delete {getemp.name}'s details</p>
                  <div>
                    <button className='button-5' onClick={() => deleteEmployee(getemp.empid)}>Yes!</button>
                    <button className='button-6' onClick={() => setIsConfirm(false)}>Cancel</button>
                  </div>
                </Confirm></>
            ))}
          </tbody>
        </table>
      </div>
      {/* Employee details table ends */}
    </div>
  );
}

export default App;
