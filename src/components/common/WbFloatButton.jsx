import * as React from 'react';
import {Dialog, Fab, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import ReviewsSharpIcon from '@mui/icons-material/ReviewsSharp';
import NorthIcon from '@mui/icons-material/North';
 import commentsApi from '../../services/api/comments/commentsApi'
// import axios from 'axios';
// import EDUIntellApi from '../../services/api/eduIntell/eduIntellAPI'

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  bgcolor: '#007A7A',
  '&:hover': {
    bgcolor: '#45338C',
  },
};

 // Inside the Chatbot component
 const chatbotStyles = {
  chatbot: {
    width: '300px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '0 auto',
    padding: '10px',
  },
  chatbox: {
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    maxHeight: '300px',
    overflowY: 'scroll',
  },
  message: {
    marginBottom: '10px',
  },
  botMessage: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    marginLeft: 'auto',
  },
  userMessage: {
    backgroundColor: '#e0e0e0',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: 'auto',
  },
  input: {
    width: '100%',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


  

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState(''); 
  var messagediv = document.getElementById("messagescontainer");
  var queryInputText = document.getElementById("outlined-adornment-password");
  const handleClose = () => {
    onClose(selectedValue);
  };  

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;   
    // Add the user message to the messages array
    setMessages([...messages, { role: 'user', text: input.trim() }]);  
    messagediv.innerHTML += '<div style="margin-bottom:10px"><div style="background-color: #e0e0e0;padding: 10px 25px 10px 25px;border-radius: 5px;margin-right: auto;width: fit-content;"> '+input.trim()+' </div></div>';   

     try {     
      commentsApi
      .GetRepliesByCommentId(5)
      .then(data => 
      {
        // console.log(data[0].comment);
        // alert(data[0].comment);
        const botResponse = data[0].comment;            
        setMessages([...messages, { role: 'bot', text: botResponse }]);
        messagediv.innerHTML += '<div  style="margin-bottom:10px"><div style="background-color: #007bff;color: white;padding: 10px 25px 10px 25px;border-radius: 5px;margin-left: auto;width: fit-content;"><span> '+botResponse+' </span><span><img width="80px" src="http://localhost:3000/static/media/welbee_logo.a3bc8164e059c98d264caf8e2e16ec02.svg" alt="School Logo"></span></div></div>';     

      })
      .finally()
      //      eduIntellAPI
      //     .GetAIResponse(729,input)
      //     .then(res => {            
      //       const botResponse = res;      
      //       // Add the bot response to the messages array
      //       //setMessages([...messages, { role: 'bot', text: botResponse }]);
      //       userMessage = '<div class="message"><div class="user-message"> '+botResponse+' </div></div>';    
      //       messagediv.innerHTML += userMessage;
      //       // Clear the input field
      //       setInput('');
      // })
      // .catch(err => {})
      // .finally()         
      // const botResponse = "Hi, How are you doing.";            
      // setMessages([...messages, { role: 'bot', text: botResponse }]);
      // messagediv.innerHTML += '<div  style="margin-bottom:10px"><div style="background-color: #007bff;color: white;padding: 10px 25px 10px 25px;border-radius: 5px;margin-left: auto;width: fit-content;"> '+botResponse+' </div></div>';     
      // Clear the input field
      setInput(''); 
      queryInputText.value='';                              
     } catch (error) {
       console.error('Error sending message:', error);
     }
  };

 
  return (
    <Dialog onClose={handleClose} open={open} className="chat-box">
        <div style={{ maxHeight: '85%',overflowY: 'scroll' }} className='messages' id="messagescontainer">
          {/* {messages.map((message, index) => (
            <div key={index} className="message">
              {message.role === 'bot' ? (
                <div className="bot-message">{message.text}</div>
              ) : (
                <div className="user-message">{message.text}</div>
              )}
            </div>
          ))} */}         
        </div>
      <div className="chat-textfield">
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password" >Enter a prompt here</InputLabel>
          <OutlinedInput id="outlined-adornment-password" onChange={handleInputChange}           
            endAdornment={
              <InputAdornment position="end">
                <IconButton className="send-btn" onClick={handleSendMessage}>
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