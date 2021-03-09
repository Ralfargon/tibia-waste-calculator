import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "center",
    alignContent: "center",
    fontSize: 14,
    fontFamily: "Roboto"
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    alignContent: "center",
    fontFamily: "Roboto"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      textAlign: "center",
      alignContent: "center",
      fontFamily: "Roboto"
    },
  },
}))(TableRow);

function createData(name, waste, valorpg) {
  return { name, waste, valorpg };
}

const rows = [
  createData('EK', 159),
  createData('ED', 237),
  createData('RP', 262),
  createData('MS', 305),
];

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    textAlign: "center",
    alignContent: "center",
    fontFamily: "Roboto"

  },
  title: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    alignContent: "center",
    fontFamily: "Roboto",

  },
  loot: {
    flexGrow: 1,
    marginLeft: 0,
    marginBottom: 5,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  loot2: {
    flexGrow: 1,
    marginBottom: 10,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  botao: {
    flexGrow: 1,
    marginBottom: 100,
    marginLeft: 150,
    textAlign: "center",
    alignContent: "center",
    fontFamily: "Roboto"
  },
  color: {
    backgroundColor: 'lightgray'
  },
  color2: {
    backgroundColor: 'black'
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ waste }) => waste).reduce((sum, i) => sum + i, 0);
}

function subtotalpg(items) {
  return items.map(({ valorpg }) => valorpg).reduce((sum, i) => sum + i, 0);
}

const wasteTotal = subtotal(rows);
const valorpgTotal = subtotalpg(rows);
const totalNames = subtotalpg(rows);  // tem que fazer -> contagem de valores por nome
const difWasteValorTotal = wasteTotal // tem que fazer -> loot(input) MENOS wasteTotal
//prejuizo // tem que fazer -> ((loot(input) MENOS wasteTotal)) DIVIDIDO por totalNomes

// TERCEIRA COLUNA === WASTE MENOS prejuizo

function App() {
  const [EK, setEK] = useState(0);
  const [ED, setED] = useState(0);
  const [RP, setRP] = useState(0);
  const [MS, setMS] = useState(0);
  const [countLoot, setCountLoot] = useState(0);
  const [countPot, setCountPot] = useState(0);
  const classes = useStyles();

  function handleChange(value, name) {
    if (name === "EK") {
      if (value === "" || value === undefined || value === null)
        setEK(0)
      else
        setEK(value)

    } else if (name === "ED") {
      if (value === "" || value === undefined || value === null)
        setED(0)
      else
        setED(value)

    } else if (name === "RP") {
      if (value === "" || value === undefined || value === null)
        setRP(0)
      else
        setRP(value)
    } else if (name === "MS") {
      if (value === "" || value === undefined || value === null)
        setMS(0)
      else
        setMS(value)
    }
  }

  function prejuizo() {
    return (countLoot - subtotal([{ waste: parseInt(EK) }, { waste: parseInt(ED) }, { waste: parseInt(RP) }, { waste: parseInt(MS) }])) / handleCount()
  }

  function handleCount() {
    let count = 0;
    console.log('EK')
    console.log(EK)
    if (EK > 0)
      count++
    if (ED > 0)
      count++
    if (RP > 0)
      count++
    if (MS > 0)
      count++

    return count
  }

  function handlePot(value) {
    console.log({ value });
    setCountPot(value);
  }

  function handleLoot(value) {
    console.log({ value });
    setCountLoot(value);
  }


  return (
    <>
    <Grid container>


      <Grid item xs={12}>
        <AppBar position="static" className={classes.color2}>
          <Typography variant="h6" className={classes.title}>
            Heiisuke - Tibia Waste Calculator
          </Typography>
        </AppBar>
      </Grid>

      </Grid>

      <Grid container spacing={1}>
      <Grid item xs></Grid>
      <Grid item md={6}>
        <div className={classes.loot2}>
          <TextField
            required
            size="small"
            fontFamily="Roboto"
            id="outlined-required"
            label="Loot Total"
            defaultValue=""
            type="number"
            variant="outlined"
            onChange={(event, value) => {
              handleLoot(event.target.value, value);
            }}
          />
        </div>

        <div className={classes.loot2}>
          <TextField
            required
            size="small"
            fontFamily="Roboto"
            id="outlined-required"
            label="Potions do EK para o ED"
            defaultValue="0"
            type="number"
            variant="outlined"
            onChange={(event, value) => {
              handlePot(event.target.value, value);
            }}
          />
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table" padding="none">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Classe</StyledTableCell>
                <StyledTableCell align="center">Waste</StyledTableCell>
                <StyledTableCell align="center">Valor a ser pago</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={classes.loot}>
                      <TextField
                        margin="dense"
                        size="small"
                        type="number"
                        variant="outlined"
                        onChange={(event, value) => {
                          handleChange(event.target.value, row.name);
                        }}
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.name === 'EK' && EK > 0 ? <TableCell align="center" variant="head">{parseInt(EK) + parseInt(prejuizo()) + parseInt(countPot)}</TableCell> : null}
                    {row.name === 'ED' && ED > 0 ? <TableCell align="center" variant="head">{parseInt(ED) + parseInt(prejuizo()) - parseInt(countPot)}</TableCell> : null}
                    {row.name === 'RP' && RP > 0 ? <TableCell align="center" variant="head">{parseInt(RP) + parseInt(prejuizo())}</TableCell> : null}
                    {row.name === 'MS' && MS > 0 ? <TableCell align="center" variant="head">{parseInt(MS) + parseInt(prejuizo())}</TableCell> : null}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.valorpg}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableRow >
              <TableCell colSpan={1} variant="head" align="center">Total</TableCell>
              <TableCell align="center" variant="head">{subtotal([{ waste: parseInt(EK) }, { waste: parseInt(ED) }, { waste: parseInt(RP) }, { waste: parseInt(MS) }])}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={1} variant="head" align="center">(Loot) - (Waste)</TableCell>
              <TableCell align="center" >{countLoot - subtotal([{ waste: parseInt(EK) }, { waste: parseInt(ED) }, { waste: parseInt(RP) }, { waste: parseInt(MS) }])}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={1} variant="head" align="center">(Loot) - (Waste) / Nº de players</TableCell>
              <TableCell align="center">{prejuizo()}</TableCell>

            </TableRow>

          </Table>
        </TableContainer>
        <div>Como utilizar: Colocar o valor do loot total do party analyser. Depois colocar o Supplies de cada um conforme party analyser. A terceira coluna indica o valor a ser pago para cada um.</div>

      </Grid>


      {/* <Grid item xs={12}>
        <Button
          className={classes.botao}
          variant="contained"
          color="primary"
          onClick={(event) => {
            alert(EK)
          }}
        >TESTE
        </Button>
      </Grid> */}
          <Grid item xs></Grid>
    </Grid>

</>
  );
}

export default App;
