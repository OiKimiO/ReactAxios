import React from 'react';
import {Comment} from '../';

import './CommentList.css';

const CommentList = ({comments}) => {
    /*comments에서 가져온 데이터를 map형식으로 담는다. */
    const commentList = comments.map(
      (comment, index) => (
        <Comment 
          name = {comment.email.split('@')[0]}
          body = {comment.body}
          key  = {index}
        />
      )
    )
    return(
        <ul className="CommentList">
          {commentList}
        </ul>
    );
}

export default CommentList;