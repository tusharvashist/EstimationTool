import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import './breadcrum.css';
function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function Breadcrum() {
    return (
      <Grid container  alignItems="center"  className="breadcrumb-wrp">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-item">
            <Link color="inherit" href="/" onClick={handleClick}>
            <HomeIcon className="item-icon"/>
            Home
            </Link>
          </Breadcrumbs>
      </Grid>
      );
}
