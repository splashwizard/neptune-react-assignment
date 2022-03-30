import { makeStyles, withStyles } from "@material-ui/styles";
import {
  InputBase,
  Button as CoreButton
} from '@material-ui/core';

export default makeStyles(theme => ({
  body: {
    backgroundColor: '#000000',
    height: '100vh',
  },
  container: {
    padding: "64px 0",
    color: 'white',
  },
  header: {
    marginBottom: "64px",
    textAlign: "center"
  },
  cardHeader: {
    marginBottom: "32px",
    '& h4': {
      fontWeight: 'bold'
    }
  },
  cardContent: {
    padding: "48px",
  },
  cardBody: {
  },
  swapWrapper: {
    padding: '16px 0',
    textAlign: "center",
    '& svg': {
      fontSize: '36px',
      color: '#888888'
    }
  },
  btnWrapper: {
    paddingTop: '32px',
    textAlign: "center",
    '& svg': {
      fontWeight: 'bold'
    }
  }
}));

export const TextInput = withStyles((theme) => ({
  root: {
    width: '100%',
    border: '2px solid #cccccc',
    borderRadius: '5px',
    padding: '4px 8px',
    marginTop: '4px',
    '&:hover': {
      outline: 'none',
    },
  },
}))(InputBase);

export const Button = withStyles((theme) => ({
  root: {
    textTransform: 'none!important'
  },
}))(CoreButton);