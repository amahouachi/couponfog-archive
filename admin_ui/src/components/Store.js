import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useParams} from 'react-router-dom';
import {Server} from "../app/Server";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {ListItemText} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import MUIDataTable from 'mui-datatables';
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import BlockIcon from "@material-ui/icons/Block";
import PublishIcon from '@material-ui/icons/Publish';
import CouponEdit from "./CouponEdit";
import OperationStatus from "./OperationStatus";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ObjectEdit from "./ObjectEdit";
import Toolbar from "@material-ui/core/Toolbar";
import RawObjectEdit from "./RawObjectEdit";
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: 15
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sectionName: {
    display: 'inline-flex',
    fontSize: 18,
  },
  sectionHeader: {
    marginBottom: 15
  },
  editSectionIcon: {
    color: '#444'
  },
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
}));
const cloneCoupon= (coupon) => {
  const clonedCoupon= Object.assign({}, coupon);
  clonedCoupon.discount= Object.assign({}, coupon.discount);
  clonedCoupon.withEndDate=clonedCoupon.endDate>0;
  return clonedCoupon;
};
const extensionFields= [
    "autoApplyEnabled","selectorCode","selectorApplyCode","selectorRemoveCode","selectorCheckoutTotal",
    "checkoutAmountBase","methodApplyCode","methodApplyCodeAsUser","waitBeforeCheckSuccess","waitAfterRemoveCode",
    "checkSuccessExpression", "checkoutUrlRegex", "scriptBeforeApplyCode", "selectorSubmitCode"
];
export default function Store() {
  const {id}= useParams();
  const classes= useStyles();
  const [store, setStore] = React.useState(null);
  const [storePropsMode, setStorePropsMode]= useState("view");
  const [selectedCoupon, setSelectedCoupon]= useState(null);
  const [selectedExtension, setSelectedExtension]= useState(null);
  const [storeProperties, setStoreProperties]= useState(null);
  const [storeXref, setStoreXref]= useState(null);
  const [showOperationStatus, setShowOperationStatus]= useState(false);
  const [operationStatus, setOperationStatus]= useState(null);
  const [selectedTab, setSelectedTab] = React.useState(1);

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const startCouponCreation= () => {
    const coupon= {
      id: 0,
      code: '',
      name: '',
      description: '',
      details: '',
      discount: {type: 'code', value: ''},
      type: '',
      startDate: Math.floor(Date.now()/1000),
      endDate: Math.floor(Date.now()/1000)+(24*3600),
      status: 0,
      storeId: store.id,
      storeName: store.name,
      withEndDate: true
    };
    setSelectedCoupon(coupon);
  };
  const publishCoupons= (selectedRows,setSelectedRows,notify) => async(event) => {
    const couponIds= [];
    for(const row of selectedRows.data){
      let coupon= store.coupons[row.dataIndex];
      if(coupon.status===0){
        couponIds.push(coupon.id);
      }
    }
    if(couponIds.length>0){
      try{
        const response= await Server.publishCoupons({id: store.id, name: store.name, slug: store.slug},couponIds, notify);
        if(response.ok){
          setOperationStatus({severity: "success", message: "Successfully published "+couponIds.length+" coupons"});
          setTimeout(()=>{window.location.reload()}, 2000);
        }else{
          setOperationStatus({severity: "error", message: "Failed to publish coupons"});
        }
      }catch (e) {
        setOperationStatus({severity: "error", message: "Failed to contact server"});
      }
      setShowOperationStatus(true);
      setSelectedRows([]);
    }else{
      setOperationStatus({severity: "error", message: "Nothing to publish"});
      setShowOperationStatus(true);
      setSelectedRows([]);
    }
  };

  const CouponsToolbar= () => {
    return (
        <React.Fragment>
          <Tooltip title={"Add coupon"}>
            <IconButton className={classes.iconButton} onClick={startCouponCreation}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
        </React.Fragment>
    );
  };
  const SelectedCouponsToolbar= (selectedRows, displayData, setSelectedRows) => {
    return (
        <div className={classes.iconContainer}>
          <Tooltip title={"Publish and Notify"}>
            <IconButton className={classes.iconButton} onClick={publishCoupons(selectedRows,setSelectedRows,true)}>
              <NotificationsActiveIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Publish silently"}>
            <IconButton className={classes.iconButton} onClick={publishCoupons(selectedRows,setSelectedRows,false)}>
              <PublishIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Delete selected"}>
            <IconButton className={classes.iconButton}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>
    );
  };
  const couponsTable= {
    columns: [
      {name: "id", options: {filter: false, display: false}},
      {name: "name", options: {filter: false}},
      {name: "code", options: {filter: false}},
      "status"
    ],
    options: {
      filterType: 'checkbox',
      download: false,
      print: false,
      responsive: 'scrollMaxHeight',
      customToolbar: CouponsToolbar,
      customToolbarSelect: SelectedCouponsToolbar,
      onRowClick: (_, {dataIndex}) => {
        setSelectedCoupon(cloneCoupon(store.coupons[dataIndex]));
      }
    }
  };
  const getStoreProperties= () => {
    if(store){
      return {
        name: store.name,
        domain: store.domain,
        url: store.url
      }
    }else{
      return {};
    }
  };
  const StoreProps= (mode) => {
    if(!store) return;
    if(mode==="view"){
      return (
          <Grid container>
            <Grid item xs={12}>
              <Toolbar style={{justifyContent: 'flex-end'}}>
                <IconButton  onClick={()=>{setStoreProperties(getStoreProperties())}}>
                  <EditIcon/>
                </IconButton>
                <IconButton title={"Update Cache"}  onClick={()=>{Server.updateCache(store)}}>
                  <CachedIcon/>
                </IconButton>
              </Toolbar>
            </Grid>
            {
              ["id","name","slug","domain","url","description"].map(prop => {
                return (
                    <Grid item xs={12}><ListItemText>{prop} : {store[prop]}</ListItemText></Grid>
                );
              })
            }
          </Grid>
      );
    }else{

    }
  };
  const StoreXref= () => {
    if(store){
      return (
          <Grid container>
            <Grid item xs={12}>
              <Toolbar style={{justifyContent: 'flex-end'}}>
                <IconButton  onClick={()=>{setStoreXref(store.xref)}}>
                  <EditIcon/>
                </IconButton>
              </Toolbar>
            </Grid>
            {
                  Object.keys(store.xref).map(prop => {
                    return (
                        <Grid item xs={12}><ListItemText>{prop} : {store.xref[prop]}</ListItemText></Grid>
                    );
                  })
            }
          </Grid>
      );
    }else{
      return null;
    }
  };
  const StoreExtension= () => {
    if(store){
      let storeExtension= store.extensionSettings;
      if(!storeExtension){
        storeExtension= {};
      }
      return (
          <Grid container>
            <Grid item xs={12}>
              <Toolbar style={{justifyContent: 'flex-end'}}>
                <IconButton  onClick={()=>{setSelectedExtension(storeExtension)}}>
                  <EditIcon/>
                </IconButton>
              </Toolbar>
            </Grid>
            {
              (!store || !store.extensionSettings) ?
                  null
                  :
                  Object.keys(store.extensionSettings).map(prop => {
                    return (
                        <Grid item xs={12}><ListItemText>{prop} : {store.extensionSettings[prop]}</ListItemText></Grid>
                    );
                  })
            }
          </Grid>
      );
    }else{
      return null;
    }
  };
  const handleCloseOperationStatus= () => {
    setShowOperationStatus(false);
    setOperationStatus(null);
  };
  const onCloseXrefEdit= () => {
    setStoreXref(null);
  };
  const onSaveXrefEdit= async () => {
    const xref= storeXref;
    setStoreXref(null);
    try{
      const response= await Server.updateExtension({id: store.id, name: store.name, slug: store.slug},xref);
      if(response.ok){
        setOperationStatus({severity: "success", message: "Success"});
        setTimeout(()=>{window.location.reload()}, 2000);
      }else{
        setOperationStatus({severity: "error", message: "Failed"});
      }
    }catch (e) {
      setOperationStatus({severity: "error", message: "Failed to contact server"});
    }
    setShowOperationStatus(true);
  };
  const onChangeXrefEdit= (xref) => {
    setStoreXref(Object.assign({}, xref));
  };
  const onCloseExtensionEdit= () => {
    setSelectedExtension(null);
  };
  const onSaveExtensionEdit= async () => {
    const extension= selectedExtension;
    setSelectedExtension(null);
    console.log(extension);
    for(const key of ["autoApplyEnabled", "checkoutAmountBase", "waitBeforeCheckSuccess", "waitAfterRemoveCode"]){
      if(extension[key]){
        if(extension[key]!==""){
          extension[key]= parseInt(extension[key]);
        }else{
          delete extension[key];
        }
      }
    }
    try{
      const response= await Server.updateExtension({id: store.id, name: store.name, slug: store.slug},extension);
      if(response.ok){
        setOperationStatus({severity: "success", message: "Success"});
        setTimeout(()=>{window.location.reload()}, 2000);
      }else{
        setOperationStatus({severity: "error", message: "Failed"});
      }
    }catch (e) {
      setOperationStatus({severity: "error", message: "Failed to contact server"});
    }
    setShowOperationStatus(true);
  };
  const onChangeExtensionEdit= (field,value) => {
    selectedExtension[field]= value;
    setSelectedExtension(Object.assign({}, selectedExtension));
  };
  const onClosePropertiesEdit= () => {
    setStoreProperties(null);
  };
  const onSavePropertiesEdit= async () => {
    console.log(storeProperties);
  };
  const onChangePropertiesEdit= (field,value) => {
    storeProperties[field]= value;
    setStoreProperties(Object.assign({}, storeProperties));
  };
  const onCloseCouponEdit= () => {
    setSelectedCoupon(null);
  };
  const onSaveCouponEdit= async () => {
    const coupon= selectedCoupon;
    console.log(coupon);
    setSelectedCoupon(null);
    let operation;
    if(coupon.id>0){
      operation= "update";
    }else{
      operation= "create";
    }
    try{
      if(coupon.type===''){
        if(coupon.code!==''){
          coupon.type= 'code';
        }else{
          coupon.type= 'sale';
        }
      }
      if(coupon.url===''){
        delete coupon.url;
      }
      coupon.manual= 1;
      const response= await Server.postCoupon(coupon);
      if(response.ok){
        setOperationStatus({severity: "success", message: "Successful "+operation});
        setTimeout(()=>{window.location.reload()}, 3000);
      }else{
        setOperationStatus({severity: "error", message: "Failed to "+operation});
      }
    }catch (e) {
      setOperationStatus({severity: "error", message: "Failed to contact server"});
    }
    setShowOperationStatus(true);
  };
  const onChangeCouponEdit= (field,value) => {
    if(field!=="discountType" && field!=="discountValue"){
      selectedCoupon[field]= value;
    }else{
      if(field==="discountType"){
        selectedCoupon.discount.type= value;
      }else{
        selectedCoupon.discount.value= value;
      }
    }
    if(field==='withEndDate'){
      if(selectedCoupon.withEndDate){
        const nowSec= Math.floor(Date.now()/1000);
        if(selectedCoupon.startDate>nowSec){
          selectedCoupon.endDate= selectedCoupon.startDate + (24 * 3600);
        }else{
          selectedCoupon.endDate= nowSec + (24 * 3600);
        }
      }else{
        selectedCoupon.endDate= 0;
      }
    }
    setSelectedCoupon(Object.assign({}, selectedCoupon));
  };

  useEffect(() => {
    async function fetchStore() {
      setStore(await Server.getStore(id));
    }
    fetchStore();
  },[id]);

  return (
      <React.Fragment>
        <Paper square style={{marginBottom: 5}}>
          <Tabs
              value={selectedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
          >
            <Tab label="Properties" />
            <Tab label="Coupons" />
            <Tab label="Extension"/>
            <Tab label="Xref"/>
          </Tabs>
        </Paper>
        <Paper className={classes.section} hidden={selectedTab!==0}>
          <div className={classes.container}>
            <div className={classes.sectionHeader}>
              {StoreProps(storePropsMode)}
              {storeProperties &&
              <ObjectEdit fields={Object.keys(storeProperties)} open={storeProperties != null} object={storeProperties}
                          onClose={onClosePropertiesEdit} onSave={onSavePropertiesEdit}
                          onChange={onChangePropertiesEdit}/>
              }
            </div>
          </div>
        </Paper>
        {
          store?
              <div hidden={selectedTab!==1} >
              <MUIDataTable
                  title={undefined} data={store.coupons} columns={couponsTable.columns} options={couponsTable.options} />
                <CouponEdit open={selectedCoupon!=null} coupon={selectedCoupon} onClose={onCloseCouponEdit} onSave={onSaveCouponEdit} onChange={onChangeCouponEdit}/>
              </div>
              :
              ""
        }
        <Paper className={classes.section} hidden={selectedTab!==2}>
          <div className={classes.container}>
            <div className={classes.sectionHeader}>
              {StoreExtension()}
              {
                selectedExtension!=null?
                    <ObjectEdit fields={extensionFields} open={selectedExtension!=null} object={selectedExtension} onClose={onCloseExtensionEdit} onSave={onSaveExtensionEdit} onChange={onChangeExtensionEdit}/>
                    :
                    null
              }
            </div>
          </div>
        </Paper>
        <Paper className={classes.section} hidden={selectedTab!==3}>
          <div className={classes.container}>
            <div className={classes.sectionHeader}>
              {StoreXref()}
              {
                storeXref!=null?
                    <RawObjectEdit name={'xref'} open={storeXref!=null} object={storeXref} onClose={onCloseXrefEdit} onSave={onSaveXrefEdit} onChange={onChangeXrefEdit}/>
                    :
                    null
              }
            </div>
          </div>
        </Paper>
        {
          showOperationStatus?
              <OperationStatus duration={2} severity={operationStatus.severity} message={operationStatus.message} open={showOperationStatus} onClose={handleCloseOperationStatus}/>
              :
              null
        }
      </React.Fragment>
  );
}