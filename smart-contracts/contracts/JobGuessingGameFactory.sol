// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./JobGuessingGame.sol";
import "./CommitReveal.sol";

contract JobGuessingGameFactory {
    CommitReveal public commitReveal;
    JobGuessingGame public gameContract;
    
    event GameContractDeployed(address indexed gameContract, address indexed commitReveal);
    
    constructor() {
        // Deploy CommitReveal contract first
        commitReveal = new CommitReveal();
        
        // Deploy JobGuessingGame with CommitReveal address
        gameContract = new JobGuessingGame(address(commitReveal));
        
        emit GameContractDeployed(address(gameContract), address(commitReveal));
    }
    
    /**
     * @dev Get contract addresses
     */
    function getContractAddresses() external view returns (address, address) {
        return (address(gameContract), address(commitReveal));
    }
}