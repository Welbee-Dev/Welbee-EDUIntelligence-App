import * as React from 'react';
import {Dialog, Fab, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import ReviewsSharpIcon from '@mui/icons-material/ReviewsSharp';
import NorthIcon from '@mui/icons-material/North';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  bgcolor: '#007A7A',
  '&:hover': {
    bgcolor: '#45338C',
  },
};

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };  

  return (
    <Dialog onClose={handleClose} open={open} className="chat-box">
      <div className="chat-textfield">
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Enter a prompt here</InputLabel>
          <OutlinedInput id="outlined-adornment-password"            
            endAdornment={
              <InputAdornment position="end">
                <IconButton className="send-btn">
                  <NorthIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Enter a prompt here"
          />
        </FormControl>
      </div>
    </Dialog>
  );
}

export default function WbFloatButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab aria-label='chatbot' onClick={handleClickOpen} sx={fabStyle}>
        <ReviewsSharpIcon sx={{color: '#fff'}}/>
      </Fab>           
      <SimpleDialog        
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}