var $ = jQuery.noConflict();
$(document).ready(function () {
    const textInput = document.getElementById("text-input");
    const hashOutput = document.getElementById("hash-output");
    const copyBtn = document.getElementById("copy-btn");
    const clearBtn = document.getElementById("clear-btn");

    textInput.addEventListener("input", async function () {
        const text = textInput.value;
        if (text.trim() === "") {
            hashOutput.value = "";
            return;
        }

        // Send data via POST
        const response = await fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(document.getElementById("hash-form")))
        });

        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        hashOutput.value = doc.getElementById("hash-output").value;
    });

    // Copy to Clipboard
    copyBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(hashOutput.value);
        alert("Hash copied to clipboard!");
    });

    // Clear Inputs
    clearBtn.addEventListener("click", function () {
        textInput.value = "";
        hashOutput.value = "";
    });
})