// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library CircleManagerStructs {
    struct CircleTransfer {
        address user;
        uint256 amount;
        uint64 sourceChain;
        uint64 destinationChain;
        uint256 timestamp;
    }
}