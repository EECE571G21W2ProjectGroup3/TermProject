//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract HouseRental {
    uint256 id;

    constructor() {}

    mapping(address => User) public users;
    mapping(address => TenantBackground) public backgrounds;
    mapping(address => HouseInfo) public houses;            
    
    //used when landlords need to fetch tenants background
    mapping(address => address[]) public landlordTenantsMap;

    //used when a tenant receives an invitation to sign an agreement from landlord
    mapping(address => address) public tenantLandlordMap;
 
    // structs
    struct User {
        string name;
        string password;
        string userType; //either "tenant" or "landlord"
        string phoneNumber;
        string email;
    }

    struct HouseInfo {
        string houseAddress;
        string rental;
        string description;
        string period; //Available from DD/MM/YYYY to DD/MM/YYYY
        bool isHouseAvailable; 
    }

    struct TenantBackground {
        uint age;
        uint income;
        bool isMale;        // true->male, false->female
        string occupation; //  "student etc"
    }

    function register (
        string memory _name, 
        string memory _password, 
        string memory _type, 
        string memory _phone, 
        string memory _email
    ) public returns (bool) {
        require(msg.sender != address(0), "address cannot be empty");
        require(bytes(users[msg.sender].name).length == 0, "current account already existed");
        require(bytes(_name).length > 0, "name can not be empty");
        require(bytes(_password).length > 0, "password can not be empty");
        require(bytes(_type).length > 0, "type can not be empty");
        require(bytes(_phone).length > 0, "phone can not be empty");
        require(bytes(_email).length > 0, "email can not be empty");
        users[msg.sender].name = _name;
        users[msg.sender].password = _password;
        users[msg.sender].userType = _type;
        users[msg.sender].phoneNumber = _phone;
        users[msg.sender].email = _email;
        return true;
    }

    function logIn (
        string memory _name, 
        string memory _password
    ) public view returns (bool) {
        require(msg.sender != address(0), "address cannot be empty");
        require(compareString(users[msg.sender].name, _name), "name does not match");
        require(compareString(users[msg.sender].password, _password), "password does not match");
        return true;
    }   

    function editHouseInfo( //add or change the HouseInfo (Set up front end)
        string memory _address, 
        string memory _rent, 
        string memory _description,
        string memory _period,
        bool _isAvailable
    ) public {
        require(isLandlord(msg.sender), "You should be a landlord to add your own background");
        houses[msg.sender].houseAddress = _address;
        houses[msg.sender].rental = _rent; 
        houses[msg.sender].description = _description; 
        houses[msg.sender].period = _period; 
        houses[msg.sender].isHouseAvailable = _isAvailable; 
    }

    function editBackground(
        uint _age,
        uint _income,
        bool _isMale,
        string memory _occupation
    ) public {
        require(isTenant(msg.sender), "You should be a tenant to edit your own background");
        backgrounds[msg.sender].age = _age;
        backgrounds[msg.sender].income = _income;
        backgrounds[msg.sender].isMale = _isMale;
        backgrounds[msg.sender].occupation = _occupation;
    }

    function checkAvailability(address _landlordAddress) public view returns(bool) {
        require(isTenant(msg.sender), "You should be a tenant to check house availability");
        require(isLandlord(_landlordAddress), "The one you check for availability should be a landlord");
        return houses[_landlordAddress].isHouseAvailable;
    }

    function sendBackground (address _to) public returns (bool) {
        require(isTenant(msg.sender), "You should be a tenant to send a record");
        require(isLandlord(_to), "You should send your record to a landlord");
        landlordTenantsMap[_to].push(msg.sender);
        return true;
    }

    function getPotentialTenants () public view returns (address[] memory) {
        require(isLandlord(msg.sender), "You should be a landlord to get your potential tenants' backgrounds");
        return landlordTenantsMap[msg.sender];
    }

    function getBackground (
        address _tenantAddress
    ) public view returns (
        string memory, 
        string memory,
        string memory,
        uint, 
        uint, 
        bool, 
        string memory
    ) {
        require(isLandlord(msg.sender), "You should be a landlord to get your potential tenants' backgrounds");
        return (
            users[_tenantAddress].name, users[_tenantAddress].phoneNumber, users[_tenantAddress].email,
            backgrounds[_tenantAddress].age, backgrounds[_tenantAddress].income, 
            backgrounds[_tenantAddress].isMale, backgrounds[_tenantAddress].occupation
        );
    }

    function sendAgreement(address _to) public returns (bool) {
        require(isLandlord(msg.sender), "You should be a landlord to send the agreement");
        require(isTenant(_to), "The agreement you sent to should be a tenant");
        require(houses[msg.sender].isHouseAvailable, "Your house is already sold/unavailable!");
        tenantLandlordMap[_to] = msg.sender;
        return true;
    }

    function signAgreement() public {
        require(isTenant(msg.sender), "You should be a tenant to sign this contract");
        houses[tenantLandlordMap[msg.sender]].isHouseAvailable = false;
    }

    function cancelMatch () public returns (bool) {
        if (compareString(users[msg.sender].userType, "tenant")) { //tenant cancel match
            tenantLandlordMap[msg.sender] = address(0);
            return true;
        }
        return false;
    }

    // helpers
    function isLandlord (address _addr) private view returns (bool) {
        return keccak256(abi.encodePacked(users[_addr].userType)) == keccak256(abi.encodePacked("landlord"));
    }

    function isTenant (address _addr) private view returns (bool) {
        return keccak256(abi.encodePacked(users[_addr].userType)) == keccak256(abi.encodePacked("tenant"));
    }

    function compareString (string memory _str1, string memory _str2) private pure returns (bool) {
        return keccak256(abi.encodePacked(_str1)) == keccak256(abi.encodePacked(_str2));
    }

    // function removeFromAddressList (address[] memory _addresses, uint index) public pure {
    //     delete _addresses[index];
    // }
}
