/** @jsx React.DOM */

class Comment extends React.Component{
    rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },   
  render: function() {
     var divClassName;
     if (this.props.comment.bold == "true"){
         divClassName = "comment " + "selected"; 
     }else{
         divClassName = "comment " + "";  
     };
    
      
    return (
      <div className = {divClassName}>
        <h2 className = "commentAuthor">
            {this.props.comment.author}
        </h2>
        <div className="commentTime">
            {this.props.comment.time}
        </div>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button type="button" onClick={this.props.onDelete.bind(null, this.props.comment.key)}>
            Smaž
        </button>   
        <button type="button" onClick={this.props.onUpdate.bind(null, this.props.comment)}>
            Vybolduj
        </button>  

      </div>
    );
  }
};

