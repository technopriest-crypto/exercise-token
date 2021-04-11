pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC721/ERC721.sol";
// import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/VRFConsumerBase.sol";

contract ExerciseNFT is ERC721, VRFConsumerBase {
    bytes32 public keyHash;
    address public vrfCoordinator;
    uint256 internal fee;

    uint256 public randomResult;

    struct NFT {
        uint256 strength;
        uint256 speed;
        uint256 stamina;
        string name;
    }

    NFT[] public NFTs;

    mapping(bytes32 => string) public requestToCharacterName;
    mapping(bytes32 => address) public requestToSender;
    mapping(bytes32 => uint256) public requestToTokenId;

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash
    )
        public
        VRFConsumerBase(_vrfCoordinator, _linkToken)
        ERC721("ExerciseNFT", "EXNFT")
    {
        vrfCoordinator = _vrfCoordinator;
        keyHash = _keyHash;
        fee = 0.1 * 10**18; //0.1 LINK
    }

    function requestNewRandomNft(uint256 userProvidedSeed, string memory name)
        public
        returns (bytes32)
    {
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToCharacterName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 newId = NFTs.length;
        // uint256 strength = (randomNumber % 100);
        uint256 speed = ((randomNumber % 10000) / 100);
        //todo stamina => steps
        // uint256 steps = ??
        uint256 stamina = ((randomNumber % 1000000) / 10000);

        NFTs.push(
            NFT(strength, speed, stamina, requestToCharacterName[requestId])
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}
