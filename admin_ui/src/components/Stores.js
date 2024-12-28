import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {Server} from "../app/Server";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {Link, Route, useHistory} from "react-router-dom";
import Store from "./Store";

const getStatusLabel= (status) => {
  if(status===0){
    return "Disabled";
  }else if(status===1){
    return "Enabled";
  }
  return "Unknown";
};
export default function Stores() {

  const history= useHistory();
  const tableOptions= {
    download: false,
    print: false,
    responsive: 'scrollMaxHeight',
    onRowClick: (_, {dataIndex}) => {
      history.push('/stores/'+stores[dataIndex].id);
    }
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
/*
        customBodyRender: (value, tableMeta) => {
          return (
              <Link to={`/stores/${value}`}>{value}</Link>
          )
        }
*/
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "hasDraftCoupons",
      label: "Has Draft Coupons",
      options: {
        filter: true,
        sort: false,
        display: false,
        customFilterListOptions: { render: v => `Has Draft Coupons: ${v}` },
      }
    },
    {
      name: "hasPublishedCoupons",
      label: "Has Published Coupons",
      options: {
        filter: true,
        sort: false,
        display: false,
        customFilterListOptions: { render: v => `Has Published Coupons: ${v}` },
      }
    },
    {
      name: "hasPublishedNoNameCoupons",
      label: "Has Published NoName Coupons",
      options: {
        filter: true,
        sort: false,
        display: false,
        customFilterListOptions: { render: v => `Has PNN Coupons: ${v}` },
      }
    },
    {
      name: "hasExtensionSettings",
      label: "Has Extension Settings",
      options: {
        filter: true,
        sort: false,
        display: false,
        customFilterListOptions: { render: v => `Has Extension: ${v}` },
      }
    },
  ];
  const PAGE_STATUS_NOT_LOADED= 0;
  const PAGE_STATUS_LOADED= 1;
  const PAGE_STATUS_SERVER_ERROR= 2;

  const [stores, setStores]= useState([]);
  const [pageStatus, setPageStatus]= useState(PAGE_STATUS_NOT_LOADED);

  useEffect( () => {
    const fetchStores= async () => {
      setPageStatus(PAGE_STATUS_NOT_LOADED);
      try{
        const objects= await Server.getStores();
        setStores(objects.map(store => {
          return {
            id: store.id,
            name: store.name,
            hasDraftCoupons: store.draftCoupons>0?"Yes":"No",
            hasPublishedCoupons: store.publishedCoupons>0?"Yes":"No",
            hasPublishedNoNameCoupons: store.publishedNoNameCoupons>0?"Yes":"No",
            hasExtensionSettings: store.hasExtensionSettings?"Yes":"No"
          }
        }));
        setPageStatus(PAGE_STATUS_LOADED);
      }catch (e) {
        setPageStatus(PAGE_STATUS_SERVER_ERROR);
        console.log(e);
      }
    };
    fetchStores();
  }, []);
  return (
      pageStatus===PAGE_STATUS_NOT_LOADED?
          <CircularProgress/>
          :
          pageStatus===PAGE_STATUS_SERVER_ERROR?
              <React.Fragment>
                <h3>Server error</h3>
              </React.Fragment>
              :
              <React.Fragment>
                <div>
                    <MUIDataTable
                        title={"Stores"}
                        data={stores}
                        columns={columns}
                        options={tableOptions}
                    />
                </div>
              </React.Fragment>
  );
}
