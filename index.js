let allCode=[];
function dynamicTable() {
    let div = document.createElement('div');
    div.classList.add('table-container');

    
    let rInput = document.createElement('input');
        rInput.type = 'number';
        rInput.min = 0;
        rInput.max = 255;
        rInput.value = 255;
    let gInput = document.createElement('input');
        gInput.type = 'number';
        gInput.min = 0;
        gInput.max = 255;
        gInput.value = 255;
    let bInput = document.createElement('input');
        bInput.type = 'number';
        bInput.min = 0;
        bInput.max = 255;
        bInput.value = 255;

    
    let colorDisplay = document.createElement('div');
        colorDisplay.style.height = '50px';
        colorDisplay.style.width = '50px';
        colorDisplay.style.backgroundColor = `rgb(${rInput.value}, ${gInput.value}, ${bInput.value})`;

    div.appendChild(rInput);
    div.appendChild(gInput);
    div.appendChild(bInput);
    div.appendChild(colorDisplay);

    // Update color display when RGB inputs change
    rInput.addEventListener('input', updateColor);
    gInput.addEventListener('input', updateColor);
    bInput.addEventListener('input', updateColor);

    function updateColor() {
        colorDisplay.style.backgroundColor = `rgb(${rInput.value}, ${gInput.value}, ${bInput.value})`;
    }

    let clear_btn = document.createElement('button');
    clear_btn.innerHTML = "CLEAR";
    clear_btn.classList.add('clear_btn');
    let download_btn = document.createElement('button');
    download_btn.innerHTML = "DOWNLOAD TO TEXT";
    download_btn.classList.add('download_btn');
    div.appendChild(clear_btn);
    div.appendChild(download_btn);

    let table = document.createElement('table');
for(let i = 0; i < 16; i++) {
    let row = document.createElement('tr');
    for(let j = 0; j < 16; j++) {
        let cell = document.createElement('td');
        let number;
        if(j % 2 === 0) { // For even columns
            number = 16 * j + i;
        } else { // For odd columns
            number = 16 * (j + 1) - i - 1;
        }
        cell.textContent = number;
        row.appendChild(cell);
    }
    table.appendChild(row);
}
div.appendChild(table);
            

    document.body.appendChild(div);

    const clear = document.getElementsByClassName('clear_btn')[0]; 
    clear.addEventListener('click',function(){
        let cells = document.getElementsByTagName('td');
        for (let i = 0; i < cells.length;i++){
            cells[i].style.backgroundColor="white";
            rInput.value = 255;
            gInput.value = 255;
            bInput.value = 255;
            colorDisplay.style.backgroundColor ="white";
        }
    })

    const download = document.getElementsByClassName('download_btn')[0]; 
    download.addEventListener('click', function() {
    let str = allCode.join('\n');
    let blob = new Blob([str], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "output.txt");
});


    let cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function(){
            let r = rInput.value;
            let g = gInput.value;
            let b = bInput.value;
            this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            allCode.push(`leds[${cells[i].innerHTML}] = CRGB(${r}, ${g}, ${b});`);
            //console.log(`leds[${i}] = CRGB(${r}, ${g}, ${b})`);
            console.log(allCode);
        });
    }
}

window.onload = dynamicTable;
