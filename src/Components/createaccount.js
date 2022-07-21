import React from "react";
import Card from "./context";
import UserContext from "./context";

export default function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);   
  
  //always use the last user in the users object 
  let userID = ctx.data.users.length - 1;
  
  function validate(field, label){
      if (!field) {
        setStatus('Please provide your ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else{
        if(password.length < 8){
          setStatus('Passwords must be at least 8 characters long');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
      }
      return true;
  }

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    ctx.data.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  function SubmitButton () {
    if (name || password || email){
      return <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleCreate}>Create Account</button>
    };
  }

  return (
    
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>

              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Your Account has been Successfully created, {ctx.data.users[userID].name}</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
};