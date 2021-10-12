import React,{useState, useEffect} from 'react';
import ClientSer from './client-details.service';
import {Box, Grid} from '@material-ui/core';
import ProjectView from '../project/projects';
import { useLocation } from 'react-router-dom';
import './client-details.css';

export default function ClientDetails() {
    const location = useLocation();
    const [clientDetails,setclientDetails] = useState({
        clientName:"",
        description:"",
        website:""
    });  
    useEffect(() => {
        getClientById()
      },[]);

    const getClientById = ()=>{
        // const clientId = location.pathname.split("/")[2];
        ClientSer.getClientById().then((res)=>{
            let dataResponce = res.data.body;
            setclientDetails({...dataResponce})
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }
 
    const [clientStatus,setClientStatus] = useState([
        { title: 'All'},
        { title: 'Active'},
        { title: 'In-Active'},
    ]);
    const getDropDownvalue = (val)=>{
        console.log("this is an download vlaue", val)
      }

    return (
        <div className="client-deatils-wrp">                 
            <Box  p={3}>
               <Grid container alignItems="center">
                        <Grid container justify="space-between" alignItems="center">
                            <p><span className="title-stl"> Client Name : </span>{clientDetails.clientName}</p>
                            <p><span className="title-stl"> Website :</span> <a target="_blank" href={clientDetails.website}>{clientDetails.website}</a> </p>
                        </Grid>

                    <Grid container justify="space-between" alignItems="center">
                        <p> <span className="title-stl">Description :</span> {clientDetails.description}</p> 
                    </Grid>
               </Grid>
                <hr/>
            </Box>
            <Box p={3} pt={0}>
               <ProjectView/>
            </Box>
        </div>
    )
}
