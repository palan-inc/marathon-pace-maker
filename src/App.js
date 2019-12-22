import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';

import './App.css';

const distances = [
  {
    value: 42.195,
    label: 'フルマラソン（42.195km）',
  },
  {
    value: 30,
    label: '30km',
  },
  {
    value: 21.0975,
    label: 'ハーフマラソン（21.0975km）',
  },
  {
    value: 10,
    label: '10km',
  },
  {
    value: 5,
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
  const [values] = React.useState({
    distance: 42.195,
    hour: 4,
    minute: 0,
  });
  const [paces, setPaces] = React.useState({
    paceMinute: 5,
    paceSecond: 41,
  });

  const handleChange = prop => event => {
    values[prop] = Number(event.target.value);
    // 分数を計算
    const minute = (values.hour * 60) + values.minute;
    // 分数を距離で割り、1キロあたりの分数を計算
    const paceMinute = (minute) / values.distance;
    // 分数の少数以下に60をかけ秒数を計算
    const paceSecond = (paceMinute - Math.floor(paceMinute)) * 60
    setPaces({
      ...paces,
      paceMinute: Math.floor(paceMinute),
      paceSecond: Math.floor(paceSecond),
    });
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
          Marathon Pace Maker
          </Typography>
        </Toolbar>
      </AppBar>

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
                inputProps: { min: 0, max: 10 },
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
                inputProps: { min: 0, max: 59 },
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
              margin="normal"
            />
          </div>
        </form>
        <p>
          目標をクリアする為には、1kmあたり <strong>
          {paces.paceMinute}分{paces.paceSecond}秒</strong>
          で走る必要があります。
        </p>
      </Container>
    </div>
  );
}

export default App;
