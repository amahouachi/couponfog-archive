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

const discountTypes= ["deal","percentOff","dollarOff","freeShipping","freeGift","freeTrial","priceFrom","rebate"];
const couponTypes= ["code","sale","in-store","deal"];

export default function CouponEdit({open, coupon, onClose, onSave, onChange}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let startDate;
  let endDate;
  if(coupon){
    startDate= format(new Date(coupon.startDate*1000), 'MM/dd/yyyy');
    if(coupon.endDate===0){
      endDate= "01/01/2038";
    }else{
      endDate= format(new Date(coupon.endDate*1000), 'MM/dd/yyyy');
    }
  }
  const handleChange= field => event => {
    let value;
    if(field==="startDate" || field==="endDate"){
      value= Math.floor(event.getTime()/1000);
    }else if(field==='withEndDate') {
      value= event.target.checked;
    }else{
      value= event.target.value;
    }
    onChange(field, value);
  };
  const handleSave = (event) => {
    onSave();
  };

  const handleClose = () => {
    onClose();
  };

  return (
      open?
          <Dialog fullScreen={fullScreen} open onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">coupon #{coupon.id}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoFocus margin="dense" id="name" label="Name" fullWidth value={coupon.name}  onChange={handleChange("name")}/>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth style={{marginTop: 7}}>
                    <InputLabel>Coupon Type</InputLabel>
                    <Select
                        value={coupon.type}
                        onChange={handleChange("type")}
                    >
                      {
                        couponTypes.map(dt => {
                          return (
                              <MenuItem value={dt}>{dt}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField margin="dense" id="code" label="Code" value={coupon.code} onChange={handleChange("code")}/>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth style={{marginTop: 7}}>
                    <InputLabel>Discount Type</InputLabel>
                    <Select
                        value={coupon.discount.type}
                        onChange={handleChange("discountType")}
                    >
                      {
                        discountTypes.map(dt => {
                          return (
                              <MenuItem value={dt}>{dt}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth margin="dense" id="discountValue" label="Discount Value" value={coupon.discount.value}  onChange={handleChange("discountValue")}/>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                      control={
                        <Switch checked={coupon.withEndDate} onChange={handleChange('withEndDate')} value="withEndDate" />
                      }
                      label="With End Date"
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Start Date"
                        value={startDate}
                        onChange={handleChange("startDate")}
                        autoOk
                        onChange={handleChange("startDate")}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="End Date"
                        autoOk
                        value={endDate}
                        onChange={handleChange("endDate")}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField multiline rowsMax={3} margin="dense" id="description" label="Description" value={coupon.description} fullWidth  onChange={handleChange("description")}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField multiline rowsMax={3} margin="dense" id="details" label="Details" value={coupon.details} fullWidth  onChange={handleChange("details")}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField multiline rowsMax={3} margin="dense" id="url" label="Url" value={coupon.url} fullWidth  onChange={handleChange("url")}/>
                </Grid>
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
          :
          null
  );
}
