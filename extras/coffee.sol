pragma solidity ^0.4.2;

// Standard library modifier
contract owned {
    address owner;

    modifier onlyowner() {
        if (msg.sender != owner) {
            throw;
        }
        _;
    }

    function owned() {
        owner = msg.sender;
    }
}

// The smart contract tracking pedegrees
contract CoffeePedigree is owned {
    // Authorized manufacturers. Supply chains can only begin here.
    mapping(address => bool) manufacturers;

    // Add authorized manufacturer
    function addManufacturer(address manufacturer) onlyowner {
        manufacturers[manufacturer] = true;
    }

    // Access control
    modifier onlymanufacturer() {
        if (!manufacturers[msg.sender]) {
            throw;
        }
        _;
    }

    // Product package status
    enum PackageStatus {
        none,
        manufactured,
        shippedToDistributor,
        receivedByDistributor,
        shippedToDispensingPoint,
        receivedByDispensingPoint,
        soldToCustomer
    }

    // Product package data
    struct Package {
        PackageStatus status; // status of this particular package
        address authorization; // actor authorized for the next stage (encrypted in the future)
        string[] metaJSON; // various metadata encoded in JSON (encrypted in the future)
    }

    // Tracking database
    mapping(string => Package) tracking;

    // Query the status of a particular package id.
    // Does not require authorization.
    function status(string id) returns (PackageStatus) {
        return tracking[id].status;
    }

    // Query the metadata attached to a particular package id.
    // Does not require authorization.
    function meta(string id, uint n) returns (string) {
        return tracking[id].metaJSON[n];
    }

    // Wrong status
    event WrongPackageStatus(PackageStatus actual, PackageStatus expected);

    function wrongPackageStatus(string id, PackageStatus expected) returns (bool) {
        if (status(id) != expected) {
            WrongPackageStatus(status(id), expected);
            return true;
        }
        return false;
    }

    // Check authorization for logging
    function checkAuthorization(string id) {
        if(msg.sender != tracking[id].authorization) {
            throw;
        }
    }

    // Begin tracking product
    function createDP1(string id, string meta) onlymanufacturer {
        if (wrongPackageStatus(id, PackageStatus.none)) {
            return;
        }
        tracking[id].status = PackageStatus.manufactured;
        tracking[id].authorization = msg.sender;
        tracking[id].metaJSON.push(meta);
    }

    function step(
        string id,
        PackageStatus current,
        PackageStatus next,
        string meta) private returns (bool) {
        checkAuthorization(id);
        if (wrongPackageStatus(id, current)) {
            return true;
        }
        tracking[id].status = next;
        tracking[id].metaJSON.push(meta);
        return false;
    }

    // Ship product to distributor
    function shipDP1(string id, address distributor, string meta) {
        if(step(id,
            PackageStatus.manufactured,
            PackageStatus.shippedToDistributor,
            meta)) return;
        tracking[id].authorization = distributor;
    }

    // Receive product from manufacturer
    function receiveDP2(string id, string meta) {
        step(id,
            PackageStatus.shippedToDistributor,
            PackageStatus.receivedByDistributor,
            meta);
    }

    // Ship product to dispensing point
    function shipDP2(string id, address dispensingPoint, string meta) {
        if(step(id,
            PackageStatus.receivedByDistributor,
            PackageStatus.shippedToDispensingPoint,
            meta)) return;
        tracking[id].authorization = dispensingPoint;
    }

    // Receive product from distributor
    function receiveDP3(string id, string meta) {
        step(id,
            PackageStatus.shippedToDispensingPoint,
            PackageStatus.receivedByDispensingPoint,
            meta);
    }

    // Sell to customer
    function retailDP3(string id, string meta) {
        if(step(id,
            PackageStatus.receivedByDispensingPoint,
            PackageStatus.soldToCustomer,
            meta)) return;
        delete tracking[id].authorization;
    }
}
