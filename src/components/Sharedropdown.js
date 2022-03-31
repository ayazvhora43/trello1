import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { connect } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Sharedropdown(props) {

  const [personName, setPersonName] = React.useState([]);
  const [clicked, setClicked] = React.useState(false);
  const [value, setvalue] = React.useState(false);
  const users = props.users;
  const isauth = props.isauth;
  const arr = [];
  const names1 = [];
  const shared = props.shared;
  const checkednames = []

  shared.shared.map((obj) => {
    if (obj.auth === isauth.email) {
      checkednames.push(...obj.shared)
    } 
  })


  users.users.filter((user) => {
    let obj = {}
    if (!(user.email === isauth.email)) {
      obj.name = user.name
      obj.email = user.email
      arr.push(obj)
    }
  });

  arr.map((obj) => {
    names1.push(obj.name)
  })

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handledispatch = (callbackfn) => {
    const dispatch = props.dispatch;
    dispatch({
      type: "SHARED",
      payload: {
        auth: isauth.email,
        shared: personName
      }
    });
    callbackfn()
  }

  const handlevalue = () => {
    if (value) {
      setvalue(!value)
    }
  }

  const handlerender = (selected) => selected.join(', ')

  return (
    <div>
      <FormControl sx={{ m: 0.5, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Share</InputLabel>
        <Select
          className='Share_box1'
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={checkednames}
          onChange={handleChange}
          input={<OutlinedInput label="Share" />}
          renderValue={handlerender}
          MenuProps={MenuProps}
        >
          {names1.map((name) => (
            <MenuItem onClick={() => {
              setClicked(true)
              setvalue(value => value + 1)
            }} key={name} value={name}>
              <Checkbox checked={checkednames.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          {
            clicked && handledispatch(handlevalue)
          }
        </Select>
      </FormControl>
    </div>
  );
}

const mapStateToProps = state => ({
  board: state.board,
  users: state.users,
  state: state,
  isauth: state.isauth,
  shared: state.shared
});

export default connect(mapStateToProps)(Sharedropdown);
