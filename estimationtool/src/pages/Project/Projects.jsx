import React, { useState } from 'react'
import ClientForm from "./ProjectForm";
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../components/useTable';

import Controls from '../../components/controls/Controls';

import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

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

const projectListData = [
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
    { project_id: '1', projectName: 'project name', description: "description"},
]

const headCells = [
    { id: 'name', label: 'Client Name' },
    { id: 'description', label: 'Client Description' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Project() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(projectListData)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
      
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
                title="Projects"
            />
                <Toolbar>
                   
                    <Controls.Button
                        text="Create Project"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.project_id}>
                                    <TableCell>{item.projectName}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
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
