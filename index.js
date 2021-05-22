//contract address=0x404aeD0dFA6EF85fFFBA3F91E2900629ad400d4C
//contract hash = 0xbb525497037ec61bd0d905eb7b7d4760b99715396d81bdc0173f6a9f994dbd28
//test address = 0x9b8B16B8d95943B525D0c0F25F854bf5824b788d

var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var web3 = require("./getWeb3");
const { table } = require("console");

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_lease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalRent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tenantNum",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_landlord",
				"type": "address"
			}
		],
		"name": "addHouse",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_landlord",
				"type": "address"
			}
		],
		"name": "addTenant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			}
		],
		"name": "contractMoney",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getContractMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "powercost",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			}
		],
		"name": "getTenantPowerCost",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "whoPaidMoney",
				"type": "address"
			}
		],
		"name": "getcontractMoneybyPower",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "whoPaidMoney",
				"type": "address"
			}
		],
		"name": "getcontractMoneybyRent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "tenantAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lease",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "houseNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "landlordaddr",
				"type": "address"
			}
		],
		"name": "gettenant",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "powerToContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_powerCost",
				"type": "uint256"
			}
		],
		"name": "PowerToLandlord",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "rentToContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			}
		],
		"name": "RentToLandlord",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_powerCost",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "setTenantPowerCost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			}
		],
		"name": "checkIfTenantsHadPaidPower",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			}
		],
		"name": "checkIfTenantsHadPaidRent",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getLandlordHousebyAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getLandlordHouseNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getTenant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "ifTenantHasPaidPowerCost",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "ifTenantHasPaidRent",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tenants",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lease",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hadPaidRent",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "hadPaidPower",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "landlordAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Hid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "powerCost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var address='0xfABD9CCb0e9aA9D9A6e8A2549FA0f34242C84641'
var MyContract = new web3.eth.Contract(abi, address);

MyContract.methods.getContractMoney().call()
    .then(data => {
		const etherValue = web3.utils.fromWei(data, 'ether');
        console.log('contract_money = ', etherValue)
    })
    .catch(function (error) {
        console.log('estimateGas error', error)
    });

app.listen(8081,function(){
    console.log('server [email protected]')
});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})

//獲取所有使用者
app.get('/accounts',function(req,res){
    web3.eth.getAccounts(function(error, result){
    res.send(result)
    })
})
//註冊用戶
app.post("/register",function(req, res){
    var password = req.body.password;
    console.log('password:');
    console.log(password);

    web3.eth.personal.newAccount(password).then(function(addr){
        console.log('新增賬戶:',addr)
        res.send({address:addr,balance:0})
    });
})
//查詢餘額
app.get("/getBalance", function(req, res){
    var address = req.query.address;
    web3.eth.getBalance(address).then(function(balance){
		const etherValue = web3.utils.fromWei(balance, 'ether');
        res.send(etherValue);
        //var ether = web3.utils.fromWei(balance, 'ether');
        //res.send(ether);
    })
})

//發送ether
app.post("/sendcoin", function(req, res){
    var address_from = req.body.address_from;  
    var address_to = req.body.address_to;
    var trans_value = req.body.trans_value;
    var password = req.body.trans_password;
	const weiValue = web3.utils.toWei(trans_value, 'ether');
    
    web3.eth.personal.unlockAccount(address_from,password,9999,function(){
        console.log('unlock accounts ok')
        web3.eth.sendTransaction({
            from: address_from,
            to: address_to,
            value: weiValue,
            //value: web3.utils.toWei(trans_value,"ether"),
        },function(err,transactionHash){
            if(!err){
                console.log('need mined')
                console.log('transactionHash:',transactionHash)
                res.send({msg:"ok",hash:transactionHash});
            }else{
                console.log('-------------error-----------')
                console.log(err)
                console.log('-------------error-----------')
            }
        })
    });
}) 

app.post("/unlockAccount",function(req,res){
    var unlockaddress = req.body.unlockaddr;
    var unlockpassword = req.body.unlockpassword
    web3.eth.personal.unlockAccount(unlockaddress,unlockpassword,9999,function(){
        console.log('unlock accounts ok')
        res.send({msg:"ok"});
    });
})

//新增房屋
app.post("/addhouse_success",function(req,res){
    var lease = req.body.lease;
    var totalrent = req.body.totalrent;
    var tenantnum = req.body.tenantnum;
    var landlordaddress = req.body.landlordaddress;
    console.log(lease + ' , '+totalrent + ' , '+ tenantnum + ' , '+ landlordaddress);

    MyContract.methods.addHouse(lease,totalrent,tenantnum,landlordaddress).send({from: landlordaddress},function(error,transactionHash){
        if(!error){
            console.log('need mined')
            console.log('transactionHash:',transactionHash)
            res.send({msg:"ok",transactionHash:transactionHash});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
        }
    });
})

