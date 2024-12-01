/*  
    SITE 1101 Principles of Information Systems 
    (c)202X by Shahin Alakbarli & Said Bakirov & Araz Nabizade
    Submitted in partial fulfillment of the requirements of the course.
 */

    const imgInp = document.getElementById('imageUpload');
    const figSel = document.getElementById('figureSelect');
    const starSet = document.getElementById('starSettings');
    const spiralSet = document.getElementById('spiralSettings');
    const waveSet = document.getElementById('waveSettings');
    const radialSet = document.getElementById('radialSettings');
    const createBtn = document.getElementById('createArtButton');
    const dlBtn = document.getElementById('downloadButton');
    const cnv = document.getElementById('artCanvas');
    const ctx = cnv.getContext('2d');
    
    let img = null; // stores the uploaded image
    let dens = 5000; // initial density for star pattern
    let angInc = 0.5; // spiral rotation factor
    let radGrow = 5; // controls spiral size increase
    let amp = 50; // wave height
    let freq = 3; // wave frequency
    let burstCnt = 5; // number of radial bursts
    let burstSz = 500; // size of radial bursts
    
    figSel.addEventListener('change', () => {
        const sel = figSel.value;
        // showing settings only for the selected figure
        starSet.style.display = sel === 'star' ? 'block' : 'none';
        spiralSet.style.display = sel === 'spiral' ? 'block' : 'none';
        waveSet.style.display = sel === 'wave' ? 'block' : 'none';
        radialSet.style.display = sel === 'radial' ? 'block' : 'none';
        fractalSettings.style.display = sel === 'fractal' ? 'block' : 'none';
        pixelSettings.style.display = sel === 'pixel' ? 'block' : 'none';
    });
    
    imgInp.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                img = new Image();
                img.src = ev.target.result;
                img.onload = () => {
                    // ensuring canvas matches image dimensions
                    cnv.width = img.width;
                    cnv.height = img.height;
                };
            };
            reader.readAsDataURL(file);
        }
    });
    
    function starMask() {
        const mask = document.createElement('canvas');
        mask.width = cnv.width;
        mask.height = cnv.height;
        const mCtx = mask.getContext('2d');
    
        const cx = cnv.width / 2;
        const cy = cnv.height / 2;
        const rad = Math.min(cnv.width, cnv.height) / 2;
    
        for (let i = 0; i < dens; i++) {
            const ang = Math.random() * Math.PI * 2;
            const x = cx + Math.cos(ang) * rad * Math.random();
            const y = cy + Math.sin(ang) * rad * Math.random();
            mCtx.beginPath();
            mCtx.moveTo(cx, cy);
            mCtx.lineTo(x, y);
            mCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
            mCtx.lineWidth = 1;
            mCtx.stroke();
        }
    
        return mask;
    }
    
    function spiralMask() {
        const mask = document.createElement('canvas');
        mask.width = cnv.width;
        mask.height = cnv.height;
        const mCtx = mask.getContext('2d');
    
        const cx = cnv.width / 2;
        const cy = cnv.height / 2;
        let rad = 0;
    
        mCtx.beginPath();
        for (let i = 0; i < 2000; i++) {
            const x = cx + rad * Math.cos(i * angInc);
            const y = cy + rad * Math.sin(i * angInc);
            mCtx.lineTo(x, y);
            rad += radGrow / 100;
        }
        mCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
        mCtx.lineWidth = 1;
        mCtx.stroke();
    
        return mask;
    }
    
    function waveMask() {
        const mask = document.createElement('canvas');
        mask.width = cnv.width;
        mask.height = cnv.height;
        const mCtx = mask.getContext('2d');
    
        const cy = cnv.height / 2;
    
        mCtx.beginPath();
        for (let x = 0; x < cnv.width; x++) {
            const y = cy + amp * Math.sin((x / cnv.width) * freq * Math.PI * 2);
            mCtx.lineTo(x, y);
        }
        mCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
        mCtx.lineWidth = 1;
        mCtx.stroke();
    
        return mask;
    }
    
    function radialMask() {
        const mask = document.createElement('canvas');
        mask.width = cnv.width;
        mask.height = cnv.height;
        const mCtx = mask.getContext('2d');
    
        for (let i = 0; i < burstCnt; i++) {
            const cx = Math.random() * cnv.width;
            const cy = Math.random() * cnv.height;
    
            for (let j = 0; j < burstSz; j++) {
                const ang = Math.random() * Math.PI * 2;
                const rad = Math.random() * Math.min(cnv.width, cnv.height) / 4;
                const x = cx + Math.cos(ang) * rad;
                const y = cy + Math.sin(ang) * rad;
    
                mCtx.beginPath();
                mCtx.moveTo(cx, cy);
                mCtx.lineTo(x, y);
                mCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
                mCtx.lineWidth = 1;
                mCtx.stroke();
            }
        }
    
        return mask;
    }
    
    function fractalTreeMask() {
        const mask = document.createElement('canvas');
        mask.width = cnv.width;
        mask.height = cnv.height;
        const mCtx = mask.getContext('2d');
    
        const branchLen = parseInt(document.getElementById('branchLength').value);
        const branchAngle = parseInt(document.getElementById('branchAngle').value);
    
        function drawTree(x, y, len, angle, branchWidth) {
            mCtx.lineWidth = branchWidth;
            mCtx.beginPath();
            mCtx.save();
            mCtx.strokeStyle = "rgba(255, 255, 255, 1)";
    
            mCtx.translate(x, y);
            mCtx.rotate((angle * Math.PI) / 180);
            mCtx.moveTo(0, 0);
            mCtx.lineTo(0, -len);
            mCtx.stroke();
    
            if (len < 10) {
                mCtx.restore();
                return;
            }
    
            drawTree(0, -len, len * 0.8, angle - branchAngle, branchWidth * 0.8);
            drawTree(0, -len, len * 0.8, angle + branchAngle, branchWidth * 0.8);
    
            mCtx.restore();
        }
    
        const startX = cnv.width / 2;
        const startY = cnv.height / 2;
    
        [0, 90, 180, 270].forEach(angle => drawTree(startX, startY, branchLen, angle, 10));
    
        return mask;
    }
    
    function pixelArtMask(pixelSize) {
        // block-by-block averaging for retro effect
        for (let y = 0; y < cnv.height; y += pixelSize) {
            for (let x = 0; x < cnv.width; x += pixelSize) {
                const imageData = ctx.getImageData(x, y, pixelSize, pixelSize);
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    r += imageData.data[i];
                    g += imageData.data[i + 1];
                    b += imageData.data[i + 2];
                    count++;
                }
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }
    
    function applyMask(mask) {
        const mCtx = mask.getContext('2d');
        const mData = mCtx.getImageData(0, 0, mask.width, mask.height);
        const iData = ctx.getImageData(0, 0, cnv.width, cnv.height);
    
        for (let i = 0; i < mData.data.length; i += 4) {
            if (mData.data[i] === 0) {
                iData.data[i + 3] = 0; // make mask areas transparent
            }
        }
    
        ctx.putImageData(iData, 0, 0);
    }
    
    function enableDownload() {
        const link = document.createElement('a');
        link.href = cnv.toDataURL('image/png');
    link.download = 'artwork.png';
    link.click();
}

// handles art creation and mask application
createBtn.addEventListener('click', () => {
    if (!img) {
        alert('Please upload an image first!');
        return; // ensures no action without an image
    }

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, cnv.width, cnv.height);

    if (figSel.value === 'pixel') {
        const pixelSize = parseInt(document.getElementById('pixelSize').value);
        pixelArtMask(pixelSize); // pixel art directly modifies canvas
    } else {
        let maskCanvas;
        if (figSel.value === 'star') {
            dens = parseInt(document.getElementById('intensity').value);
            maskCanvas = starMask();
        } else if (figSel.value === 'spiral') {
            angInc = parseFloat(document.getElementById('angle').value);
            radGrow = parseFloat(document.getElementById('radiusGrowth').value);
            maskCanvas = spiralMask();
        } else if (figSel.value === 'wave') {
            amp = parseFloat(document.getElementById('waveAmplitude').value);
            freq = parseFloat(document.getElementById('waveFrequency').value);
            maskCanvas = waveMask();
        } else if (figSel.value === 'radial') {
            burstCnt = parseInt(document.getElementById('burstCount').value);
            burstSz = parseInt(document.getElementById('burstSize').value);
            maskCanvas = radialMask();
        } else if (figSel.value === 'fractal') {
            branchLen = parseInt(document.getElementById('branchLength').value);
            branchAngle = parseInt(document.getElementById('branchAngle').value);
            maskCanvas = fractalTreeMask();
        }

        if (maskCanvas) {
            applyMask(maskCanvas); // blend the selected mask with the image
        }
    }

    dlBtn.style.display = 'inline-block'; // shows the download button
});

dlBtn.addEventListener('click', enableDownload);

    