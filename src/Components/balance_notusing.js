function Balance(){
  const ctx = React.useContext(UserContext); 

  //always use the last user in the users object 
  let userID = ctx.data.users.length - 1;

  return(
      <Card
      txtcolor="black"
      header="Current Balance"
      title="is"
      text=""
      body={ctx.data.users[userID].balance}
    />      
  );  
}

export default Balance;