import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {Link} from "react-router-dom";
import {Server} from "./app/Server";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export const STATUS_DRAFT= 0;
export const STATUS_PUBLISHED= 1;
export const STATUS_PUBLISHED_NONAME= 2;
export const STATUS_EXPIRED= 3;
export const STATUS_REMOVED= 4;

const getStatusLabel= (status) => {
  switch (status) {
    case STATUS_DRAFT:
      return "Draft";
    case STATUS_PUBLISHED:
      return "Published";
    case STATUS_PUBLISHED_NONAME:
      return "Published NoName";
    case STATUS_EXPIRED:
      return "Expired";
    case STATUS_REMOVED:
      return "Removed";
    default:
      return "Unknown";
  }
};
export default function Coupons({status}) {

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: false,
        customBodyRender: function(value, tableMeta, updateValue){
          return (
            <Link to={`#${value}`}>#{value}</Link>
          );
        }
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: function(value, tableMeta, updateValue){
          return getStatusLabel(value);
        }
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      }
    },
  ];
  const PAGE_STATUS_NOT_LOADED= 0;
  const PAGE_STATUS_LOADED= 1;
  const PAGE_STATUS_SERVER_ERROR= 2;

  const [coupons, setCoupons]= useState([]);
  const [pageStatus, setPageStatus]= useState(PAGE_STATUS_NOT_LOADED);
  useEffect( () => {
    const fetchCoupons= async () => {
      setPageStatus(PAGE_STATUS_NOT_LOADED);
      try{
        setCoupons(await Server.getCouponsByStatus(status));
        setPageStatus(PAGE_STATUS_LOADED);
      }catch (e) {
        setPageStatus(PAGE_STATUS_SERVER_ERROR);
        console.log(e);
      }
    };
    fetchCoupons();
  }, [status]);
  return (
      status===PAGE_STATUS_NOT_LOADED?
          <CircularProgress/>
          :
          status===PAGE_STATUS_SERVER_ERROR?
              <React.Fragment>
                <h3>Something is wrong with our servers and we are working on fixing it.</h3>
                <h3>Please retry later. Sorry for this inconvenience.</h3>
              </React.Fragment>
              :
              <React.Fragment>
                <div>
                  <Typography variant="h1">Coupons in status {getStatusLabel(status)}</Typography>
                  <MUIDataTable
                      title={"Coupons"}
                      data={coupons}
                      columns={columns}
                  />
                </div>
              </React.Fragment>
  );
}