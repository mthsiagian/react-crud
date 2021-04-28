import React from "react";
import PropTypes from "prop-types";
import Styles from "../style/styles";
import { Delete, Edit } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import {
  withStyles,
  GridList,
  GridListTile,
  ListSubheader,
  GridListTileBar,
  makeStyles
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
}));


const DataLists = props => {
  const { lists, removeData, handleUpdate } = props;
  const style = useStyles();

  const handleAvatar = (avatarUrl) => {
    return avatarUrl.match(/([a-z\-_0-9/:.]*\.(jpg|jpeg|png|gif))/i) ?
    avatarUrl :  "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png";
  }
  return (
    <div className={style.root}>
    <GridList cellHeight={250}>
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        <ListSubheader component="div">Contacts</ListSubheader>
      </GridListTile>
      {lists.map((tile) => (
        <GridListTile key={tile.id}>
          <img src={handleAvatar(tile.photo)} alt={tile.firstName}/>
          <GridListTileBar
            title={tile.firstName + " " + tile.lastName}
            subtitle={<span>Age: {tile.age} years </span>}
            actionIcon={
              <>
                <IconButton
                  aria-label="Update"
                  className={style.icon}
                  onClick={e => handleUpdate(e, tile.id)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  className={style.icon}
                  onClick={() => removeData(tile.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
  );
};

DataLists.propTypes = {
  removeData: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired
};

export default withStyles(Styles)(DataLists);
