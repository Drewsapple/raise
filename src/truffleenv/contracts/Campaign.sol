// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";

contract Campaign is RefundEscrow {
    uint fundsRaised;
    address payable _beneficiary;
    RefundEscrow.State _state;
    
    /**
     * @dev Constructor.
     * @param beneficiary_ The beneficiary of the deposits.
     */
    constructor(address payable beneficiary_) RefundEscrow(beneficiary_){
    }
    
}