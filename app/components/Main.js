var React = require("react");
var AddNavBar = require("./children/AddNavBar.js");

var Main = React.createClass(
{
    render: function()
    {
        return (
            <div className="block">
                <AddNavBar />
                <div className="content">
                    {this.props.children}
                </div>
            </div>
       );
    }
});

module.exports = Main;