app.post("/getLandlordHouseNum",function(req,res){
    var landlordaddress = req.body.address;
    console.log('landlordaddress = ' + landlordaddress);
    MyContract.methods.getLandlordHouseNum(landlordaddress).call({from: landlordaddress}).then(function(result){
        console.log('result: '+ result);
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/getLandlordHouse",function(req,res){
    var landlord_addr = req.body.address;
    var count = req.body.i;
    console.log('landlord_addr = ' + landlord_addr);
    console.log('housenum = ' + count);
    MyContract.methods.getLandlordHousebyAddr(landlord_addr,count).call({from: landlord_addr},function(error,result){
        //res.send({msg:"ok",resultt:result});
        if(!error){
            res.send({msg:"ok",resultt:result});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
        }
    })
})

app.post("/addtenant_success",function(req,res){
    var tenantaddress = req.body.tenantaddress;
    var rent = req.body.rent;
    var tenantlease = req.body.tenantlease;
    var housenumber = req.body.housenumber;
    var landlord_address = req.body.landlord_address;
    console.log(tenantaddress + ' , '+rent + ' , '+ tenantlease + ' , '+ housenumber + ' , '+ landlord_address)
    MyContract.methods.addTenant(tenantaddress,rent,tenantlease,housenumber,landlord_address).send({from: landlord_address},function(error,transactionHash){
        if(!error){
            console.log('need mined')
            console.log('transactionHash:',transactionHash)
            res.send({msg:"ok",transactionHash:transactionHash});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
        }
    });
})

app.post("/gettenantinfo",function(req,res){
    var address = req.body.address;
    console.log('address: ' + address)
    MyContract.methods.getTenant(address).call({from: address},function(error,result){
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/renttocontract", function(req, res){
    var tenantaddress = req.body.address;  
    var money = req.body.money;
    var password = req.body.password;
    console.log('tenantaddress: ' + tenantaddress + ' , '+ 'money:　' + money + ' , ' + 'password: '+ password);
    const weiValue = web3.utils.toWei(money, 'ether');
    web3.eth.personal.unlockAccount(tenantaddress,password,9999,function(){
        console.log('unlock accounts ok')
        MyContract.methods.rentToContract().send({from: tenantaddress, value: weiValue},function(error,transactionHash){
            if(!error){
                console.log('need mined')
                console.log('transactionHash:',transactionHash)
                res.send({msg:"ok",transactionHash:transactionHash});
            }else{
                console.log('-------------error-----------')
                console.log(error)
                console.log('-------------error-----------')
            }
        });
    });
}) 

app.post("/getcontractmoney",function(req,res){
    MyContract.methods.getContractMoney().call(function(error,result){
		const etherValue = web3.utils.fromWei(result, 'ether');
        res.send({msg:"ok",resultt:etherValue});
    })
})

app.post("/setTenantPowerCost",function(req,res){
    var power = req.body.power;
    var addrforpower = req.body.addrforpower;
    console.log('power: ' + power + ' , '+ 'addrforpower:　' + addrforpower)
    MyContract.methods.setTenantPowerCost(power,addrforpower).send({from: addrforpower},function(error,transactionHash){
        if(!error){
            console.log('need mined')
            console.log('transactionHash:',transactionHash)
            res.send({msg:"ok",transactionHash:transactionHash});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
        }
    });
})

app.post("/powerToContract", function(req, res){
    var tenantaddrforpower = req.body.tenantaddrforpower;  
    var money = req.body.powercost;
    var password = req.body.passwordforpower;
    console.log('tenantaddrforpower: ' + tenantaddrforpower + ' , '+ 'money:　' + money + ' , ' + 'password: '+ password);
    web3.eth.personal.unlockAccount(tenantaddrforpower,password,9999,function(){
		const weiValue = web3.utils.toWei(money, 'ether');
        console.log('unlock accounts ok')
        MyContract.methods.powerToContract().send({from: tenantaddrforpower, value: weiValue},function(error,transactionHash){
            if(!error){
                console.log('need mined')
                console.log('transactionHash:',transactionHash)
                res.send({msg:"ok",transactionHash:transactionHash});
            }else{
                console.log('-------------error-----------')
                console.log(error)
                console.log('-------------error-----------')
            }
        });
    });
}) 

app.post("/checkIfTenantsHadPaidRent",function(req,res){ //all tenants
    var number = req.body.number;
    console.log('number = ' + number);
    MyContract.methods.checkIfTenantsHadPaidRent(number).call(function(error,result){
        res.send({msg:"ok",resultt:result});
    })
})
app.post("/RentToLandlord",function(req,res){
    var number = req.body.number;
    var landlordAddr = req.body.landlordAddr;
    console.log('number = ' + number);
    console.log('address = ' + address);
    MyContract.methods.RentToLandlord(number).send({from: landlordAddr,gasPrice: 0},function(error,transactionHash){
        if(!error){
            console.log('need mined')
            console.log('transactionHash:',transactionHash)
            res.send({msg:"ok",transactionHash:transactionHash});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
            res.send({msg:"no"});
        }
    });
})

app.post("/checkIfTenantsHadPaidPower",function(req,res){ //all tenants
    var number = req.body.number;
    console.log('number = ' + number);
    MyContract.methods.checkIfTenantsHadPaidPower(number).call(function(error,result){
        res.send({msg:"ok",resultt:result});
    })
})
app.post("/PowerToLandlord",function(req,res){
    var number = req.body.number;
    var landlordAddr = req.body.landlordAddr;
    console.log('number = ' + number);
    console.log('address = ' + address);
    MyContract.methods.PowerToLandlord(number).send({from: landlordAddr,gasPrice: 0},function(error,transactionHash){
        if(!error){
            console.log('need mined')
            console.log('transactionHash:',transactionHash)
            res.send({msg:"ok",transactionHash:transactionHash});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
            res.send({msg:"no"});
        }
    });
})

