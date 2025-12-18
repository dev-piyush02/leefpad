import {useState} from 'react';
import './SignUp.css';
import { signUp } from '../../services/public-services';
import { toast } from 'react-toastify';

const SignUp = () => {
  
  const [userData, setUserData]= useState({
    firstname: '',
    lastname:'',
    userid: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('');

  const handleChange= (event, prop)=>{
    setUserData({...userData, [prop]:event.target.value})
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userData.email || !userData.password || !userData.firstname || !userData.lastname || !userData.userid) {
      setError('No shortcuts! fill all details');
      return;
    }

    signUp(userData).then((resp)=>{
      toast.success("Welcome to our family :)")
    }).catch((error)=>{
      toast.error("Oops something went wrong :(")
    })
    
    // reseting field values 
    setUserData({
      firstname: '',
      lastname:'',
      userid: '',
      email: '',
      password: ''
    });
    setError('');
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label><br />
          <input
            type="text"
            value={userData.firstname}
            onChange={(e) => handleChange(e, 'firstname')}
            placeholder="What should we call you??"
          />
        </div>
        <div>
          <label>Last Name:</label><br />
          <input
            type="text"
            value={userData.lastname}
            onChange={(e) => handleChange(e, 'lastname')}
            placeholder="What's your surname??"
          />
        </div>
		    <div>
          <label>User Name:</label><br />
          <input
            type="text"
            value={userData.userid}
            onChange={(e) => handleChange(e, 'userid')}
            placeholder="How can we uniquely identify you??"
          />
        </div>
		    <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleChange(e, 'email')}
            placeholder="Where can we send blogs??"
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={userData.password}
            onChange={(e) => handleChange(e, 'password')}
            placeholder="Not lookin, I swear!!"
          />
        </div>
        <button type="submit" >SignUp</button>
      </form>
    </div>
  );
};

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
