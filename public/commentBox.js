/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var Comment = require('comment.js');

var FilterBox = React.createClass({
   render: function(){
           return (
               <div className="filterBox">
                    <button type="button" onClick={this.props.onFilter.bind(null, "az")}>
                        A → Z
                    </button>
                    <button type="button" onClick={this.props.onFilter.bind(null, "za")}>
                        Z → A
                    </button>
                    <button type="button" onClick={this.props.onFilter.bind(null, "default")}>
                        Výchozí řazení
                    </button>
               </div>  
           )
        }  
});

var CommentList = React.createClass({
  render: function() {
      var url = this.props.url;
      var deleteComment = this.props.onDelete;
      var updateComment = this.props.onUpdate;
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment onDelete={deleteComment} onUpdate={updateComment} comment={comment} >
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
       
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        var time = new Date().toLocaleTimeString('en-US');
        if (!text || !author) {
            return;
        };
        this.props.onCommentSubmit({author: author, text: text, time: time});
        this.setState({author: '', 
                       text: ''
                      });
    },
    render: function() {
        return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
          </form>
        );
    }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(this.state.sort);
        if (this.state.sort == "az"){
                data.sort(function(a, b) {
                return (a.author.toLowerCase().localeCompare(b.author.toLowerCase()));
            });
            console.log(data);
        }else if (this.state.sort == "za"){
                data.sort(function(a, b) {
                return (b.author.toLowerCase().localeCompare(a.author.toLowerCase()));
            });
        };
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    
  handleCommentDelete: function(id) {
     $.ajax({
      url: this.props.url + "/" + id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    
  handleCommentUpdate: function(comment) {

     if (comment.bold == "false"){
         comment.bold = "true";
         
     }else{
         comment.bold = "false"; 
     };
     $.ajax({
      url: this.props.url + "/" + comment.id,
      dataType: 'json',
      type: 'PUT',
      data: comment,
      success: function(data) {  
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    
    filterList: function(order) {
        this.state.sort = order;
        this.loadCommentsFromServer();
        console.log(order);
    },
    
    handleCommentSubmit: function(comment) {
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    
  getInitialState: function() {
    return {data: [], sort: "default"};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },   
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <FilterBox onFilter={this.filterList} />
                <CommentList onUpdate={this.handleCommentUpdate} onDelete={this.handleCommentDelete} data={this.state.data} url={this.props.url}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

setInterval(function() {
    React.renderComponent(
      <CommentBox url="/api/comments" date={new Date()} pollInterval={2000}/>,
      document.getElementById('mount-point')
    );
}, 500);

