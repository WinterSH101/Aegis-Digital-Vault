"use strict";

function accessVault(key){
    if (key === "SECRET_123"){
        return "Access Granted";
    } else {
        return "Access Denied";
    }
}
console.log(accessVault("SECRET_123"));
console.log(accessVault("WRONG_KEY"))
console.log(accessVault(""))
console.log(accessVault(12345));