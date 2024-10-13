function generateFields() {
    const rows = document.getElementById('rows').value;
    const tableBody = document.querySelector('#inputTable tbody');
    tableBody.innerHTML = ''; 

    if (rows < 1) {
        alert('يرجى إدخال عدد صحيح.');
        return;
    }

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="number" placeholder="العدد" class="quantity" required></td>
            <td><input type="number" placeholder="العرض (سم)" class="width" required></td>
            <td><input type="number" placeholder="الطول (سم)" class="height" required></td>
        `;

        tableBody.appendChild(row);
    }
}

function calculateCost() {
    const rows = document.querySelectorAll('#inputTable tbody tr');
    const productNum = parseInt(document.getElementById('product').value);
    let cost = 0, countOver200 = 0, totalUnder10cm = 0;

    rows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value);
        const width = parseFloat(row.querySelector('.width').value) / 100;
        const height = parseFloat(row.querySelector('.height').value) / 100;

        const volume = quantity * width * height;
        cost += volume;

        if (height * 100 > 200) countOver200 += quantity;
        if (width * 100 < 10) totalUnder10cm += quantity * height;
    });

    let price = 0;
    switch (productNum) {
        case 1: price = cost * 65; break;
        case 2: price = cost * 70; break;
        case 3: price = cost * 140; break;
        case 4: price = cost * 90; break;
        case 5: price = cost * 100; break;
        case 6: price = cost * 110; break;
        case 7: price = cost * 120; break;
        case 8: price = cost * 130; break;
        default: alert('يرجى اختيار رقم منتج صحيح'); return;
    }

    const extraPrice = countOver200 * 20;
    const adPrice = totalUnder10cm * 5;
    const totalPrice = price + extraPrice + adPrice;

    document.getElementById('result').innerHTML = `
        المتر المربع: ${cost.toFixed(2)} <br>
        السعر: ${price.toFixed(2)} <br>
        عدد الأطوال فوق 200 سم : ${countOver200} <br>
        سعر الأطوال فوق 200 سم :  ${extraPrice.toFixed(2)} <br>
        الطول أقل من 10 سم: ${totalUnder10cm.toFixed(2)} <br>
        سعر الطول أقل من 10 سم : ${adPrice.toFixed(2)} <br>
        السعر الإجمالي: ${totalPrice.toFixed(2)}
    `;
}