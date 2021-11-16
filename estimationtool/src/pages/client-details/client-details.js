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
import useLoader from "../../shared/layout/hooks/useLoader";

export default function ClientDetails(props) {
  const location = useLocation();
  const history = useHistory();
  const [clientStatus, setClientStatus] = useState([
    { title: "All", value: true },
    { title: "Active", value: false },
    { title: "In-Active", value: true },
  ]);
  const [loaderComponent, setLoader] = useLoader();

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
    setLoader(true);

    ClientSer.getAllClient()
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        console.log(dataResponce);
        setClients(dataResponce.filter((op) => op.isDeleted === false));
        setClientId(
          dataResponce.find((x) => x.clientName === clientUrlName).id
        );
      })
      .catch((err) => {
        console.log("get Client by id error", err);
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
      });
  };

  const getClientById = () => {
    // const clientId = location.pathname.split("/")[2];
    setLoader(true);

    ClientSer.getClientById(clientId)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        setClientDetails({ ...dataResponce });
      })
      .catch((err) => {
        console.log("get Client by id error", err);
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
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
  // console.log("clientID", clientId);

  return (
    <div className="client-deatils-wrp">
      <Box>
        <Grid container alignItems="center">
          {loaderComponent ? (
            loaderComponent
          ) : (
            <Grid container justify="space-between" alignItems="center">
              {/* <Grid item xs={5} sm={1}>
              <p>
                <span className="title-stl"> Client Name : </span>
              </p>
            </Grid> */}
              <Grid item xs={5} sm={5}>
                {/* <Box mb={3}>
                <Grid container justify="space-between" alignItems="center">
                  <Dropdown
                    defaultValue={{ title: "Active", value: "active" }}
                    title="client status"
                    list={clientStatus}
                    getVal={getDropDownvalue}
                  />

                </Grid>
              </Box> */}

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
                  <a target="_blank" href={`//${clientDetails.website}`}>
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
          )}
        </Grid>
      </Box>
      <Box>
        <ProjectView
          data={clientId}
          clientName={clientUrlName}
          clients={clients}
          thisClient={clientDetails}
        />
      </Box>
    </div>
  );
}
