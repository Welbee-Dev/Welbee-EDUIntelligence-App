import * as React from 'react';
// import { useRef } from "react";
import {Dialog, Fab} from '@mui/material';
import ReviewsSharpIcon from '@mui/icons-material/ReviewsSharp';
// import NorthIcon from '@mui/icons-material/North';
//  import commentsApi from '../../services/api/comments/commentsApi'
import '../assets/styles/chatbot.scss'
//import commentsApi from '../../services/api/comments/commentsApi'
// import ReactDOM from 'react-dom';
import $ from 'jquery';
// import axios from 'axios';
//import useCustomerData from '../../hooks/useCustomerData'
import useUserData from '../../hooks/useUserData'
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

var $messages = $('.messages-content'),d, m,i = 0;

function setDate(){
  d = new Date()
  if (m !== d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}


function updateScrollbar() {
  $('.messages-content').scrollDivToElement('.new:last',1000);
}

function insertMessage(selectedSurvey,calltype) {  
  var msg = $('.message-input').val();
  var personaldivID="";
  var divID="";
  //var id="";
  if ($.trim(msg) === '' && calltype !=='Primary') {
    return false;
  }
  if(calltype ==='Primary')
  {    
    msg="";
  }
  personaldivID="counterPersonalDivId"+i;
  $('<div class="message message-personal"  id='+[personaldivID]+'>' + msg + '</div>').appendTo($('.messages-content')).addClass('new');    
  setDate();
  $('.message-input').val("");
  // updateScrollbar();
  if (i !== 0) 
  {       
    updateScrollbar();
  }
  setTimeout(function() {  
    //fakeMessage();      
    //const customer = useCustomerData();
    const user = useUserData();
    EDUIntellApi.GetEDUIntell(selectedSurvey,user.Id,msg,calltype)
      .then(data => 
      {        
        const botResponse = data.response;            
        // if ($('.message-input').val() !== '') {
        //   return false;
        // }
        $('<div class="message loading new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure><span></span></div>').appendTo($('.messages-content'));
        updateScrollbar();
       // $('.messages-content').scrollDivToElement('.new:last',1000);
        setTimeout(function() {
          $('.message.loading').remove();
          divID="counterDivId"+i;
          $('<div class="message new" id='+[divID]+'><figure class="avatar"><img src=' + [welbeeicon] + '/></figure>' + botResponse + '</div>').appendTo($('.messages-content')).addClass('new');
          setDate();          
          updateScrollbar();
          i++;
          // var LLMid="#"+divID;          
          // $('.messages-content').animate({
          //   scrollTop: $(LLMid).offset().top+100
          // }, 1000);
          //$('.messages-content').scrollDivToElement('.new:last');
          //$('.messages-content').scrollDivToElement('.new:last',1000);

        }, 500 + (Math.random() * 20) * 100);
      })
  }, 500 + (Math.random() * 20) * 100);       
  
}


$.fn.scrollDivToElement = function(elem, speed) {
  var $this = $(this);
  var $this_top = $this.offset().top;
  var $this_bottom = $this_top + $this.height();
  var $elem = $(elem);
  var $elem_top = $elem.offset().top;
  var $elem_bottom = $elem_top + $elem.height();

  if ($elem_top > $this_top && $elem_bottom < $this_bottom) {
      // in view so don't do anything
      return;
  }
  var new_scroll_top;
  if ($elem_top < $this_top) {
      new_scroll_top = {scrollTop: ($this.scrollTop() - $this_top + $elem_top)+200};
  } else {
      new_scroll_top = {scrollTop: ($elem_bottom - $this_bottom + $this.scrollTop())+200};
  }
  $this.animate(new_scroll_top, speed === undefined ? 100 : speed);
  return this;
};


function SimpleDialog(props) { 
  const { onClose, selectedValue,selectedSurvey, open } = props;
  //setTimeout(function() {
    //fakeMessage();   
    // EDUIntellApi.GetEDUIntell(selectedSurvey,'','primary')
    //     .then(data => 
    //     {        
    //       const botResponse = data.response;            
    //       if ($('.message-input').val() !== '') {
    //         return false;
    //       }
    //       $('<div class="message loading new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure><span></span></div>').appendTo($('.messages-content'));
    //       updateScrollbar();
    //       setTimeout(function() {
    //         $('.message.loading').remove();
    //         $('<div class="message new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure>' + botResponse + '</div>').appendTo($('.messages-content')).addClass('new');
    //         setDate();
    //         updateScrollbar();
    //         i++;
    //       }, 1000 + (Math.random() * 20) * 100);
    //     })
  //}, 1000); 

  const handleClose = () => {
    onClose(selectedValue);
    $('.message-input').val("");
    i=0;
  };  
  
  const handleSendMessage = async () => {
    insertMessage(selectedSurvey,'Secondary');
  };

  $(window).on('keydown', function(e) {
    if (e.which === 13) {      
      $(".message-submit").trigger("click");
      // insertMessage(selectedSurvey,'Secondary');
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

  // function fakeMessage() {
  //   if ($('.message-input').val() !== '') {
  //     return false;
  //   }
  //   $('<div class="message loading new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure><span></span></div>').appendTo($('.messages-content'));
  //   updateScrollbar();
  //   setTimeout(function() {
  //     $('.message.loading').remove();
  //     $('<div class="message new"><figure class="avatar"><img src=' + [welbeeicon] + '/></figure>' + Fake[i] + '</div>').appendTo($('.messages-content')).addClass('new');
  //     setDate();
  //     updateScrollbar();
  //     i++;
  //   }, 1000 + (Math.random() * 20) * 100);

  // }

  
  return (
    <Dialog onClose={handleClose} open={open} className="chat-box">
       <div className="chat">
        <div className="chat-title">
          <h1>Intelligent Ed</h1>
          <h2>Welbee AI</h2>
          <figure className="avatar">
            <img src={welbeeicon} alt="Welbee"/></figure>
        </div>
        <div className="messages">
          <div className="messages-content"></div>
          {/* <div id="dummy" ></div> */}
        </div>
        <div className="message-box">
          <textarea type="text" className="message-input" placeholder="Type message..."></textarea>
          <button type="submit" className="message-submit" onClick={handleSendMessage} > Send</button>
        </div>
      </div>      
    </Dialog>
  );
}

export default function WbFloatButton({ surveyInfo }) {
  const [open, setOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true);  
    i=0;
    $('.message-input').val("");
    insertMessage(surveyInfo.surveyId,'Primary');
  };

  const handleClose = () => {
    setOpen(false);    
    i=0;
    $('.message-input').val("");
  };


  return (
    <div>
      <Fab aria-label='chatbot' onClick={handleClickOpen} sx={fabStyle}>
        <ReviewsSharpIcon sx={{color: '#fff'}}/>
      </Fab>           
      <SimpleDialog        
        open={open}
        onClose={handleClose}
        selectedSurvey={surveyInfo.surveyId}
      />
    </div>
  );
}