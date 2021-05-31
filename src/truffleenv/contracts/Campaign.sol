// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";

contract Campaign is RefundEscrow {
    uint fundraisingTarget;
    uint64 endTime;
    address payable _beneficiary;
    RefundEscrow.State _state;
    
    /**
     * @dev Constructor.
     * @param beneficiary_ The beneficiary of the deposits.
     */
    constructor(address payable beneficiary_, uint _target, uint64 _endTime) RefundEscrow(beneficiary_){
        fundraisingTarget = _target;
        endTime = _endTime;
    }

    function deposit(address refundee) public payable virtual override {
        super.deposit(refundee);
    }
    
    function beforeFinish() public view returns (bool) {
        return block.timestamp < endTime;
    }
    
    function targetReached() public view returns (bool) {
        return address(this).balance >= fundraisingTarget;
    }

    function getStats() public view returns (uint, uint, uint) {
        return (fundraisingTarget, address(this).balance, endTime);
    }
    
}