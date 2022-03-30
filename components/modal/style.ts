import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  content: {
    minWidth: '490px'
  },
  itemWrapper: {
    width: '100%',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid #f0f0f0'
  },
  progress: {
    marginRight: "8px",
    color: 'white'
  },
}));