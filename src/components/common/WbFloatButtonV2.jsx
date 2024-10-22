import * as React from 'react';
import {Dialog, Fab, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import ReviewsSharpIcon from '@mui/icons-material/ReviewsSharp';
// import NorthIcon from '@mui/icons-material/North';
//  import commentsApi from '../../services/api/comments/commentsApi'
import '../assets/styles/chatbot.scss'
//import commentsApi from '../../services/api/comments/commentsApi'
// import ReactDOM from 'react-dom';
import $ from 'jquery';
// import axios from 'axios';
 import EDUIntellApi from '../../services/api/eduIntell/eduIntellAPI'
 import {welbeeicon} from '../assets/images/index'

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
  // const [messages, setMessages] = React.useState([]);
  // const [input, setInput] = React.useState(''); 
  // var messagediv = document.getElementById("messagescontainer");
  // var queryInputText = document.getElementById("outlined-adornment-password");
  setTimeout(function() {
    fakeMessage();   
  }, 100); 
  const handleClose = () => {
    onClose(selectedValue);
  };  

var $messages = $('.messages-content'),d, h, m,i = 0;

// $(window).on('load', function() { 
//   //$messages.mCustomScrollbar();
//   setTimeout(function() {
//     fakeMessage();
//   }, 100); 
// });

function updateScrollbar() {
  // $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
  //   scrollInertia: 10,
  //   timeout: 0
  // });
}

function setDate(){
  d = new Date()
  if (m !== d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  var msg = $('.message-input').val();
  if ($.trim(msg) === '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    //fakeMessage();    
    EDUIntellApi.GetEDUIntell(5,msg)
      .then(data => 
      {
        //  console.log(data);
        //  alert(data.response);
        const botResponse = data.response;            
        if ($('.message-input').val() !== '') {
          return false;
        }
        $('<div class="message loading new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure><span></span></div>').appendTo($('.messages-content'));
        updateScrollbar();
        setTimeout(function() {
          $('.message.loading').remove();
          $('<div class="message new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure>' + botResponse + '</div>').appendTo($('.messages-content')).addClass('new');
          setDate();
          updateScrollbar();
          i++;
        }, 1000 + (Math.random() * 20) * 100);
      })
  }, 500 + (Math.random() * 20) * 100);
}

const handleSendMessage = async () => {
  insertMessage();
};

$(window).on('keydown', function(e) {
  if (e.which === 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, How may I Assist you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() !== '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure><span></span></div>').appendTo($('.messages-content'));
  updateScrollbar();
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure>' + Fake[i] + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}
  return (
    <Dialog onClose={handleClose} open={open} className="chat-box">
       <div className="chat">
        <div className="chat-title">
          <h1>Insights ChatBot</h1>
          <h2>Welbee AI</h2>
          <figure className="avatar">
            <img src={welbeeicon} alt="Welbee"/></figure>
        </div>
        <div className="messages">
          <div className="messages-content"></div>
        </div>
        <div className="message-box">
          <textarea type="text" className="message-input" placeholder="Type message..."></textarea>
          <button type="submit" className="message-submit" onClick={handleSendMessage} > Send</button>
        </div>
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