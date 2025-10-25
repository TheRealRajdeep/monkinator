// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CommitReveal {
    struct Commit {
        bytes32 hash;
        uint256 timestamp;
        bool revealed;
    }
    
    mapping(address => Commit) public commits;
    mapping(address => string) public revealedJobs;
    
    uint256 public constant COMMIT_DURATION = 1 hours; // Time window for commits
    uint256 public constant REVEAL_DURATION = 24 hours; // Time window for reveals
    
    event JobCommitted(address indexed player, bytes32 hash);
    event JobRevealed(address indexed player, string job);
    
    /**
     * @dev Commit a job hash before starting the game
     */
    function commitJob(bytes32 _jobHash) external {
        require(commits[msg.sender].hash == bytes32(0), "Already committed");
        
        commits[msg.sender] = Commit({
            hash: _jobHash,
            timestamp: block.timestamp,
            revealed: false
        });
        
        emit JobCommitted(msg.sender, _jobHash);
    }
    
    /**
     * @dev Reveal the actual job after game completion
     */
    function revealJob(string memory _job) external {
        Commit storage commit = commits[msg.sender];
        require(commit.hash != bytes32(0), "No commit found");
        require(!commit.revealed, "Already revealed");
        require(block.timestamp <= commit.timestamp + COMMIT_DURATION + REVEAL_DURATION, "Reveal period expired");
        
        bytes32 revealedHash = keccak256(abi.encodePacked(_job, msg.sender));
        require(revealedHash == commit.hash, "Hash mismatch");
        
        commit.revealed = true;
        revealedJobs[msg.sender] = _job;
        
        emit JobRevealed(msg.sender, _job);
    }
    
    /**
     * @dev Verify if a job reveal is valid
     */
    function verifyReveal(address _player, string memory _job) external view returns (bool) {
        Commit memory commit = commits[_player];
        if (commit.hash == bytes32(0) || !commit.revealed) {
            return false;
        }
        
        bytes32 revealedHash = keccak256(abi.encodePacked(_job, _player));
        return revealedHash == commit.hash;
    }
    
    /**
     * @dev Get commit details for a player
     */
    function getCommit(address _player) external view returns (Commit memory) {
        return commits[_player];
    }
    
    /**
     * @dev Check if a player has committed
     */
    function hasCommitted(address _player) external view returns (bool) {
        return commits[_player].hash != bytes32(0);
    }
    
    /**
     * @dev Check if a player has revealed
     */
    function hasRevealed(address _player) external view returns (bool) {
        return commits[_player].revealed;
    }
}