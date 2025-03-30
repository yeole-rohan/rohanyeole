var $ = jQuery.noConflict();
$(document).ready(function () {
        document.getElementById("shuffleBtn").addEventListener("click", shuffleText);
        document.getElementById("copyBtn").addEventListener("click", copyText);
        document.getElementById("downloadBtn").addEventListener("click", downloadText);
        document.getElementById("clearBtn").addEventListener("click", clearText);
        document.getElementById("inputText").addEventListener("input", shuffleText);
    
    // Shuffle words function
    function shuffleText() {
        let input = document.getElementById("inputText").value;
        let words = input.split(/\s+/).filter(word => word.length > 0); // Remove empty elements
        let shuffledWords = words.sort(() => Math.random() - 0.5);
        document.getElementById("outputText").value = shuffledWords.join(" ");
        updateStats();
    }
    
    // Copy text function
    function copyText() {
        let outputText = document.getElementById("outputText");
        outputText.select();
        document.execCommand("copy");
        showCustomPopup("Shuffled text copied!", 'info');
    }
    
    // Download shuffled text function
    function downloadText() {
        let text = document.getElementById("outputText").value;
        let blob = new Blob([text], { type: "text/plain" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "shuffled_text.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    // Clear text function
    function clearText() {
        document.getElementById("inputText").value = "";
        document.getElementById("outputText").value = "";
        updateStats();
    }
    
    // Update Statistics
    function updateStats() {
        let text = document.getElementById("inputText").value;
        document.getElementById("charCount").innerText = text.length;
        document.getElementById("charCountNoSpaces").innerText = text.replace(/\s/g, "").length;
        document.getElementById("wordCount").innerText = text.split(/\s+/).filter(word => word.length > 0).length;
        document.getElementById("sentenceCount").innerText = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
        document.getElementById("paragraphCount").innerText = text.split(/\n+/).filter(para => para.length > 0).length;
        document.getElementById("lineCount").innerText = text.split(/\n/).length;
    }
    
})