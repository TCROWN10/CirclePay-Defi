// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts-ccip/contracts/libraries/Client.sol"; // Import Chainlink's Client library
import "../core/CircleManager.sol"; // Import your CircleManager contract

/**
 * @title TestCCIPReceiver
 * @dev Helper contract for testing the internal _ccipReceive function of CircleManager.
 * This contract is deployed on the same chain as CircleManager in tests.
 */
contract TestCCIPReceiver {
    // A reference to the CircleManager contract that this mock will interact with.
    CircleManager public targetManager;

    /**
     * @dev Constructor to set the address of the CircleManager.
     * @param _targetManager The address of the CircleManager instance to test.
     * Changed to 'address payable' because CircleManager has a payable receive/fallback function.
     */
    constructor(address payable _targetManager) {
        targetManager = CircleManager(_targetManager);
    }

    /**
     * @dev This function allows external test code to call the internal _ccipReceive
     * function on the target CircleManager indirectly, via a new test-only external helper.
     * @param message The Any2EVMMessage struct to pass to _ccipReceive.
     */
    function callInternalCCIPReceive(Client.Any2EVMMessage memory message) external {
        // Call the new external helper function on CircleManager
        // This function will in turn call the internal _ccipReceive.
        targetManager.__testReceiveCCIPMessage(message);
    }

    // Allows this contract to receive native tokens (e.g., ETH) if needed for tests.
    receive() external payable {}
}

