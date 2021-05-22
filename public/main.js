var accounts = {};

function gtAccounts(){
    $.get('http://localhost:8081/accounts',function(accs){
        console.log('hi')
        console.log(accs)
        for(var i = 0;i < accs.length;i++){
            //console.log('accs['+i+']:'+ accs[i])
            accounts[accs[i]] = 0;
        }
        
        for( k in accounts){
            //console.log('k=' + k)
            getBalance(k)
        }
    })
}
gtAccounts()

$("#addaccount").click(function(){
    if($("#password").val() != ""){
        $.post('http://localhost:8081/register/',
        {password:$("#password").val()},
        function(res){
            console.log(res)
            accounts[res.address] = res.balance;
            showAccountList();
        })
    }
    $("#password").val("")
})

$("#trans_btn").click(function(){
    var address_from = $("#address_from").val();
    var address_to = $("#address_to").val();
    var trans_value = $("#trans_value").val();
    var trans_password = $("#trans_password").val();
    if(address_from != '' && address_to != '' && trans_value != "" && trans_password != ""){
        $.post("http://localhost:8081/sendcoin/",
        {
            address_from,
            address_to,
            trans_value,
            trans_password
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
                accounts[address_to] = trans_value;
                showAccountList();
                // getBalance(address_from)
                // getBalance(address_to)     
            }
        })
    }
    // $("#address_from").val("");
    $("#address_to").val("");
    $("#trans_value").val("");
    $("#trans_password").val("");
})

function showAccountList(){
    var str = "";          
    for(k in accounts){
        str += `<div class="row">
                    <div class="col-md-9">
                        地址：${k}
                    </div>
                    <div class="col-md-3">
                        金额：${accounts[k]}
                    </div>
                </div>`
    }
    $("#account-list").html(str)
}
var str;
function getBalance(address){
    //console.log(address)
    if(address){
        $.get('http://localhost:8081/getBalance?address='+ address,function(bal){
            accounts[address] = bal;
            console.log(bal);
            showAccountList();
        })
    }
}


$("#unlockAccount").click(function(){
    var unlockaddr = $("#unlockaddr").val();
    var unlockpassword = $("#unlockpassword").val();
    if(unlockpassword!='' && unlockaddr!=''){
        $.post("http://localhost:8081/unlockAccount/",
        {
            unlockaddr,
            unlockpassword
        },function(res){
            if(res.msg == 'ok'){
                console.log('unlock success')
            }
        })
    }
    $("#unlockaddr").val("");
    $("#unlockpassword").val("");
})

$("#addhouse").click(function(){
    var landlordaddress = $("#landlordaddress").val();
    var lease = $("#lease").val();
    var totalrent = $("#totalrent").val();
    var tenantnum = $("#tenantnum").val();
    if(lease != '' && totalrent != '' && tenantnum != ''){
        console.log('1')
        $.post("http://localhost:8081/addhouse_success/",
        {
            lease,
            totalrent,
            tenantnum,
            landlordaddress
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine')
            }
        })
    }
    $("#lease").val("");
    $("#totalrent").val("");
    $("#tenantnum").val("");
    $("#landlordaddress").val("");
})

$("#getLandlordHouse").click(function(){
    var address = $("#_addr").val();
    var count;
    if(address!=''){
        $.post("http://localhost:8081/getLandlordHouseNum/",
        {
            address
        },function(res){
            if(res.msg == 'ok') {
                count = parseInt(res.resultt, 10);
                console.log('getLandlordHousenum: ' + count)
                for(var i =0;i<count;i++){
                    $.post("http://localhost:8081/getLandlordHouse/",
                    {
                        address,
                        i
                    },function(res){
                        if(res.msg == 'ok'){
                            console.log('getLandlordHouse: ');
                            console.log('landlord address = ' + res.resultt[0]);
                            console.log('house id = ' + res.resultt[1]);
                            console.log('house lease = '+ res.resultt[2]);
                            console.log('house rent = '+ res.resultt[3]);
                            console.log('house tenant num = '+ res.resultt[4]);
                        }
                    })
                }
            }
        })
    }      
    $("#_addr").val("");
})

$("#addtenant").click(function(){
    var tenantaddress = $("#tenantaddress").val();
    var rent = $("#rent").val();
    var tenantlease = $("#tenantlease").val();
    var housenumber = $("#housenumber").val();
    var landlord_address = $("#landlord_address").val();
    if(tenantaddress != '' && rent != '' && tenantlease != '' &&  housenumber != '' && landlord_address!=''){
        console.log('1')
        $.post("http://localhost:8081/addtenant_success/",
        {
            tenantaddress,
            rent,
            tenantlease,
            housenumber,
            landlord_address
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine')
            }
        })
    }
    $("#tenantaddress").val("");
    $("#rent").val("");
    $("#tenantlease").val("");
    $("#housenumber").val("");
    //$("#landlord_address").val("");
})

