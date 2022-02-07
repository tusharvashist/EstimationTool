import React, { useState, useEffect } from "react";
import ClientSer from "./client-details.service";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ProjectView from "../project/projects";
import { useLocation } from "react-router-dom";
import "./client-details.css";
import { useParams, useHistory } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import Header from "../../shared/layout/Header/Header";

export default function ClientDetails(props) {
  const history = useHistory();
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

  const [projectData, setProjectData] = useState([]);

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
      });
  };

  const getClientById = () => {
    setLoader(true);

    ClientSer.getClientById(clientId)
      .then((res) => {
        setLoader(false);

        let dataResponce = res.data.body;
        setClientDetails({ ...dataResponce });
        setProjectData(dataResponce.projects);
      })
      .catch((err) => {
      });
  };

  const getDropDownvalue = (event) => {

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
  };

  console.log("clients", clients);

  return (
    <div className="client-deatils-wrp">
      <Box>
        <Grid container alignItems="center">
          {loaderComponent ? (
            loaderComponent
          ) : (
            <>
              <Grid container>
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
                          <MenuItem
                            key={item.clientName}
                            value={item.clientName}
                          >
                            {item.clientName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm={12}>
                  <Header
                    iconname="client"
                    title="Client Details"
                    details={[
                      { name: clientUrlName },
                      { website: clientDetails.website },
                    ]}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Box>
        <ProjectView
          data={clientId}
          listData={projectData}
          clientName={clientUrlName}
          clients={clients}
          thisClient={clientDetails}
        />
      </Box>
    </div>
  );
}
