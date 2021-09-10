import React,{Component, Suspense}from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Close';
import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
} from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme },
);

function RowMenuCell(props) {
  const { api, id } = props;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'edit');
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, 'view');

    const row = api.getRow(id);
    api.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    api.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');

    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{ id, _action: 'delete' }]);
    }
  };

  if (isInEditMode) {
    return (
      <div className={classes.root}>
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          className={classes.textPrimary}
          onClick={handleCancelClick}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={handleEditClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const rows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

const columns = [
  { field: 'name', headerName: 'Estimation Name', width: 190, editable: true },
  { field: 'age', headerName: 'Estimation Description', width: 220, editable: true },
  {
    field: 'dateCreated',
    headerName: 'Estimation Type',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Client Name',
    width: 180,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: RowMenuCell,
    sortable: false,
    width: 100,
    headerAlign: 'center',
    filterable: false,
    align: 'center',
    disableColumnMenu: true,
    disableReorder: true,
  },
];

function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, 'edit');
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, 'name');
    }, 150);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};

export default function Home() {
  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </div>
  );
}

// import Table from '../../shared/ui-view/table/table';
// import HomeService from '../home/home.service';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     {
//       field: 'estimationName',
//       headerName: 'Estimation Name',
//       width: 190,
//       editable: true,
//     },
//     {
//       field: 'estimationDescription',
//       headerName: 'Estimation Description',
//       width: 220,
//       editable: true,
//     },
//     {
//       field: 'estimationType',
//       headerName: 'Estimation Type',
//       width: 180,
//       editable: true,
//     },
//     {
//       field: 'clientName',
//       headerName: 'Client Name',
//       width: 180,
//       editable: true,
//     },
//     {
//       field: 'projectName',
//       headerName: 'Project Name	',
//       width: 170,
//       editable: true,
//     },
//     {
//       field: 'lastUpdateOn',
//       headerName: 'LastUpdate On',
//       width: 150,
//       editable: true,
//     }
//   ];

// export default class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {columanHandel:[], rowDataHandel: [], isShow:false};
//     }
//     componentDidMount() {
//         this.setState({...this.state,
//             columanHandel:columns,
//             rowDataHandel: HomeService.getData(),
//             isShow:true,
//         })
//       }
//     render() {
//         return (
//           <div>
//            <Suspense fallback={<div> Logind .... </div>}>
//               {
//             this.state.isShow ? (<div >  <Table columanData={this.state.columanHandel} rowData={this.state.rowDataHandel} /> </div>) : (<div>Loding...</div>)
//               }
//           </Suspense>
//           </div>
           
//         )
//     }
// }

