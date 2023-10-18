/**
 * @fileoverview Abstract user class for various scoped users
 * @module User
 */

class User {
    /**
     * Create a user instance
     * @constructor 
     * @param {string} uid Casdoor uid is GUID 
     */
    constructor(){
        this.uid = uid;
    }
    /**
     * 
     * @param {Object} profile profile object with all required keys 
     * @returns {bool} Returns boolean on saving profile status
     */
    saveProfile(profile){
    }
    deactivate(){
    }
}