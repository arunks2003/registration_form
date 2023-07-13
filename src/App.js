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
  let isError = 0;

  function handleChange(event) {
    // console.log(event.target)
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });//now name takes as a key and value is assigned to a key
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
    else if (values.name.length < 2) {
      errors.name = "* Name should have more than one character";
    }
    if (!values.email) {
      errors.email = "*Email is required!";
      isError = 1;
    } else if (!regex.test(values.email)) {
      errors.email = "*Email is not in a valid email format!";
      isError = 1;
    }
    if (!values.branch) {
      errors.branch = "*Branch is required";
    }
    if (!values.phnNum) {
      errors.phnNum = "*Phone Number is required";
    } else if (values.phnNum.length < 10) {
      errors.phnNum = "*Phone Number must be atleast 10 integers";
      isError = 1;
    }
    else if (isNaN(values.phnNum)) {
      errors.phnNum = "*Only Numbers for Phone Num.";
      isError = 1;
    }
    return errors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    validate(person);
    setErrors(validate(person));
    setIsSubmit(true);
    console.log(person);
    if (isError === 1) {
      alert('Oops! there was an error');
      return;
    }
    try {
      await PersonDataService.addPerson(person);
      setPerson(initialValues);
      alert("New Person added successfully!");
    }
    catch (err) {
      console.error(`Failed to add new person ${err}`);
    }

  }
  return (
    <div className="App">
      <div class="login-box">
        <h2>Registration Form</h2>
        {/* <pre>{JSON.stringify(person, undefined, 2)}</pre> */}
        <form name='myForm' onSubmit={handleSubmit} autoComplete='off'>
          <div class="user-box">
            <input type="text" name="name" required autoComplete='off' value={person.name} onChange={handleChange} />
            <label>Name  <span className='errormsg'> {errors.name}</span></label>
            {/* <p className='errormsg'>{errors.name}</p> */}
          </div>
          <div class="user-box">
            <input type="text" name="email" required autoComplete='off' value={person.email} onChange={handleChange} />
            <label>Email  <span className='errormsg'> {errors.email}</span></label>
          </div>
          <div class="user-box">
            <input type="text" name="branch" required autoComplete='off' value={person.branch} onChange={handleChange} />
            <label>Branch  <span className='errormsg'> {errors.branch}</span></label>
            {/* <p className='errormsg'>{errors.branch}</p> */}
          </div>
          <div class="user-box">
            <input type="text" name="phnNum" required autoComplete='off' value={person.phnNum} onChange={handleChange} />
            <label>Phone Number  <span className='errormsg'> {errors.phnNum}</span></label>
            {/* <p className='errormsg'>{errors.phnNum}</p> */}
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
