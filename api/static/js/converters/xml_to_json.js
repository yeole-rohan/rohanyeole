var $ = jQuery.noConflict();
$(document).ready(function () {
  // Initialize CodeMirror for XML input
  var xmlEditor = CodeMirror.fromTextArea(document.getElementById("xmlInput"), {
    lineNumbers: true,
    mode: "xml",
    theme: "dracula",
    matchBrackets: true,
    autoCloseTags: true
  });

  // Initialize CodeMirror for JSON output (set mode to JavaScript for JSON highlighting)
  var jsonEditor = CodeMirror.fromTextArea(document.getElementById("jsonOutput"), {
    lineNumbers: true,
    mode: "javascript",  // Using JavaScript mode for JSON formatting
    theme: "dracula",
    readOnly: true,  // Set to read-only since it's the output area
    matchBrackets: true, // Enable bracket matching
    autoCloseBrackets: true, // Auto-close brackets when typing
    indentUnit: 2, // Indentation level for nested structures
    tabSize: 2, // Tab size for indentation
    styleActiveLine: true, // Highlight the active line
    lineWrapping: true // Allow long lines to wrap
  });

  // Function to convert XML to JSON
  function xmlToJson(xml) {
    var obj = {};

    // If it's an element node
    if (xml.nodeType === 1) { // Element
      // If it has attributes, add them to the JSON object
      if (xml.attributes.length > 0) {
        obj["attributes"] = {};
        for (var i = 0; i < xml.attributes.length; i++) {
          var attribute = xml.attributes.item(i);
          obj["attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    }
    // If it's a text node
    else if (xml.nodeType === 3 && xml.nodeValue.trim() !== "") { // Text node
      obj = xml.nodeValue.trim(); // Only store the trimmed text if it's not empty
    }

    // Process child nodes
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;

        if (item.nodeType === 3 && item.nodeValue.trim() === "") {
          // Skip empty text nodes (those that contain only whitespace)
          continue;
        }

        // If the nodeName is not already in the object, add it
        if (obj[nodeName] === undefined) {
          obj[nodeName] = xmlToJson(item);
        } else {
          // If there are multiple nodes with the same name, make it an array
          if (Array.isArray(obj[nodeName])) {
            obj[nodeName].push(xmlToJson(item));
          } else {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
    }
    return obj;
  }

  // Function to handle the XML conversion when button is clicked
  document.getElementById('convertBtn').addEventListener('click', function () {
    var xmlInput = xmlEditor.getValue();  // Get the value from CodeMirror (XML input)
    var fileInput = document.getElementById('fileInput').files[0];

    if (xmlInput) {
      // If XML is pasted into the editor
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlInput, "text/xml");
      var json = xmlToJson(xmlDoc);
      var formattedJson = JSON.stringify(json, null, 2); // Pretty format the JSON
      jsonEditor.setValue(formattedJson);  // Set the formatted JSON to CodeMirror output
    } else if (fileInput) {
      // If XML file is uploaded
      var reader = new FileReader();
      reader.onload = function (event) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(event.target.result, "text/xml");
        var json = xmlToJson(xmlDoc);
        var formattedJson = JSON.stringify(json, null, 2);
        jsonEditor.setValue(formattedJson);  // Set the formatted JSON to CodeMirror output
      };
      reader.readAsText(fileInput);
    } else {
      showCustomPopup('Please provide XML data either by pasting or uploading a file.', 'danger');
    }
  });

  // Download the JSON as a file
  document.getElementById('downloadBtn').addEventListener('click', function () {
    var jsonContent = jsonEditor.getValue(); // Get the JSON content from CodeMirror

    // Create a Blob from the JSON content
    var blob = new Blob([jsonContent], { type: 'application/json' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.json'; // Set the download filename
    link.click(); // Trigger the download
  });

  // Copy the JSON to clipboard
  document.getElementById('copyBtn').addEventListener('click', function () {
    var jsonContent = jsonEditor.getValue(); // Get the JSON content from CodeMirror

    // Copy the JSON content to the clipboard
    navigator.clipboard.writeText(jsonContent).then(function () {
      showCustomPopup('JSON copied to clipboard!', 'info');
    }, function (err) {
      showCustomPopup('Text cleared', 'danger');
      console.error('Could not copy text: ', err);
    });
  });
})