$("#gettenantinfo").click(function(){
    var address = $("#address").val();
    if(address != ''){
        $.post("http://localhost:8081/gettenantinfo/",
        {
            address
        },function(res){
            if(res.msg == 'ok'){
                console.log('gettenantinfo success')
                console.log('tenantinfo:')
                console.log( 'rent: '+ res.resultt[0])
                console.log( 'lease: '+ res.resultt[1])
                console.log( 'hadPaidRent: '+ res.resultt[2])
                console.log( 'hadPaidPower: '+ res.resultt[3])
                console.log( 'landlordAddress: '+ res.resultt[4])
                console.log( 'id: '+ res.resultt[5])
                console.log( 'powerCost: '+ res.resultt[6])
            }
        })
    }
    $("#address").val("");
})

$('#renttocontract').click(function(){
    var address = $("#tenant_address").val();
    var money = $("#transvalue").val();
    var password = $("#transpassword").val();
    if(address!='' && money!='' && password!=''){
        $.post("http://localhost:8081/renttocontract/",
        {
            address,
            money,
            password
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
            }
        })
    }
    $("#tenant_address").val("");
    $("#transvalue").val("");
    $("#transpassword").val("");
})

$('#getcontractmoney').click(function(){
    $.post('http://localhost:8081/getcontractmoney/',
    {},
    function(res){
        if(res.msg == 'ok'){
            console.log('getcontractmoney success');
            console.log('contract money = ' + res.resultt);
        }
    })
})

$('#setTenantPowerCost').click(function(){
    var power = $("#power").val();
    var addrforpower = $("#addrforpower").val();
    if(power!='' && addrforpower != ''){
        $.post("http://localhost:8081/setTenantPowerCost/",
        {
            power,
            addrforpower
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
            }
        })
    }
    $("#power").val("");
    $("#addrforpower").val("");
})

$('#powerToContract').click(function(){
    var tenantaddrforpower = $("#tenantaddrforpower").val();
    var powercost = $("#powercost").val();
    var passwordforpower = $("#passwordforpower").val();
    if(tenantaddrforpower!='' && powercost!='' && passwordforpower!=''){
        $.post("http://localhost:8081/powerToContract/",
        {
            tenantaddrforpower,
            powercost,
            passwordforpower
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
            }
        })
    }
    $("#tenantaddrforpower").val("");
    $("#powercost").val("");
    $("#passwordforpower").val("");
})

$('#checkIfTenantsHadPaidRent').click(function(){
    var number = $("#number").val();
    if(number != ''){
        $.post("http://localhost:8081/checkIfTenantsHadPaidRent/",
        {
            number
        },function(res){
            if(res.msg == 'ok'){
                console.log('checkIfTenantsHadPaidRent = ' + res.resultt);
            }
        })
    }
    $("#number").val("");
})

$('#RentToLandlord').click(function(){
    var landlordAddr = $("#landlordAddr").val();
    var number = $("#renthousenumber").val();
    if(number != ''){
        $.post("http://localhost:8081/RentToLandlord/",
        {
            landlordAddr,
            number
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
            }
            else if(res.msg == 'no'){
                console.log('RentToLandlord is fail')
            }
        })
    }
    $("#renthousenumber").val("");
    $("#landlordAddr").val("");
})

$('#checkIfTenantsHadPaidPower').click(function(){
    var number = $("#num").val();
    if(number != ''){
        $.post("http://localhost:8081/checkIfTenantsHadPaidPower/",
        {
            number
        },function(res){
            if(res.msg == 'ok'){
                console.log('checkIfTenantsHadPaidPower = ' + res.resultt);
            }
        })
    }
    $("#num").val("");
})

$('#PowerToLandlord').click(function(){
    var landlordAddr = $("#landlord_Adr").val();
    var number = $("#powerhousenumber").val();
    if(number != ''){
        $.post("http://localhost:8081/PowerToLandlord/",
        {
            landlordAddr,
            number
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
            }
            else if(res.msg == 'no'){
                console.log('PowerToLandlord is fail')
            }
        })
    }
    $("#powerhousenumber").val("");
    $("#landlord_Adr").val("");
})
