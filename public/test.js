/** @jsx React.DOM */

var Hello = React.createClass({
  render: function() {
    return <div>Ahoj, <input type="text" placeholder="Napiš jméno" />,
        je {this.props.date.toLocaleTimeString('cs-CZ')} hodin.</div>;
  }
});

setInterval(function() {
  React.renderComponent(
    <Hello date={new Date()} />,
    document.getElementById('mount-point')
  );
}, 500);