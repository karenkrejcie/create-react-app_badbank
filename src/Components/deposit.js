import React from "react";
import Card from "./context";
import UserContext from "./context";

export default function Deposit(){
  const [show, setShow]             = React.useState(true);
  const [status, setStatus]         = React.useState('');
  const [depositAmt, setDepositAmt] = React.useState('');
  const ctx = React.useContext(UserContext); 

  //always use the last user in the users object 
  let userID = ctx.data.users.length - 1;

  function validate(field){
        if(depositAmt.trim() === '' || isNaN(depositAmt)) {
          setStatus('Please enter a numeric value to make a deposit');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
      }

  function handleDeposit(){
    //if it isn't a valid deposit amount
    if (!validate(depositAmt))     return;

    //Update the user's balance for the (how it is coded now is LAST user added)'s balance
    ctx.updateUser({...ctx.data, users: ctx.data.users.map(
      (user, i) => i == userID ? {...user, balance: parseFloat(depositAmt) + parseFloat(ctx.data.users[userID].balance)}
      : user)
    });
    setShow(false);
  }    

  function clearForm(){
    setDepositAmt('');
    setShow(true);
  }

  function SubmitButton () {
 
    if (depositAmt){
      return <button type="submit" className="btn btn-light" onClick={handleDeposit}>Process Deposit</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleDeposit}>Process Deposit</button>
    };
  }

  function ShowBalance () {
    return <><p className="balanceInfo center"><Card
    bgcolor="danger"
    header="Current Available Balance"
    status=""
    body={<>$<button type="button" className="btn btn-info balanceInfo">{JSON.stringify(ctx.data.users[userID].balance)}</button></>}
    /></p></>
  }

  return (
    
    <Card
      bgcolor="primary"
      header="Make a Deposit"
      status={status}
      body={show ? (  
              <>
              Deposit Amount<br/>
              <input type="input" className="form-control" id="name" placeholder="Amount to Deposit" value={depositAmt} onChange={e => setDepositAmt(e.currentTarget.value)} /><br/>
              <ShowBalance/>
              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Deposit</button>
              <ShowBalance/>
              </>
            )}
    />
  )
};