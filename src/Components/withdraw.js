import React from "react";
import Card from "./context";
import UserContext from "./context";

export default function Withdraw(){
  const [show, setShow]             = React.useState(true);
  const [status, setStatus]         = React.useState('');
  const [withdrawAmt, setWithdrawAmt] = React.useState('');
  const ctx = React.useContext(UserContext); 

  //always use the last user in the users object 
  let userID = ctx.data.users.length - 1;

  function validate(field){
        if(withdrawAmt.trim() === '' || isNaN(withdrawAmt)) {
          setStatus('Please enter a numeric value to make a withdraw');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        if(withdrawAmt > ctx.data.users[userID].balance){
          setStatus('You do not have those funds available to withdraw. Please withdraw less.');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
      }

  function handleDeposit(){
    //if it isn't a valid withdraw amount
    if (!validate(withdrawAmt))     return;

    //Update the user's balance for the (how it is coded now is LAST user added)'s balance
    ctx.updateUser({...ctx.data, users: ctx.data.users.map(
      (user, i) => i == userID ? {...user, balance: parseFloat(ctx.data.users[userID].balance) - parseFloat(withdrawAmt)}
      : user)
    });
    setShow(false);
  }    

  function clearForm(){
    setWithdrawAmt('');
    setShow(true);
  }

  function SubmitButton () {
 
    if (withdrawAmt){
      return <button type="submit" className="btn btn-light" onClick={handleDeposit}>Process Withdraw</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleDeposit}>Process Withdraw</button>
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
      header="Make a Withdraw"
      status={status}
      body={show ? (  
              <>
              Withdraw Amount<br/>
              <input type="input" className="form-control" id="name" placeholder="Amount to Withdraw" value={withdrawAmt} onChange={e => setWithdrawAmt(e.currentTarget.value)} /><br/>
              <ShowBalance/>
              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Make Another Withdraw</button>
              <ShowBalance/>
              </>
            )}
    />
  )
};