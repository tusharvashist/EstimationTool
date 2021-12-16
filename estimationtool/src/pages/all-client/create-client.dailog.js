import React from 'react';
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
export default function CreateClientdailog(props) {

    const [formData, setFormData] = React.useState({
        clientName: "",
        description: "",
        website: "",
        isDeleted: false
    });
    const [showError, setShowError] = React.useState(false);

    const handelClientName = (e) => {
        let newObject = { ...formData };
        newObject.clientName = e.target.value
        setFormData({ ...newObject })
    }

    const handelDescription = (e) => {
        let newObject = { ...formData };
        newObject.description = e.target.value
        setFormData({ ...newObject })
    }

    const handelWebsite = (e) => {
        let newObject = { ...formData };
        newObject.website = e.target.value
        setFormData({ ...newObject })
    },
        onSubmitForm = (e) => {
            console.log("e", e)
            //e && e.preventDefault();
            if (formData.clientName && formData.description && formData.website) {
                setShowError(false);
                props.saveFun(formData)

            } else {
                setShowError(true);
            }
        }

    const { clientName, description, website } = formData
    return (
        <CustomizedDialogs data-backdrop="static" data-keyboard="false"

            isOpen={props.isOpen}
            openFun={props.openF}
            closeFun={props.closeF}
            title={props.title}
            oktitle={props.oktitle}
            cancelTitle={props.cancelTitle}
            saveFun={onSubmitForm}
        >
            <Grid container data-backdrop="static" data-keyboard="false">
                <form onSubmit={onSubmitForm}>
                    <TextField required error={showError && !clientName} autoFocus id="standard-basic" label="Client Name" className="full-width" onChange={handelClientName} />
                    <TextField required error={showError && !description} id="standard-basic" label="Client Description" className="full-width" onChange={handelDescription} />
                    <TextField required error={showError && !website} id="standard-basic" label="Website" className="full-width" onChange={handelWebsite} />
                </form>
            </Grid>
        </CustomizedDialogs>
    )
}