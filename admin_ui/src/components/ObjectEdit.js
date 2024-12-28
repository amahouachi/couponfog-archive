import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import {format} from 'date-fns';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const discountTypes= ["code","percentOff","dollarOff","freeShipping","freeGift"];

export default function ObjectEdit({open, object, onClose, onSave, onChange, fields}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange= field => event => {
    onChange(field, event.target.value);
  };
  const handleSave = (event) => {
    onSave();
  };

  const handleClose = () => {
    onClose();
  };

  return (
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle>object</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {
              fields.map(field => {
                return (
                    <Grid item xs={12}>
                      <TextField multiline margin="dense" id={field} label={field} fullWidth value={object[field]}  onChange={handleChange(field)}/>
                    </Grid>

                )
              })
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant={"contained"}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}
