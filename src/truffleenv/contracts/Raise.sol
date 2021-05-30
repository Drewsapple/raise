// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Campaign.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";
// import "@openzeppelin/contracts/proxy/Clones.sol";


contract Raise {
    mapping(address => Campaign) campaignOwners;
    
    event CampaignLaunched(address payable campaignContract);
    
    struct CampaignData {
        address payable beneficiary;
    }

    function createCampaign(uint _target, uint64 _endTime) public {
        Campaign justCreated = new Campaign(payable(msg.sender), _target, _endTime);
        emit CampaignLaunched(payable(address(justCreated)));
    }

    function depositToCampaign(address payable _campaign, address payable _refundee) public payable {
        Campaign c = Campaign(_campaign);
        require(c.beforeFinish());
        c.deposit{value: msg.value}(_refundee);
    }
    
    function finalizeCampaign(address payable _campaign) public {
        Campaign c = Campaign(_campaign);
        require(!c.beforeFinish());
        if(c.targetReached()) {
            c.close();
            c.beneficiaryWithdraw();
        }
        else{
            c.enableRefunds();
        }
    }
    
    function getBalance(address _campaign) public view returns (uint) {
        return _campaign.balance;
    } 
    
    function claimRefund(address _campaign, address payable _withdrawAddress) public {
        Campaign(_campaign).withdraw(_withdrawAddress);
    }
}
