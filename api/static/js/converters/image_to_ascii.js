var $ = jQuery.noConflict();
$(document).ready(function () {
   const ASCII_GRADIENT = '@%#*+=-:. ';
        const TARGET_WIDTH = 50;

        document.getElementById('imageInput').addEventListener('change', processImage);
        document.getElementById('copyBtn').addEventListener('click', copyASCII);
        document.getElementById('downloadBtn').addEventListener('click', downloadASCII);

        async function processImage(e) {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const imageData = await getImageData(file);
                const asciiArt = convertToASCII(imageData);
                document.getElementById('ascii-art').textContent = asciiArt;
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }

        async function getImageData(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = TARGET_WIDTH;
                        canvas.height = Math.round((img.height / img.width) * TARGET_WIDTH);
                        
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
                    };
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        function convertToASCII(imageData) {
            const data = imageData.data;
            let output = '';
            
            for (let y = 0; y < imageData.height; y += 1.8) {
                let line = '';
                for (let x = 0; x < imageData.width; x += 0.95) {
                    const xPos = Math.floor(x);
                    const yPos = Math.floor(y);
                    const idx = (yPos * imageData.width + xPos) * 4;
                    
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];
                    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                    const charIndex = Math.floor(Math.pow(brightness, 1.3) * (ASCII_GRADIENT.length - 1));
                    
                    line += ASCII_GRADIENT[charIndex] || ' ';
                }
                output += line + '\n';
            }
            return output;
        }

        async function copyASCII() {
            const text = document.getElementById('ascii-art').textContent;
            try {
                await navigator.clipboard.writeText(text);
                showBootstrapToast('Copied to clipboard!', 'success');
            } catch (err) {
                showBootstrapToast('Copy failed!', 'danger');
            }
        }

        function downloadASCII() {
            const text = document.getElementById('ascii-art').textContent;
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ascii-art-${new Date().toISOString().slice(0,10)}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }

        // Bootstrap Toast Notification
        function showBootstrapToast(message, type = 'info') {
            const toastContainer = document.createElement('div');
            toastContainer.innerHTML = `
                <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            ${message}
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(toastContainer);
            const toastEl = toastContainer.querySelector('.toast');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
            
            setTimeout(() => toastContainer.remove(), 2000);
        }
})