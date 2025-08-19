// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library CircleManagerEvents {
    event CircleTransferInitiated(address indexed user, uint256 amount, uint64 destinationChain, bytes32 messageId);
    event CircleTransferReceived(address indexed user, uint256 amount, uint64 sourceChain);
    event CircleRebalanceTriggered(address indexed user, uint256 amount, uint64 destinationChain, bytes32 messageId);
    event CircleRebalanceExecuted(address indexed user, uint256 positionIndex, uint256 newStrategyId, uint256 amount);
}