import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';

import './App.css';

const distances = [
  {
    value: '42.195',
    label: 'フルマラソン（42.195km）',
  },
  {
    value: '30',
    label: '30km',
  },
  {
    value: '21.0975',
    label: 'ハーフマラソン（21.0975km）',
  },
  {
    value: '10',
    label: '10km',
  },
  {
    value: '5',
    label: '5km',
  },
];


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  menu: {
    width: 200,
  },
}));


function App() {

  const classes = useStyles();
  const [values, setValues] = React.useState({
    distance: '',
    hour: '',
    minute: '',
  });


  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h2>マラソンペース配分計算</h2>
        <p>何キロまでどのくらいのペースで走ったら良いの？を教えてくれます</p>
        <form>
          <div>
            <TextField
              id="distance"
              select
              label="距離"
              className={classes.textField}
              onChange={handleChange('distance')}
              value={values.distance}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="走るレースの距離を選択してください"
              margin="normal"
            >
              {distances.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="standard-number"
              label="目標タイム（時間）"
              type="number"
              className={classes.numberField}
              onChange={handleChange('hour')}
              value={values.hour}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">h</InputAdornment>,
              }}
              margin="normal"
            />
            <TextField
              id="standard-number"
              label="目標タイム（分）"
              type="number"
              className={classes.numberField}
              value={values.minute}
              onChange={handleChange('minute')}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              margin="normal"
            />
          </div>
        </form>
        <p>目標をクリアする為には、1kmあたり <strong>5分00秒</strong> で走る必要があります。</p>
      </Container>
    </div>
  );
}

export default App;
