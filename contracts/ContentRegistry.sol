// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ContentRegistry {
    uint256 public contentCounter;
    address public owner;
    address public executor; // AI worker address

    struct Content {
        address user;
        string sourceURI;
        string summaryCID;
        string flashcardsCID;
        string quizCID;
        string audioCID;
        uint256 timestamp;
        bool processed;
    }

    mapping(uint256 => Content) public contents;
    mapping(address => uint256[]) public userContentIds;

    event ContentSubmitted(uint256 indexed id, address indexed user, string sourceURI);
    event ContentProcessed(uint256 indexed id, string summaryCID, string flashcardsCID, string quizCID, string audioCID);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyExecutor() {
        require(msg.sender == executor, "Not executor");
        _;
    }

    constructor() {
        owner = msg.sender;
        executor = msg.sender; // You can update this later to a different AI backend address
    }

    function setExecutor(address _executor) external onlyOwner {
        executor = _executor;
    }

    function submitContent(string calldata _sourceURI) external {
        contentCounter += 1;

        contents[contentCounter] = Content({
            user: msg.sender,
            sourceURI: _sourceURI,
            summaryCID: "",
            flashcardsCID: "",
            quizCID: "",
            audioCID: "",
            timestamp: block.timestamp,
            processed: false
        });

        userContentIds[msg.sender].push(contentCounter);
        emit ContentSubmitted(contentCounter, msg.sender, _sourceURI);
    }

    function updateCIDs(
        uint256 _id,
        string calldata _summaryCID,
        string calldata _flashcardsCID,
        string calldata _quizCID,
        string calldata _audioCID
    ) external onlyExecutor {
        require(_id > 0 && _id <= contentCounter, "Invalid ID");
        require(!contents[_id].processed, "Already processed");

        contents[_id].summaryCID = _summaryCID;
        contents[_id].flashcardsCID = _flashcardsCID;
        contents[_id].quizCID = _quizCID;
        contents[_id].audioCID = _audioCID;
        contents[_id].processed = true;

        emit ContentProcessed(_id, _summaryCID, _flashcardsCID, _quizCID, _audioCID);
    }

    function getUserContentIds(address _user) external view returns (uint256[] memory) {
        return userContentIds[_user];
    }

    function getContent(uint256 _id) external view returns (Content memory) {
        return contents[_id];
    }
}

