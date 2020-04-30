import React from 'react';
import './Comment.css';

const Comment = ({name,body}) => {
    return(
      <li>
          <p>
            <b>{name}</b> {body}
          </p>
      </li> 
    );
};

export default Comment;
