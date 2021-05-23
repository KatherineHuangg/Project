var accounts = {};

function gtAccounts(){
    $.get('http://localhost:3000/accounts',function(accs){
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
        $.post('http://localhost:3000/register/',
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
        $.post("http://localhost:3000/sendcoin/",
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
function getBalance(address){
    //console.log(address)
    if(address){
        $.get('http://localhost:3000/getBalance?address='+ address,function(bal){
            accounts[address] = bal;
            showAccountList();
        })
    }
}

$("#unlockAccount").click(function(){
    var unlockaddr = $("#unlockaddr").val();
    var unlockpassword = $("#unlockpassword").val();
    if(unlockpassword!='' && unlockaddr!=''){
        $.post("http://localhost:3000/unlockAccount/",
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

$("#addTenant").click(function(){
    var houseNumber = $("#houseNumber").val();
    var tenantAddress = $("#tenantAddress").val();
    var keeppet = $("#keeppet").val();
    var smoke = $("#smoke").val();
    var drinking = $("#drinking").val();
    var gbfriend = $("#gbfriend").val();
    if(houseNumber != '' && tenantAddress != '' && keeppet != '' && smoke!=''&&drinking!=''&&gbfriend!=''){
        console.log('1')
        $.post("http://localhost:3000/addTenant_success/",
        {
            houseNumber,
            tenantAddress,
            keeppet,
            smoke,
            drinking,
            gbfriend
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine')
            }
        })
    }
    $("#houseNumber").val("");
    $("#tenantAddress").val("");
    $("#keeppet").val("");
    $("#smoke").val("");
    $("#drinking").val("");
    $("#gbfriend").val("");
})

$("#setCoinRule").click(function(){
    var houseNum = $("#houseNum").val();
    var tenantAddr = $("#tenantAddr").val();
    var petcoin = $("#petcoin").val();
    var smokecoin = $("#smokecoin").val();
    var drinkingcoin = $("#drinkingcoin").val();
    var gbfriendcoin = $("#gbfriendcoin").val();
    if(houseNum != '' && tenantAddr!='' &&petcoin != '' && smokecoin != ''&&drinkingcoin!=''&&gbfriendcoin!=''){
        console.log('1')
        $.post("http://localhost:3000/setCoinRule_success/",
        {
            houseNum,
            tenantAddr,
            petcoin,
            smokecoin,
            drinkingcoin,
            gbfriendcoin
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine')
            }
        })
    }
    $("#houseNum").val("");
    $("#tenantAddr").val("");
    $("#petcoin").val("");
    $("#smokecoin").val("");
    $("#drinkingcoin").val("");
    $("#gbfriendcoin").val("");
})

$("#getCoinRule").click(function(){
    var house = $("#house").val();
    if(house != ''){
        $.post("http://localhost:3000/getCoinRule/",
        {
            house
        },function(res){
            if(res.msg == 'ok'){
                console.log('getCoinRule success')
                console.log('houseinfo:')
                console.log( 'petcoin: '+ res.resultt[0])
                console.log( 'smokecoin: '+ res.resultt[1])
                console.log( 'drinkingcoin: '+ res.resultt[2])
                console.log( 'gbfriendcoin: '+ res.resultt[3])
            }
        })
    }
    $("#house").val("");
})

$("#getTenantsfromHouse").click(function(){
    var housenum = $("#housenum").val();
    var count;
    if(housenum!=''){
        $.post("http://localhost:3000/getTenantsNumfromHouse/",
        {
            housenum
        },function(res){
            if(res.msg == 'ok') {
                count = parseInt(res.resultt, 10);
                console.log('getTenantsNumfromHouse: ' + count)
                for(var i =0;i<count;i++){
                    $.post("http://localhost:3000/getTenantsfromHouse/",
                    {
                        housenum,
                        i
                    },function(res){
                        if(res.msg == 'ok'){
                            console.log('getTenantsfromHouse: ');
                            console.log('keeppet = ' + res.resultt[0]);
                            console.log('smoke = ' + res.resultt[1]);
                            console.log('drinking = '+ res.resultt[2]);
                            console.log('gbfriend = '+ res.resultt[3]);
                        }
                    })
                }
            }
        })
    }      
    $("#housenum").val("");
})

$("#getTenantInfofromAddr").click(function(){
    var tenant = $("#tenant").val();
    if(tenant != ''){
        $.post("http://localhost:3000/getTenantInfofromAddr/",
        {
            tenant
        },function(res){
            if(res.msg == 'ok'){
                console.log('getTenantInfofromAddr success')
                console.log('tenantinfo:')
                console.log( 'keeppet: '+ res.resultt[0])
                console.log( 'smoke: '+ res.resultt[1])
                console.log( 'drinking: '+ res.resultt[2])
                console.log( 'gbfriend: '+ res.resultt[3])
            }
        })
    }
    $("#tenant").val("");
})

$("#recordPict").click(function(){
    var pictUrl = $("#pictUrl").val();
    var yourAddr = $("#yourAddr").val();
    if(pictUrl != '' && yourAddr!=''){
        console.log('1')
        $.post("http://localhost:3000/recordPict_success/",
        {
            pictUrl,
            yourAddr
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine')
            }
        })
    }
    $("#pictUrl").val("");
    $("#yourAddr").val("");

})

$("#getPict").click(function(){
    var owneraddr = $("#owneraddr").val();
    var count;
    if(owneraddr!=''){
        $.post("http://localhost:3000/getPictNum/",
        {
            owneraddr
        },function(res){
            if(res.msg == 'ok') {
                count = parseInt(res.resultt, 10);
                console.log('getPictNum: ' + count)
                console.log('picture URL: ');
                for(var i =0;i<count;i++){
                    $.post("http://localhost:3000/getPictAll/",
                    {
                        owneraddr,
                        i
                    },function(res){
                        if(res.msg == 'ok'){
                            
                            console.log('url = ' + res.resultt);
                        }
                    })
                }
            }
        })
    }      
    $("#owneraddr").val("");
})

$('#penaltyToContract').click(function(){
    var address = $("#tenant_address").val();
    var money = $("#transvalue").val();
    var password = $("#transpassword").val();
    var homenum = $("#homenum").val();
    
    if(address!='' && money!='' && password!=''){
        $.post("http://localhost:3000/penaltyToContract/",
        {
            address,
            money,
            password
        },function(res){
            if(res.msg == 'ok'){
                console.log('remember to mine');
                $.post("http://localhost:3000/distributePenalty/",
                {
                    homenum,
                    address
                },function(res){
                    if(res.msg == 'ok'){
                        console.log('remember to mine');
                    }
                })
            }
        })
    }
    $("#tenant_address").val("");
    $("#transvalue").val("");
    $("#transpassword").val("");
    $("#homenum").val("");
})

$('#ifPaidPenalty').click(function(){
    var tenantaddr = $("#tenantaddr").val();
    if(tenantaddr!=''){
        $.post("http://localhost:3000/ifPaidPenalty/",
        {
            tenantaddr
        },function(res){
            if(res.msg == 'ok'){
                console.log(res.resultt);
                $.post("http://localhost:3000/changepaid/",
                {
                    tenantaddr
                },function(res){
                    if(res.msg == 'ok'){
                        console.log('remember to mine');
                    }
                })
            }
        })
    }
    $("#tenantaddr").val("");
})

$('#getcontractmoney').click(function(){
    $.post('http://localhost:3000/getcontractmoney/',
    {},
    function(res){
        if(res.msg == 'ok'){
            console.log('getcontractmoney success');
            console.log('contract money = ' + res.resultt);
        }
    })
})
