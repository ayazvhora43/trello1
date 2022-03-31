import * as React from 'react';
import { connect } from "react-redux";
import CommentEditor from './CommentEditor';

const Commentlists = (props) => {

  const Id = props.id;
  const comments = props.comments;


  return (
    comments.comments.map((obj) => {
      if ((obj.cardId === Id)) {
        let index = comments.comments.indexOf(obj)
        let dateandtime = obj.dateandtime
        return (
          <CommentEditor index={index} dateandtime={dateandtime} replies={obj.replies} comment={obj.comment} id={Id} />
        )
      }
    })
  )
}

const mapStateToProps = state => ({ comments: state.comments });

export default connect(mapStateToProps)(Commentlists)
