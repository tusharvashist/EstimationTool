import React, { useState,useEffect } from 'react'
import ClientForm from "./ClientForm";
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography, Button } from '@material-ui/core';
import useTable from '../../components/useTable';

import Controls from '../../components/controls/Controls';

import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import Header from "../../components/Header"
import CreateClientDialog from './CreateClientDialog';
import * as clientService from '../../services/clientService';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    pageContent: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        width: '100%',
    },
    searchInput: {
        width: '50%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const activeStatus = [
    { id: '0', label: 'All' },
    { id: '1', label: 'Active' },
    { id: '2', label: 'Deactive' },

  ];
 
const clientListData = [
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
    { client_id: '1', name: 'Phase1', description: "description", website: 'www.google.com', isActive: 'true'},
]

const headCells = [
    { id: '1', label: 'Client Name' },
    { id: '2', label: 'Client Description' },
    { id: '3', label: 'Client Website' },
    { id: '4', label: 'Actions', disableSorting: true }
]

export default function Clients() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = React.useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,setTblData
    } = useTable(records, headCells, filterFn);

 
  
    useEffect(()=>{
        if(records && records.length == 0){
        getClient()
        }
    },[records])

    const getClient = () => {
         axios.get('http://localhost:3000/client')
        .then(res => {
            setRecords(res.data.data)
            setTblData(res.data.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const addClient = (client) => {
        axios.post('http://localhost:3000/client/',client)
       .then(res => {
           console.log(res)
       })
       .catch(err =>{
           console.log(err)
       })
   }

   const updateClient = (client) => {
    axios.put('http://localhost:3000/client/'+client._id,client)
    .then(res => {
       console.log(res)
    })
     .catch(err =>{
         console.log(err)
    })
    }

const deleteClient = (_id) => {
    axios.delete('http://localhost:3000/client/'+_id)
   .then(res => {
       console.log(res)
   })
   .catch(err =>{
       console.log(err)
   })
    }

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (client, resetForm) => {
        if (client.id == 0)
           addClient(client);
        else
           updateClient(client);
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getClient()
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
         setRecordForEdit(item)
         setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteClient(id)
        getClient()
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }




    return (
        <>
            
            <Paper className={classes.pageContent}>
            <PageHeader
                title="Clients"
            />
            
                <Toolbar>                
                   <Controls.Input
                        label="Search Client"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Create Client"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                       
                         onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    >
                    </Controls.Button>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {records && records.length > 0 ?
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.website}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item); console.log("edit clicked") }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item._id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        : "Loading..."}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Add Client"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ClientForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
