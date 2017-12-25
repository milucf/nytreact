var React=require("react");

var Result=require("./Result")

var helpers = require("../utils/helpers");

var Search=React.createClass({
    getInitialState: function() {
        return { topic: "", startYear: "" ,endYear:"",results:[]};
      },

    handleChange: function(event) {
        switch(event.target.id){
            case "topic" : this.setState({topic:event.target.value}); break;
            case "syear" : this.setState({startYear:event.target.value}); break;
            case "eyear" : this.setState({endYear:event.target.value}); break;
        }
      },

      handleSearch: function() {
        helpers.search(this.state.topic,this.state.startYear,this.state.endYear).then(function(data) {
              var resultDocs=[];
              for( var i=0;i<data.length;i++){
                  resultDocs.push(<Result handleSave={this.handleSave} title={data[i].title} url={data[i].url} date={data[i].date}  key={i}/>);

                this.setState({results:resultDocs});
              }
            
          }.bind(this));
      },

      handleSave:function(){
        $("#myModal").modal();
        this.props.updateSaved(true);
      },

    render:function(){
        return (
         <div>

          <div className="panel panel-info">
            <div className="panel-heading"><h4><span className="glyphicon glyphicon-search"></span>Search</h4></div>
            <div className="panel-body">
              <div className="form-group text-center">
                <label htmlFor="topic" >Topic:</label>
                 <input type="text" className="form-control" onChange={this.handleChange} id="topic" />
              </div>

              <div className="form-group text-center">
                 <label htmlFor="syear" >Start Year:</label>
                 <input type="text" className="form-control" onChange={this.handleChange} id="syear" />
              </div>

              <div className="form-group text-center">
                 <label htmlFor="eyear">End Year:</label>
                 <input type="text" className="form-control" onChange={this.handleChange} id="eyear" />
              </div>

                  <div className="text-center">
                      <button type="button" onClick={this.handleSearch} className="btn btn-search"><span className="glyphicon glyphicon-search"></span>search</button>
                  </div>
              </div>
           </div>


            <div className="panel panel-default">
              <div className="panel-heading"><h4><span className="glyphicon glyphicon-list"></span> Result</h4></div>
               <div className="panel-body">
                   {this.state.results}
               </div>
           </div> 

           <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <p>Article Successfully Saved!
                    <button type="button" className="close pull-right" data-dismiss="modal">&times;</button>
                    </p>
                  </div>
                </div>      
              </div>
            </div> 

        </div>

        );
    }
});

module.exports = Search;