// contracts/ExerciseToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ExerciseToken.sol";

contract ExerciseTokenClaim is ChainlinkClient {

    uint256 public volume;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    ExerciseToken private exercise_token;

    mapping(bytes32 => address) private jobRequests;

    constructor(address _oracle, string memory _jobId, uint256 _fee, address _link, ExerciseToken _token) public {
        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
        exercise_token = _token;
    }

    function claimTokens() public {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillSteps.selector);
        req.add("requester", addressToString(msg.sender));

        bytes32 requestId = sendChainlinkRequestTo(oracle, req, fee);
        jobRequests[requestId] = msg.sender;

    }

    function fulfillSteps(bytes32 _requestId, uint256 _steps) public recordChainlinkFulfillment(_requestId) {
        exercise_token.mint(jobRequests[_requestId], _steps);
    }


    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function addressToString(address x) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(x));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
        }
        return string(str);
    }

}
