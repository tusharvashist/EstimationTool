import React, { useState, useEffect } from "react";
import ClientSer from "./client-details.service";
import {
  //   Box,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ProjectView from "../project/projects";
import { useLocation } from "react-router-dom";
import "./client-details.css";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";
import { useParams, useHistory } from "react-router-dom";
import ProjectServ from "../project/project.service";

export default function ClientDetails(props) {
  const location = useLocation();
  const history = useHistory();

  const params = useParams(),
    { clientName } = params;

  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    description: "",
    website: "",
    id: "",
  });
  const [clients, setClients] = useState([]);
  const [clientUrlName, setClientUrlName] = useState(clientName);
  const [clientId, setClientId] = useState();

  useEffect(() => {
    getAllClient();
    getClientById();
  }, [clientId]);

  const getAllClient = () => {
    ClientSer.getAllClient()
      .then((res) => {
        let dataResponce = res.data.body;
        setClients(dataResponce.filter((op) => op.isDeleted === false));
        setClientId(
          dataResponce.find((x) => x.clientName === clientUrlName).id
        );
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };

  const getClientById = () => {
    // const clientId = location.pathname.split("/")[2];

    ClientSer.getClientById(clientId)
      .then((res) => {
        let dataResponce = res.data.body;
        setClientDetails({ ...dataResponce });
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };

  const getDropDownvalue = (event) => {
    //console.log("this is an selected value", event.target.value);

    const dropdownNameSelected = clients.find(
      (client) => client.clientName === event.target.value
    );

    let cId = dropdownNameSelected.id; //object
    const obj = clients.find((op) => op.id === cId);
    setClientDetails({
      clientName: obj.clientName,
      website: obj.website,
      description: obj.description,
    });
    history.push(`/All-Clients/${obj.clientName}`);
    setClientUrlName(obj.clientName);
    setClientId(cId);
    // history.replace({ pathname: cId });
  };

  console.log("clients", clients);
  console.log("clientID", clientId);

  return (
    <div className="client-deatils-wrp">
      <Box p={5}>
        <Grid container alignItems="center">
          <Grid container justify="space-between" alignItems="center">
            {/* <Grid item xs={5} sm={1}>
              <p>
                <span className="title-stl"> Client Name : </span>
              </p>
            </Grid> */}
            <Grid item xs={5} sm={5}>
              <Box sx={{ maxWidth: 200 }}>
                <FormControl width="300px">
                  <InputLabel id="client-simple-select">
                    Client Name{" "}
                  </InputLabel>

                  <Select
                    labelId="client-simple-select"
                    id="client-simple-select"
                    value={clientUrlName}
                    label={clientUrlName}
                    onChange={getDropDownvalue}
                  >
                    {clients.map((item) => (
                      <MenuItem key={item.clientName} value={item.clientName}>
                        {item.clientName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={10} sm={6}>
              <p>
                <span className="title-stl"> Client Website :</span>{" "}
                <a target="_blank" href={clientDetails.website}>
                  {clientDetails.website}
                </a>{" "}
              </p>
            </Grid>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className="block-section"
            >
              <p>
                <span className="section-title"></span>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box p={3} pt={0}>
        <ProjectView
          data={clientId}
          clientName={clientUrlName}
          clients={clients}
        />
      </Box>
    </div>
  );
}
