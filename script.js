"use strict";

class InvalidKeyError extends Error{
    constructor(message) {
        super(message);
        this.name = "InvalidKeyError"
    }
}
class VaultLockedError extends Error{
    constructor(message) {
        super(message);
        this.name = "VaultLockedError";
    }
}
function accessVault(key){
    if (key === undefined || Number.isNaN(key)){
        throw new InvalidKeyError("Key is missing or corrupted");
    }
    if (key === "SECRET_123"){
        throw new VaultLockedError("Incorrect key provided");
    }
    return "Access Granted";
}
console.log(accessVault("SECRET_123"));
console.log(accessVault("WRONG_KEY"));