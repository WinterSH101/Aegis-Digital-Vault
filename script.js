"use strict";

class InvalidKeyError extends Error{
    constructor(message) {
        super(message);
        this.name = "InvalidKeyError";
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
    if (key !== "SECRET_123"){
        throw new VaultLockedError("Incorrect key provided");
    }
    return "Access Granted";
}
function attemptEntry(key) {
    try {
        console.log(accessVault(key));
    } catch (e) {
        if (e instanceof InvalidKeyError) {
            console.log("Security Alert: System corruption detected.");
        } else if (e instanceof VaultLockedError) {
            console.log("User Error: Please try again");
        } else {
            throw e;
        }
    }finally {
        console.log("Vault attempt completed");
    }
}
attemptEntry("SECRET_123");
attemptEntry("WRONG_KEY");
attemptEntry(undefined);
attemptEntry(NaN);

function testError(key, expectedError){
    try {
        accessVault(key);
        return false;
    } catch (e) {
        return e instanceof expectedError;
    }
}
function runTest(name,result){
    if (result){
        console.log("PASS:" + name);
    } else {
        console.log("FAIL:" + name);
    }
}
console.log("\n---Vault Audit Tests ---");
runTest("Correct key", accessVault("SECRET_123")==="Access Granted");
runTest("Undefined key", testError(undefined,InvalidKeyError));
runTest("NaN key", testError(NaN, InvalidKeyError));
runTest("Wrong key", testError("WRONG_KEY", VaultLockedError));
