import React,{useState, useEffect} from 'react';
import ClientSer from './client-details.service';
import {Box, Grid} from '@material-ui/core';
import ProjectView from '../project/projects';
import { useLocation } from 'react-router-dom';
import './client-details.css';
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import { useParams } from 'react-router-dom';

export default function ClientDetails() {
    const location = useLocation();
    const { clientid } = useParams();

    const [clientDetails,setClientDetails] = useState({
        clientName:"",
        description:"",
        website:"",
        id:""
    });  
    const [clients,setClients] = useState([]);
 
    console.log("location *****"+ clientid);
    useEffect(() => {
        getAllClient()
        getClientById()
      },[]);

    const getClientById = ()=>{
        // const clientId = location.pathname.split("/")[2];
        ClientSer.getClientById(clientid).then((res)=>{
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
        //console.log("this is an selected value", event)
        let obj = JSON.parse(event.target.value); //object
        setClientDetails({clientName: obj.clientName,
            website: obj.website,
            description: ""});
            console.log("name"+obj.clientName + "website " + obj.website )
           
      }

    return (
        <div className="client-deatils-wrp">                 
            <Box  p={5}>
               <Grid container alignItems="center">
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={5} sm={1}>
                                 <p><span className="title-stl"> Client Name : </span></p>
                                 </Grid>
                                 <Grid item xs={5} sm={5}>  
                                <select  onChange={getDropDownvalue}>
                                    {
                                        clients.map(item =>(
                                            
                                            <option key={item.clientName}
                                                    value={JSON.stringify(item)}>
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
               <ProjectView data={clientid}/>
            </Box>
        </div>
    )
}
