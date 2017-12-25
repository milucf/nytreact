var React=require("react");

var helpers = require("../utils/helpers");

var Result=React.createClass({
    handleSave: function() {
       helpers.savingArticle(this.props.title,this.props.url,this.props.date).then(function(doc){
            this.props.handleSave();
        }.bind(this));
              },
    render:function(){
        return (
        <div className="row scrub-news">
            <div className="col-sm-10">
                <div>
                <a href={this.props.url} >
                    <span className="glyphicon glyphicon-globe"></span> {this.props.title}
                </a>
                </div>
                <div className="result-date">{this.props.date}</div>
            </div>
            <div className="col-sm-2">
                <button onClick={this.handleSave} type="button" className="btn btn-primary"><span className="glyphicon glyphicon-save"></span> Save</button>
           </div>
       </div>
        );
    }
});

module.exports=Result;