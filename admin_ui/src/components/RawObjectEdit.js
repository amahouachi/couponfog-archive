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
import Grid from "@material-ui/core/Grid";

export default function RawObjectEdit({open, object, onClose, onSave, onChange, name}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange= event => {
    onChange(JSON.parse(event.target.value));
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
          <TextField multiline rows={10} style={{minWidth: 500}}  margin="dense" id={name} label={name} fullWidth value={JSON.stringify(object)}  onChange={handleChange}/>
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
