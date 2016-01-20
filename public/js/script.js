        /** @jsx React.DOM */


        var Hello = React.createClass({
          render: function(){
            return (
                <div>Ahoj</div>
            );
          }
        });

        var World = React.createClass({
          render: function(){
            return (
                <div>Světe</div>
            );
          }
        });
        
        var All = React.createClass({
          render: function(){
            return (
                <div>
                    <Hello/>
                    <World/>
                </div>
            );
          }
        });
        
        React.renderComponent(
            <All/>, 
            document.getElementById('mount-point')
        );