import React,{useState, useEffect} from 'react';
import ClientSer from './client-details.service';
import {Box, Grid} from '@material-ui/core';
import ProjectView from '../project/projects';
import { useLocation } from 'react-router-dom';
import './client-details.css';
import Dropdown from "../../shared/ui-view/dropdown/dropdown";

export default function ClientDetails() {
    const location = useLocation();
    const [clientDetails,setClientDetails] = useState({
        clientName:"",
        description:"",
        website:""
    });  
    const [clients,setClients] = useState([{clientName: "BioIQ"}]);
    

    useEffect(() => {
        getAllClient()
        getClientById()
      },[]);

    const getClientById = ()=>{
        // const clientId = location.pathname.split("/")[2];
        ClientSer.getClientById().then((res)=>{
            let dataResponce = res.data.body;
            setClientDetails({...dataResponce})
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }

      const getAllClient = ()=>{
        ClientSer.getAllClient().then((res)=>{
            let dataResponce = res.data.body;
            setClients(dataResponce)
        }).catch((err)=>{
          console.log("get Client by id error",err)
        })
      }  
 
    const getDropDownvalue = (event)=>{
        console.log("this is an selected value", event)
        setClientDetails({clientName: event.target.clientName,
            website: event.target.website,
            description: ""});
            console.log("name"+event.target.value.clientName + "website " + event.target.value.website )

      }

      
    return (
        <div className="client-deatils-wrp">                 
            <Box  p={5}>
               <Grid container alignItems="center">
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={5} sm={1}>
                                 <p><span className="title-stl"> Client Name : </span>{clientDetails.clientName}</p>
                                 {/* <Dropdown title="Client Name" list={clientList.clientName} getVal={getDropDownvalue}/> */}
                                 </Grid>
                                 <Grid item xs={5} sm={5}>  
                                <select value={clientDetails.clientName} onChange={getDropDownvalue}>
                                    {
                                        clients.map(item =>(
                                            <option key={item.clientName}
                                                    value={item.website}>
                                                    {item.clientName}
                                            </option>
                                        ))
                                    }
                                </select>
                              
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                 <p><span className="title-stl"> Client Website :</span> <a target="_blank" href={clientDetails.website}>{clientDetails.website}</a> </p>
                            </Grid>
                        </Grid>

               </Grid>
               
            </Box>
            <Box p={3} pt={0}>
               <ProjectView/>
            </Box>
        </div>
    )
}
