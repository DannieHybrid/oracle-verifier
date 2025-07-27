// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

error InvalidSignature();

contract OracleVerifier {
    address public oracle;
    mapping(bytes32 => bool) public verified;

    constructor(address _oracle) {
        oracle = _oracle;
    }

    function verify(bytes32 messageHash, bytes memory signature) external returns (bool) {
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        address recovered = recoverSigner(ethSignedMessageHash, signature);
        if (recovered != oracle) revert InvalidSignature();
        verified[messageHash] = true;
        return true;
    }

    function isVerified(bytes32 messageHash) external view returns (bool) {
        return verified[messageHash];
    }

    function getEthSignedMessageHash(bytes32 hash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "Invalid sig length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
