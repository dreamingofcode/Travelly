import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(4),
    marginRight: "4rem",
    width: 265,
  },
}));

export default function DateForm(props) {
  const classes = useStyles();
const {setNewUserData,newUserData,userData}=props
  return (
    <form className="dateForm" noValidate>
        
      <TextField
        id="date"
        type="date"
        name="DOB"
        className="date"
        defaultValue={userData.DOB}
        onChange={(event)=>setNewUserData({...newUserData, DOB:event.target.value})}
        // onSubmit={props.handleAge()}
        // defaultValue={props.values.birthDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}