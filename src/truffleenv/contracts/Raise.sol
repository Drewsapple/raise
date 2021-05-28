// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Campaign.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";


contract Raise {
    mapping(address => Campaign) campaignOwners;
    
    event CampaignLaunched(address payable beneficiary, string name);
    
    struct CampaignData {
        address payable beneficiary;
        
    }

    function createCampaign(string memory _name) public {
        Campaign justCreated = new Campaign(payable(msg.sender));
        emit CampaignLaunched(payable(address(justCreated)), _name);
    }
}
