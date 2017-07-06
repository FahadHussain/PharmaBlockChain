var config = {};

config.local = {};
config.web = {};
config.database = {};
config.bccredentials = {};
config.fb={};

config.local.hostaddress = "http://localhost:8545";
config.web.hostport = 3000;

config.database.hostaddress = "mongodb://localhost:27017/BlockChainApp"

config.bccredentials.admin = "0xea0f93575f888ce68413d9bfa3e5064a740b34d1";
config.bccredentials.password = "test";

config.fb.username = "key-1";
config.fb.password = "2TlJKnhbVkAPP5EubUBB";
config.fb.book = "58d6ced049ee860300e92ada";
config.fb.baseURL = "https://testnet.etherscan.io/tx/";
module.exports = config;
