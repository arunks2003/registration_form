import { useState, useEffect } from 'react';
import './App.css';
import PersonDataService from './services/services'

function App() {

  const initialValues = {
    name: "",
    email: "",
    branch: "",
    phnNum: "",
  }

  // const [message, setMessage] = useState({ error: false, msg: "" });
  const [person, setPerson] = useState(
    // name: "",
    // email: "",
    // branch: "",
    // phnNum: "",
    initialValues
  )
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);//just a flag for check submit

  function handleChange(event) {
    // console.log(event.target)
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });//now name takes as a key and value is assigned to a key
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validate(person));
    if (errors) {
      setIsSubmit(true);
      console.log(person);
      try {
        await PersonDataService.addPerson(person);
        alert("New Person added successfully!");
      }
      catch (err) {
        console.error(`Failed to add new person ${err}`);
      }
      setPerson(initialValues);
    }
  }

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(person);
    }
  }, [errors]);

  function validate(values) {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "*Name is required!";
    }
    if (!values.email) {
      errors.email = "*Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "*Email is not in a valid email format!";
    }
    if (!values.branch) {
      errors.branch = "*Branch is required";
    }
    if (!values.phnNum) {
      errors.phnNum = "*Phone Number is required";
    } else if (values.phnNum.length < 10) {
      errors.phnNum = "*Phone Number must be atleast 10 integers";
    }
    return errors;
  }
  return (
    <div className="App">
      <div class="login-box">
        <h2>Registration Form</h2>
        {/* <pre>{JSON.stringify(person, undefined, 2)}</pre> */}
        <form name='myForm' onSubmit={handleSubmit} autoComplete='off'>
          <div class="user-box">
            <input type="text" name="name" required autoComplete='off' value={person.name} onChange={handleChange} />
            <label>Name</label>
            <p className='errormsg'>{errors.name}</p>
          </div>
          <div class="user-box">
            <input type="text" name="email" required autoComplete='off' value={person.email} onChange={handleChange} />
            <label>Email</label>
            <p className='errormsg'>{errors.email}</p>
          </div>
          <div class="user-box">
            <input type="text" name="branch" required autoComplete='off' value={person.branch} onChange={handleChange} />
            <label>Branch</label>
            <p className='errormsg'>{errors.branch}</p>
          </div>
          <div class="user-box">
            <input type="text" name="phnNum" required autoComplete='off' value={person.phnNum} onChange={handleChange} />
            <label>Phone Number</label>
            <p className='errormsg'>{errors.phnNum}</p>
          </div>
          <button type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
