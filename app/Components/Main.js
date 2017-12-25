var React=require("react");

var Search = require("./children/Search");
var Save = require("./children/Save");

var Main=React.createClass({
    getInitialState: function() {
        return { updatingSave:false};
      },
      updateSaved:function(term){
            this.setState({updatingSave:term});
      },
    render:function(){

        return (
        <div className="container">
            <br/>
           <Search updateSaved={this.updateSaved} />
           <Save updateSaved={this.updateSaved}  updatingSave={this.state.updatingSave} />
        </div>

        );
    }
});

module.exports = Main;