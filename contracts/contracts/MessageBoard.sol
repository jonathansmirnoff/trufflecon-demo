pragma solidity ^0.5.8;

//Contract is just like classes
contract MessageBoard {
    //Defining User structure. address is a variable type from solidity
    struct User {
        address _address;
        string name;
        bool isValue;
        bool messageSent;
    }

    //Defining Message structure. You can see it have User type member
    struct Message {
        address userAddress;
        string text;
    }

    //Declaring an event
    event MessageCreated(address userAddress, string text);

    //Constructor
    constructor() public {

    }

    //mapping is a key value store. We are specified type of key and value
    mapping (address => User) users;

    // public function, which is returning boolean
    function setUsername(string memory name) public returns (bool) {
        //require() is throwing error, if the input is not true
        require(!userExists(msg.sender), "User is registered");
        //msg.sender is the address, from where the signUp was called.
        users[msg.sender] = User(msg.sender, name, true, false);
        return true;
    }

    //8 bit unsigned integer (so no negative values).
    uint8 public messageCount;

    //it is creating an event Message with text and user.
    function sendMessage (string memory text) public returns (bool) {
        //require() is throwing error, if the input is not true
        require(userExists(msg.sender), "User must be register");
        require(!userSentMessage(msg.sender), "User has already sent a message");
        messageCount++;
        users[msg.sender].messageSent = true;
        emit MessageCreated(msg.sender, text);
        return true;
    }

    function userExists(address userAddress) public view returns (bool) {
        return users[userAddress].isValue;
    }

    function userSentMessage(address userAddress) public view returns (bool) {
        return users[userAddress].messageSent;
    }

    function getUserName(address userAddress) public view returns (string memory) {
        return users[userAddress].name;
    }
}