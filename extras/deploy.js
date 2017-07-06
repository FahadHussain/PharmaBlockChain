var coffeepedigreeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"checkAuthorization","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"createDP1","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"receiveDP2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"retailDP3","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"manufacturer","type":"address"}],"name":"addManufacturer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"distributor","type":"address"},{"name":"meta","type":"string"}],"name":"shipDP1","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"dispensingPoint","type":"address"},{"name":"meta","type":"string"}],"name":"shipDP2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"expected","type":"uint8"}],"name":"wrongPackageStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"receiveDP3","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"n","type":"uint256"}],"name":"meta","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"actual","type":"uint8"},{"indexed":false,"name":"expected","type":"uint8"}],"name":"WrongPackageStatus","type":"event"}]);
personal.unlockAccount(administrator);
var coffeepedigree = coffeepedigreeContract.new(
   {
     from: administrator, 
     data: '0x60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b6110d18061003f6000396000f3606060405236156100ab576000357c01000000000000000000000000000000000000000000000000000000009004806305f3cccb146100b05780631aca71bc1461010b5780633703087a146101ad5780633a7cb0b81461024f5780635f8a5afa146102f15780636c699f1d1461030e578063b2e4ba42146103b9578063c7e6660814610464578063cdf8fb50146104de578063e8ca64f414610580578063ef36ba75146105ef576100ab565b610002565b34610002576101096004808035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506106bf565b005b34610002576101ab6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610761565b005b346100025761024d6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610a3d565b005b34610002576102ef6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610a51565b005b346100025761030c6004808035906020019091905050610ad5565b005b34610002576103b76004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610b79565b005b34610002576104626004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610c04565b005b34610002576104c66004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091905050610c8f565b60405180821515815260200191505060405180910390f35b346100025761057e6004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610d01565b005b34610002576105d96004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610d15565b6040518082815260200191505060405180910390f35b34610002576106516004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091905050610d75565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156106b15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b600260005081604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561075d57610002565b5b50565b600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615156107a657610002565b6107b1826000610c8f565b156107bb57610a38565b6001600260005083604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160006101000a81548160ff0219169083021790555033600260005083604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550600260005082604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060010160005080548060010182818154818355818115116109765781836000526020600020918201910161097591906108f8565b80821115610971576000818150805460018160011615610100020316600290046000825580601f1061092a5750610967565b601f0160209004906000526020600020908101906109669190610948565b808211156109625760008181506000905550600101610948565b5090565b5b50506001016108f8565b5090565b5b5050509190906000526020600020900160005b8390919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109d857805160ff1916838001178555610a09565b82800160010185558215610a09579182015b82811115610a085782518260005055916020019190600101906109ea565b5b509050610a349190610a16565b80821115610a305760008181506000905550600101610a16565b5090565b5050505b5b5050565b610a4b826002600384610e8f565b505b5050565b610a5f826005600684610e8f565b15610a6957610ad1565b600260005082604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160016101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b3157610002565b6001600160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b5b50565b610b87836001600284610e8f565b15610b9157610bff565b81600260005084604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050565b610c12836003600484610e8f565b15610c1c57610c8a565b81600260005084604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b505050565b600081610c9b84610d15565b141515610cf2577fb4dba17553b052f2b232cc709940ca89c8c1812d4ec3e2bcb4349dbaabb984fc610ccc84610d15565b83604051808381526020018281526020019250505060405180910390a160019050610cfb565b60009050610cfb565b92915050565b610d0f826004600584610e8f565b505b5050565b6000600260005082604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160009054906101000a900460ff169050610d70565b919050565b6020604051908101604052806000815260200150600260005083604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060010160005082815481101561000257906000526020600020900160005b508054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e7d5780601f10610e5257610100808354040283529160200191610e7d565b820191906000526020600020905b815481529060010190602001808311610e6057829003601f168201915b50505050509050610e89565b92915050565b6000610e9a856106bf565b610ea48585610c8f565b15610eb257600190506110c9565b82600260005086604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060005060000160006101000a81548160ff02191690830217905550600260005085604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390206000506001016000508054806001018281815481835581811511610fff57818360005260206000209182019101610ffe9190610f81565b80821115610ffa576000818150805460018160011615610100020316600290046000825580601f10610fb35750610ff0565b601f016020900490600052602060002090810190610fef9190610fd1565b80821115610feb5760008181506000905550600101610fd1565b5090565b5b5050600101610f81565b5090565b5b5050509190906000526020600020900160005b8490919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061106157805160ff1916838001178555611092565b82800160010185558215611092579182015b82811115611091578251826000505591602001919060010190611073565b5b5090506110bd919061109f565b808211156110b9576000818150600090555060010161109f565b5090565b505050600090506110c9565b94935050505056', 
     gas: '1300000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
