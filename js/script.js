const main = () => {
    const numRegex = /^\d+$/
    const vat = document.getElementById('vat')
    const servicecharge = document.getElementById('servicecharge')
    const tableBody = document.getElementById('tableBody')
    const beforeVat = document.getElementsByClassName('beforeVat')
    const vatpaid = document.getElementsByClassName('vatpaid')
    const servicechargepaid = document.getElementsByClassName('servicechargepaid')
    const fullpaid = document.getElementsByClassName('fullpaid')
    if (!(numRegex.test(vat.innerText)) || parseInt(vat.innerText) > 100) {
        vat.innerText = 7
    }
    if (!(numRegex.test(servicecharge.innerText)) || parseInt(servicecharge.innerText) > 10) {
        servicecharge.innerText = 10
    }
    const ticketTotal = document.getElementById('ticketTotal').value * (100+ parseFloat(vat.innerText)) / 100
    const roundTicketTotal = (Math.round(ticketTotal * 4) / 4).toFixed(2);

    for (var i = 0; i< beforeVat.length; i++) {
        if (!(numRegex.test(beforeVat[i].innerText))) {
            beforeVat[i].innerText = 0
        }
        servicechargepaid[i].innerText = (parseFloat(beforeVat[i].innerText) * (parseFloat(servicecharge.innerText)) / 100).toFixed(2)
        vatpaid[i].innerText = ((parseFloat(beforeVat[i].innerText)+parseFloat(servicechargepaid[i].innerText)) * parseFloat(vat.innerText) / 100).toFixed(2)
        fullpaid[i].innerText = `${parseFloat(vatpaid[i].innerText) + parseFloat(beforeVat[i].innerText)}`
    }

    var paidAmt = 0
    for (var paid of fullpaid) {
        paidAmt += parseFloat(paid.innerText)
    }
    document.getElementById('total').innerText = roundTicketTotal
    document.getElementById('leftAmt').innerText = (roundTicketTotal - paidAmt).toFixed(2)
}

const addItem = () => {
    try {
        var len = (document.getElementById("tableBody").innerHTML.match(/<tr>/g)).length
    }
    catch(e) {
        var len = 0
    }
    document.getElementById('tableBody').innerHTML += `<tr>
    <td>${len+1}</td>
    <td class="name" contenteditable>Name Here</td>
    <td class="beforeVat" contenteditable oninput="main()">0</td>
    <td class="servicechargepaid"></td>
    <td class="vatpaid"></td>
    <td class="fullpaid"></td>
    </tr>`
    main()
}

const removeItem = () => {
    const tableBody = document.getElementById("tableBody")
    try {
        var len = (tableBody.innerHTML.match(/<tr>/g)).length
    }
    catch(e) {
        var len = 0
    }
    const temp = tableBody.innerHTML.split(`</tr><tr>`)
    tableBody.innerHTML =  tableBody.innerHTML.replace(`<tr>${temp[temp.length-1]}`,"")
    main()
}
addItem()
