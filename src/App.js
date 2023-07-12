import { useState } from 'react';
import './App.css';

function App() {

  const [person, setPerson] = useState({
    name: "",
    email: "",
    branch: "",
    phnNum: "",
  })

  function validate() {

  }
  return (
    <div className="App">
      <div class="login-box">
        <h2>Registration Form</h2>
        <form name='myForm' onSubmit={validate()}>
          <div class="user-box">
            <input type="text" name="name" required />
            <label>Name</label>
          </div>
          <div class="user-box">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input type="text" name="branch" required />
            <label>Branch</label>
          </div>
          <div class="user-box">
            <input type="text" name="phnNum" required />
            <label>Phone Number</label>
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
