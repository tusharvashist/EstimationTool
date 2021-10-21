/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Dropdown(props) {
  return (
    <Autocomplete
      size="small"
      id="combo-box-demo"
      options={props.list}
      onChange={(event, value) => { props.getVal(value) }}
      getOptionLabel={(option) => {
        return option.title
      }}
      style={{ width: 300 }}
      defaultValue={props.defaultValue || ''}
      renderInput={(params) => {
        console.log("params", params)
      return <TextField {...params} label={props.title} variant="outlined" />}}
    />
  );
}
