import React, { useState } from 'react'
import EmployeeForm from "./EstimationForm";
import PageHeader from '../../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, TextField, Typography } from '@material-ui/core';
import useTable from '../../components/useTable';

import Controls from '../../components/controls/Controls';

import { Label, Search } from "@material-ui/icons";
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


const headCells = [
    { id: 'fullName', label: 'Estimation Name' },
    { id: 'description', label: 'Description' },
    { id: 'type', label: 'Type' },
    { id: 'clientName', label: 'Client Name' },
    { id: 'projectName', label: 'Project Name' },
    { id: 'lastModified', label: 'Last modified' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]


const recentEstimationData = [
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
    { estimation_id: '1', estimationName: 'Phase1', estimationDesc: "description", estimationType: 'ROM', clientName: 'BioIQ', projectName: 'BioIQ Project1', lastUpdated: '15 Aug 2021 04:55PM' },
]

export default function RecentEstimation() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(recentEstimationData)
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
        //if (employee.id == 0)
            //employeeService.insertEmployee(employee)
        //else
            //employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
       // setRecords(employeeService.getAllEmployees())
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
        //employeeService.deleteEmployee(id);
        //setRecords(employeeService.getAllEmployees())
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
                title="Dashboard"
            />
            <div  style={{  width:'100%', marginLeft: '25px', marginBottom: '5px'
                }}>
            <Typography
                        variant="h6" >
                        {"Recent Estimation"}
                    </Typography>
                    </div>
              
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.estimationName}</TableCell>
                                    <TableCell>{item.estimationDesc}</TableCell>
                                    <TableCell>{item.estimationType}</TableCell>
                                    <TableCell>{item.clientName}</TableCell>
                                    <TableCell>{item.projectName}</TableCell>
                                    <TableCell>{item.lastUpdated}</TableCell>

                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        {/* <Controls.ActionButton
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
                                        </Controls.ActionButton> */}
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Estimation"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
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
