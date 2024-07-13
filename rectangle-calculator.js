document.addEventListener('DOMContentLoaded', function() {
    const widthInput = document.getElementById('width');
    const lengthInput = document.getElementById('length');
    const output = document.getElementById('output');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function formatNumber(num) {
        return num.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function updateCanvas() {
        const width = parseFloat(widthInput.value);
        const length = parseFloat(lengthInput.value);
        const totalSquareFeet = width * length;

        // Calculate the number of full 15 ft sections and any remaining width
        const rollWidth = 15; // Roll width in feet
        const fullSections = Math.floor(width / rollWidth);
        const remainderWidth = width % rollWidth;

        // Update canvas size and clear it
        const canvasWidth = (fullSections * rollWidth + (remainderWidth > 0 ? rollWidth : 0)) * 10;
        canvas.width = canvasWidth;
        canvas.height = length * 10;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add background image
        const bg = new Image();
        bg.src = 'grass-bg.jpg'; // replace with your image path

        bg.onload = function() {
            const imageWidth = bg.width;
            const imageHeight = bg.height;

            // Calculate the scaling factor to cover the canvas and maintain aspect ratio
            const scale = Math.max(canvasWidth / imageWidth, canvas.height / imageHeight);
            const scaledWidth = imageWidth * scale;
            const scaledHeight = imageHeight * scale;

            // Calculate the position to center the image
            const x = (canvasWidth - scaledWidth) / 2;
            const y = (canvas.height - scaledHeight) / 2;

            // Draw the image on the canvas
            ctx.drawImage(bg, x, y, scaledWidth, scaledHeight);

            // Add logo
            const img = new Image();
            img.src = 'turfyard.jpg';

            img.onload = function() {
                const imageWidth = img.width;
                const imageHeight = img.height;

                // Calculate the scaling factor to maintain the aspect ratio
                const scale = Math.min(canvasWidth / (2 * imageWidth), canvas.height / (2 * imageHeight));
                const scaledWidth = imageWidth * scale;
                const scaledHeight = imageHeight * scale;
                const x = (canvasWidth - scaledWidth) / 2;
                const y = (canvas.height - scaledHeight) / 2;

                // Set the opacity for the image
                ctx.globalAlpha = 0.35; // Set the desired opacity (0.0 to 1.0)
                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
                ctx.globalAlpha = 1.0;

                // Draw black lines and white labels
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;

                let rollCount = 0;
                let totalBlackLinesLength = 0;
                const sections = [];

                // Add full 15 ft sections
                for (let i = 0; i < fullSections; i++) {
                    sections.push(15);
                }

                // Add remaining section if any
                if (remainderWidth > 0) {
                    sections.push(remainderWidth);
                }

                let currentX = 0;
                for (let i = 0; i < sections.length; i++) {
                    const sectionWidth = sections[i] * 10; // Convert feet to pixels

                    // Draw the black line
                    ctx.beginPath();
                    ctx.moveTo(currentX, 0);
                    ctx.lineTo(currentX, canvas.height);
                    ctx.stroke();

                    // Draw the section label
                    const sectionCenterX = currentX + (sectionWidth / 2);
                    const sectionCenterY = canvas.height / 2; // Center of the canvas in y direction
                    ctx.font = '16px Arial';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${sections[i]} ft x ${length}`, sectionCenterX, sectionCenterY);

                    currentX += sectionWidth;
                    rollCount++;
                    totalBlackLinesLength += length;
                }

                // Handle waste section if there is a remainder width
                if (remainderWidth > 0 && fullSections > 0) {
                    const wasteWidth = rollWidth - remainderWidth; // Width of the waste
                    const wasteX = currentX; // Start position for waste section

                    // Draw the waste section as a rectangle
                    ctx.fillStyle = 'red'; // Color for waste section
                    ctx.fillRect(wasteX, 0, wasteWidth * 10, canvas.height); // Convert waste width to pixels

                    // Save the canvas state
                    ctx.save();

                    // Translate to the center of the waste section
                    ctx.translate(wasteX + (wasteWidth * 10 / 2), canvas.height / 2);

                    // Rotate the canvas by -90 degrees
                    ctx.rotate(-Math.PI / 2);

                    // Draw the waste label
                    ctx.font = '16px Arial';
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`Waste: ${wasteWidth} ft x ${length}`, 0, 0);

                    // Restore the canvas state
                    ctx.restore();
                }

                // Display calculations
                output.innerHTML = `Total Sq Ft: ${formatNumber(totalSquareFeet)}`;
                const totalWidthInRolls = (fullSections + (remainderWidth > 0 ? 1 : 0)) * rollWidth;
                output.innerHTML += `<br>Total width in 15' Rolls: ${formatNumber(totalWidthInRolls)}`;

                const sqFtPurchaseAmount = totalWidthInRolls * length;
                output.innerHTML += `<br>Sq Ft Purchase Amount: ${formatNumber(sqFtPurchaseAmount)}`;

                const excessTurf = sqFtPurchaseAmount - totalSquareFeet;
                output.innerHTML += `<br>Excess Turf: ${formatNumber(excessTurf)} sq ft. <a href="https://atxturf.com/6-things-to-do-with-your-excess-artificial-turf/" target="_blank" style="color: blue; text-decoration: underline;"> Get Ideas.</a>`;
            }
        }
    }

    widthInput.addEventListener('input', updateCanvas);
    lengthInput.addEventListener('input', updateCanvas);
});
