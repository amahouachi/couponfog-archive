import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Switch from "@material-ui/core/Switch";
import {PushService} from "../app/PushService";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progressBar: {
    color: '#00838f'
  },
  error: {
    color: 'red'
  }
}));

export default function ToggleNotificationPopup({show, onClose}) {
  const theme = useTheme();
  const classes= useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [notificationEnabled, setNotificationEnabled] = React.useState(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_ENABLED);
  const [enablingNotification, setEnablingNotification]= useState(false);
  const [error, setError]= useState(null);

  const onChangeNotificationStatus= event => {
    if(!notificationEnabled){
      setEnablingNotification(true);
      PushService.enableNotification(
          () => {
            setNotificationEnabled(true);
            setError(null);
            setEnablingNotification(false);
          },
          () => {
            setNotificationEnabled(false);
            setError("An Error occured. Please retry later.");
            setEnablingNotification(false);
          }
      )
    }else{
      console.log("Disabling notifications");
      PushService.disableNotification(
          () => {
            setNotificationEnabled(false);
            setError(null);
            setEnablingNotification(false);
          },
          () => {
            setNotificationEnabled(true);
            setError("An Error occured. Please retry later.");
            setEnablingNotification(false);
          }
      );
    }
  };
  const getNotificationDialogContentText= () => {
    if(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_NOT_SUPPORTED){
      return "Notifications are not supported in this browser";
    }else if(PushService.notificationStatus===PushService.NOTIFICATION_STATUS_DENIED){
      return (
          <React.Fragment>
            You have previously denied us permission to send you notifications in this browser. You need to manually whitelist us
            so that we can enable notifications. This manual action depends on the browser and the platform.
            <br/>
            <Link component={"a"} href='https://pushassist.com/knowledgebase/how-to-enable-or-disable-push-notifications-on-chrome-firefox-safari-b/'>See here for help</Link>
          </React.Fragment>
      );

    }else{
      return "When you enable notifications, you will receive alerts in this browser when new coupons are available for your favorite stores";

    }
  };
  if(notificationEnabled && PushService.notificationStatus!==PushService.NOTIFICATION_STATUS_ENABLED){
    setNotificationEnabled(false);
  }else if(!notificationEnabled && PushService.notificationStatus===PushService.NOTIFICATION_STATUS_ENABLED){
    setNotificationEnabled(true);
  }
  return (
      <React.Fragment>
        <Dialog
            fullScreen={fullScreen}
            open={show}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Notifications</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {getNotificationDialogContentText()}
            </DialogContentText>
            <DialogContentText className={classes.error}>
              {error?error:""}
            </DialogContentText>
            {
              enablingNotification?
                <CircularProgress size={24} color={"secondary"}/>
                :
                  <FormControlLabel
                      control={
                        <Switch
                            checked={notificationEnabled}
                            onChange={onChangeNotificationStatus}
                            disabled={PushService.isNotificationDisabled()}
                            value="notifications"
                            color="secondary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                      label="Enable notifications"
                  />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{setError(null);onClose()}} color="default" variant={"outlined"} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
  );
}