var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var web3 = require("./getWeb3");

app.use(express.static(path.join(__dirname,'public2')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var abi2 = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_keepPet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_smoke",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drinking",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_gbfriend",
				"type": "uint256"
			}
		],
		"name": "addTenant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "changepaid",
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
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "distributePenalty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "penaltyToContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "recordPict",
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
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_petcoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_smokecoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drinkingcoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_gbfriendcoin",
				"type": "uint256"
			}
		],
		"name": "setCoinRule",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "getCoinRule",
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
		"name": "getPictAll",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "getPictNum",
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
		"name": "getTenantInfofromAddr",
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
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "getTenantsfromHouse",
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
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "getTenantsNumfromHouse",
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
				"internalType": "uint256",
				"name": "_whichPenalty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "howMuchPenalty",
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
		"name": "ifPaidPenalty",
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
	}
];

var address2='0x83ABf32B54fCeFa6a3a6706a2153fafc13F849E3'
var MyContract = new web3.eth.Contract(abi2, address2);

MyContract.methods.getContractMoney().call()
    .then(data => {
		const etherValue = web3.utils.fromWei(data, 'ether');
        console.log('lifecontract_money = ', etherValue)
    })
    .catch(function (error) {
        console.log('estimateGas error', error)
    });

app.listen(3000,function(){
    console.log('listen 3000')
});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public2/index2.html");
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

//新增房客生活公約資訊
app.post("/addTenant_success",function(req,res){
    var houseNumber = req.body.houseNumber;
    var tenantAddress = req.body.tenantAddress;
    var keeppet = req.body.keeppet;
    var smoke = req.body.smoke;
	var drinking = req.body.drinking;
	var gbfriend = req.body.gbfriend;
    console.log(houseNumber + ' , '+tenantAddress + ' , '+ keeppet + ' , '+ smoke+' , '+drinking+' , '+gbfriend);

    MyContract.methods.addTenant(houseNumber,tenantAddress,keeppet,smoke,drinking,gbfriend).send({from: tenantAddress},function(error,transactionHash){
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

//設定該房罰金
app.post("/setCoinRule_success",function(req,res){
    var houseNum = req.body.houseNum;
	var tenantAddr = req.body.tenantAddr;
    var petcoin = req.body.petcoin;
    var smokecoin = req.body.smokecoin;
	var drinkingcoin = req.body.drinkingcoin;
	var gbfriendcoin = req.body.gbfriendcoin;
    console.log(houseNum + ' , '+tenantAddr+' , '+ petcoin + ' , '+ smokecoin+' , '+drinkingcoin+' , '+gbfriendcoin);

    MyContract.methods.setCoinRule(houseNum,petcoin,smokecoin,drinkingcoin,gbfriendcoin).send({from: tenantAddr},function(error,transactionHash){
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

app.post("/getCoinRule",function(req,res){
    var house = req.body.house;
    console.log('house = ' + house);
    MyContract.methods.getCoinRule(house).call().then(function(result){
        console.log('result: '+ result);
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/getTenantsNumfromHouse",function(req,res){
    var housenum = req.body.housenum;
    console.log('housenum = ' + housenum);
    MyContract.methods.getTenantsNumfromHouse(housenum).call().then(function(result){
        console.log('result: '+ result);
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/getTenantsfromHouse",function(req,res){
    var housenum = req.body.housenum;
    var count = req.body.i;
    console.log('housenum = ' + housenum);
    console.log('tenantnum = ' + count);
    MyContract.methods.getTenantsfromHouse(housenum,count).call().then(function(error,result){
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

app.post("/getTenantInfofromAddr",function(req,res){
    var tenant = req.body.tenant;
    console.log('tenantaddress: ' + tenant)
    MyContract.methods.getTenantInfofromAddr(tenant).call({from: tenant},function(error,result){
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/recordPict_success",function(req,res){
    var pictUrl = req.body.pictUrl;
	var yourAddr = req.body.yourAddr;
    console.log(pictUrl + ' , '+yourAddr);
    MyContract.methods.recordPict(yourAddr,pictUrl).send({from: yourAddr},function(error,transactionHash){
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

app.post("/getPictNum",function(req,res){
    var owneraddr = req.body.owneraddr;
    console.log('owneraddr: ' + owneraddr)
    MyContract.methods.getPictNum(owneraddr).call({from: owneraddr},function(error,result){
        res.send({msg:"ok",resultt:result});
    })
})

app.post("/getPictAll",function(req,res){
    var owneraddr = req.body.owneraddr;
    var count = req.body.i;
    console.log('owneraddr = ' + owneraddr);
    console.log('pocture num = ' + count);
    MyContract.methods.getPictAll(owneraddr,count).call({from: owneraddr},function(error,result){
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

app.post("/penaltyToContract", function(req, res){
    var tenantaddress = req.body.address;  
    var money = req.body.money;
    var password = req.body.password;
    console.log('tenantaddress: ' + tenantaddress + ' , '+ 'money:　' + money + ' , ' + 'password: '+ password);
    const weiValue = web3.utils.toWei(money, 'ether');
    web3.eth.personal.unlockAccount(tenantaddress,password,9999,function(){
        console.log('unlock accounts ok')
        MyContract.methods.penaltyToContract().send({from: tenantaddress, value: weiValue},function(error,transactionHash){
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

app.post("/distributePenalty",function(req,res){
    var homenum = req.body.homenum;
	var address = req.body.address;
    console.log(homenum + ' , ' + address);
    MyContract.methods.distributePenalty(homenum).send({from: address},function(error,transactionHash){
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

app.post("/ifPaidPenalty",function(req,res){
    var tenantaddr = req.body.tenantaddr;
    console.log('tenantaddr = ' + tenantaddr);
    MyContract.methods.ifPaidPenalty(tenantaddr).call({from: tenantaddr},function(error,result){
        if(!error){
            res.send({msg:"ok",resultt:result});
        }else{
            console.log('-------------error-----------')
            console.log(error)
            console.log('-------------error-----------')
        }
    })
})

app.post("/changepaid",function(req,res){
    var tenantaddr = req.body.tenantaddr;
    console.log(tenantaddr + ' , ' + tenantaddr);
    MyContract.methods.changepaid(tenantaddr).send({from: tenantaddr},function(error,transactionHash){
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

app.post("/getcontractmoney",function(req,res){
    MyContract.methods.getContractMoney().call(function(error,result){
		const etherValue = web3.utils.fromWei(result, 'ether');
        res.send({msg:"ok",resultt:etherValue});
    })
})
