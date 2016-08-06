"use strict";

var React = require("react"),
    _     = require("lodash"),
    $     = require("jquery"),
    ReactSocial = require("react-social");

var TwitterButton = ReactSocial.TwitterButton;

var Embed = React.createClass({
  getInitialState: function () {
    return {
      embed: true
    };
  },
  render: function(){
    var url = window.location.toString();
    return (
      <TwitterButton url={url} >
        {" Share " + url}
      </TwitterButton>
    )
  }
});

module.exports = Embed;