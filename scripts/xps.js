function CreateTable(inData) {
    // HEADER DISPLAYED CELLS
    var column = [2,3,4,5,6,7,9,10,11];
    data = inData['rows'];
    data.sort(function(a,b) {
        return b.land_rarity - a.land_rarity;
    });
    
    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        if (column.includes(i)) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
        if (data[i].rent_list.length < 3) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                if (column.includes(j)) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];
                }    
            }
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("response");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}    


//// END FUNCTION ////////////////////////////

const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
    tryAutoLogin: true
    //waxSigningURL: 'http://wax.greymass.com',
    //waxAutoSigningURL: 'http://idm.wax.test:8113/v1/accaunts/auto-accept/'
});

    // const wax = new waxjs.WaxJS({
    //   rpcEndpoint: 'http://wax-all.test:8888',
    //   tryAutoLogin: true,
    //   waxSigningURL: 'http://all-access.wax.test:8113',
    //   waxAutoSigningURL: 'http://idm.wax.test:8113/v1/accounts/auto-accept/'
    // });

async function login() {
    try {
        const userAccount = await wax.login();
        //document.getElementById('updater').value = userAccount;
        //await getCurrentMessage();
    } catch(e) {
        document.getElementById('emsg').append(e.message);
    }
}

async function sign() {
    //if(!wax.api) {
    //    return document.getElementById('emsg').append('* Login first *');
    //}

    try {
        const result = await wax.rpc.get_table_rows({
            json: true,
            code: 'xpansiongame',
            scope: 'xpansiongame',
            table: 'landsx',
            limit: 25000
        });

        //CreateTable(result);
        
        data = JSON.parse(JSON.stringify(result, null, 2));
        CreateTable(data);
        //console.log(data['rows'][2].x);
        //document.getElementById('response').append(JSON.stringify(result, null, 2))
    } catch(e) {
        document.getElementById('response').append(e.message);
    }
}
