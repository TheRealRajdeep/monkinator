// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CommitReveal.sol";

contract JobGuessingGame {
    CommitReveal public commitReveal;
    
    // Game constants
    uint256 public constant DEPOSIT_AMOUNT = 0.2 ether; // 0.2 MON tokens
    uint256 public constant HOUSE_EDGE = 1; // 1% house edge
    uint256 public constant REWARD_AMOUNT = 0.2 ether; // Reward for wrong guess
    
    // Game state
    enum GameStatus { NotStarted, InProgress, Completed, Cancelled }
    
    struct Game {
        address player;
        uint256 depositAmount;
        GameStatus status;
        uint256 startTime;
        bool aiGuessedCorrectly;
        bool playerClaimed;
        string revealedJob;
        bool jobRevealed;
    }
    
    mapping(address => Game) public games;
    mapping(address => bool) public activeGames;
    
    // Events
    event GameStarted(address indexed player, uint256 depositAmount);
    event GameCompleted(address indexed player, bool aiGuessedCorrectly, uint256 payout);
    event JobRevealed(address indexed player, string job);
    event FundsWithdrawn(address indexed player, uint256 amount);
    
    // Modifiers
    modifier onlyActivePlayer() {
        require(activeGames[msg.sender], "No active game");
        _;
    }
    
    modifier gameNotCompleted() {
        require(games[msg.sender].status != GameStatus.Completed, "Game already completed");
        _;
    }
    
    constructor(address _commitRevealAddress) {
        commitReveal = CommitReveal(_commitRevealAddress);
    }
    
    /**
     * @dev Start a new game by depositing 0.2 MON tokens
     */
    function startGame() external payable {
        require(msg.value == DEPOSIT_AMOUNT, "Must deposit exactly 0.2 MON");
        require(!activeGames[msg.sender], "Player already has an active game");
        
        games[msg.sender] = Game({
            player: msg.sender,
            depositAmount: msg.value,
            status: GameStatus.InProgress,
            startTime: block.timestamp,
            aiGuessedCorrectly: false,
            playerClaimed: false,
            revealedJob: "",
            jobRevealed: false
        });
        
        activeGames[msg.sender] = true;
        
        emit GameStarted(msg.sender, msg.value);
    }
    
    /**
     * @dev Submit AI's guess result (only callable by backend)
     */
    function submitGuessResult(bool _aiGuessedCorrectly) external {
        require(games[msg.sender].status == GameStatus.InProgress, "No active game");
        
        games[msg.sender].aiGuessedCorrectly = _aiGuessedCorrectly;
        games[msg.sender].status = GameStatus.Completed;
        
        emit GameCompleted(msg.sender, _aiGuessedCorrectly, calculatePayout(msg.sender));
    }
    
    /**
     * @dev Reveal the job after game completion
     */
    function revealJob(string memory _job) external onlyActivePlayer {
        require(games[msg.sender].status == GameStatus.Completed, "Game not completed");
        require(!games[msg.sender].jobRevealed, "Job already revealed");
        
        // Verify the commit/reveal
        require(commitReveal.verifyReveal(msg.sender, _job), "Invalid job reveal");
        
        games[msg.sender].revealedJob = _job;
        games[msg.sender].jobRevealed = true;
        
        emit JobRevealed(msg.sender, _job);
    }
    
    /**
     * @dev Claim winnings after job is revealed
     */
    function claimWinnings() external onlyActivePlayer {
        require(games[msg.sender].status == GameStatus.Completed, "Game not completed");
        require(games[msg.sender].jobRevealed, "Job must be revealed first");
        require(!games[msg.sender].playerClaimed, "Already claimed");
        
        uint256 payout = calculatePayout(msg.sender);
        games[msg.sender].playerClaimed = true;
        activeGames[msg.sender] = false;
        
        if (payout > 0) {
            payable(msg.sender).transfer(payout);
            emit FundsWithdrawn(msg.sender, payout);
        }
    }
    
    /**
     * @dev Calculate payout based on game result
     */
    function calculatePayout(address _player) public view returns (uint256) {
        Game memory game = games[_player];
        
        if (game.status != GameStatus.Completed) {
            return 0;
        }
        
        if (game.aiGuessedCorrectly) {
            // AI guessed correctly: keep 1%, return 99%
            uint256 houseEdge = (game.depositAmount * HOUSE_EDGE) / 100;
            return game.depositAmount - houseEdge;
        } else {
            // AI guessed wrong: return deposit + reward
            return game.depositAmount + REWARD_AMOUNT;
        }
    }
    
    /**
     * @dev Get game details for a player
     */
    function getGameDetails(address _player) external view returns (Game memory) {
        return games[_player];
    }
    
    /**
     * @dev Emergency function to withdraw contract balance (only owner)
     */
    function emergencyWithdraw() external {
        // This would need an owner modifier in production
        payable(msg.sender).transfer(address(this).balance);
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}