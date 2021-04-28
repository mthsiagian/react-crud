import React from "react";
import { withStyles, TextField, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Styles from "../style/styles";
import { useSelector } from "react-redux";

const CreateData = props => {
  const addUserReducer = useSelector(state => state.addUserReducer)
  
  const {
    handleChange,
    addData,
    classes,
    isEditing
  } = props;

  return (
    <div className={classes.formWrapper}>
      <form onSubmit={addData}>
        <TextField
          id="name-id"
          name="firstName"
          label="First Name"
          onChange={handleChange}
          value={addUserReducer.firstName}
          fullWidth
          required
        />
        <TextField
          id="lastname-id"
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          value={addUserReducer.lastName}
          fullWidth
          required
        />
        <TextField
          id="age-id"
          name="age"
          label="Age"
          onChange={handleChange}
          value={addUserReducer.age}
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0, max: 1000 } }}
          required
        />
        <TextField
          id="Avatar-id"
          name="photo"
          label="Avatar"
          onChange={handleChange}
          value={addUserReducer.photo}
          fullWidth
        />
        {isEditing ? (
          <Button
            type="submit"
            variant="outlined"
            className={classes.button}
            onClick={addData}
            fullWidth
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            className={classes.button}
            fullWidth
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

CreateData.propTypes = {
  classes: PropTypes.object.isRequired,
  addData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(Styles)(CreateData);
