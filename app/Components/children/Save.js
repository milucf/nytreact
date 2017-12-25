var React=require("react");

var helpers = require("../utils/helpers");

var Save=React.createClass({
    getInitialState: function() {
        return {saveList:[]};
      },

      handleRemove:function(event){
        helpers.deleteArticle(event.target.value).then(function(data){
            this.props.updateSaved(true);
        }.bind(this))
    },

      buildList:function(docs){
        var savedArticles=[];
        for(var i=0;i<docs.data.length;i++){
            savedArticles.push(<div className="row scrub-news" key={i}>
                                   <div className="col-sm-10">
                                         <div>
                                           <a href={docs.data[i].url} >
                                            <span className="glyphicon glyphicon-floppy-saved"></span> {docs.data[i].title}
                                           </a>
                                         </div>
                                         <div className="result-date">{docs.data[i].date}</div>
                                   </div>
                                   <div className="col-sm-2">
                                         <button value={docs.data[i]._id} type="button"  onClick={this.handleRemove}  className="btn btn-danger">
                                             X Remove
                                         </button>
                                   </div>
                               </div>);                               
        }
        return savedArticles;
      },

      componentDidMount:function(){
        helpers.getSavedArticles().then(function(docs){
            this.setState({saveList:this.buildList(docs)});
        }.bind(this));
      },

    componentDidUpdate:function(prevProps,prevState){
        if(this.props.updatingSave) {
            console.log("update");
            this.props.updateSaved(false);
            helpers.getSavedArticles().then(function(docs){   
                this.setState({saveList:this.buildList(docs)});
            }.bind(this));
        }
    },


    render:function(){
        return (
            <div className="panel panel-success">
              <div className="panel-heading"><h4><span className="glyphicon glyphicon-floppy-disk"></span> Saved Articles</h4></div>
               <div className="panel-body">{this.state.saveList}</div>
          </div>

        );
    }
});

module.exports = Save;