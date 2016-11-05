var React      = require("react");

var ReportFooterTemplate = require("../templates/components/report_footer.jsx");

var ReportFooter = React.createClass({

  onDownload: function () {
    var report = document.querySelector("#main-container > div > div.content > div.content-body > div.report");
    // DOMToImage.toSvg(report, {
    //   "style": {
    //     "font-family": "PT Sans"
    //   }
    // }).then(function (dataUrl) {
    //   var uri = window.location.origin+"/#/download?dataurl="+dataUrl;
    //   var link = document.createElement('a');
    //   link.download = 'my-image-name.jpeg';
    //   link.href = uri;
    //   link.target = "_blank";
    //   link.click();
    //   var win = window.open(uri,"_blank");
    //   win.focus();
    // }).catch(console.error);

    DOMToImage.toBlob(report)
    .then(function(blob){
        var callback = function(blob) {
          var a = document.createElement('a');
          a.download = 'my-image-name.jpeg';
          // the string representation of the object URL will be small enough to workaround the browser's limitations
          a.href = URL.createObjectURL(blob);
          // you must revoke the object URL, 
          //   but since we can't know when the download occured, we have to attach it on the click handler..
          a.onclick = function() {
            // ..and to wait a frame
            requestAnimationFrame(function() {
              URL.revokeObjectURL(a.href);
            });
            a.removeAttribute('href')
          };
          a.click();
        };
        callback(blob);
    })
  },

  render: function () {
    return ReportFooterTemplate(this);
  }
})

module.exports = ReportFooter; 