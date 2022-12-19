// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;                 

contract Supplychain{

    struct BatchTemplate{
        string batchTemplateID;
        string productTemplateID;
        string description;
        uint batchSize;
        address factoryADDRESS;
    }

    struct ProductTemplate{
        string productTemplateID;
        string name;
        string description;
    }

    mapping(string=>ProductTemplate) public ProductTemplateMAP;
    mapping(string=>BatchTemplate) public BatchTemplateMAP;
    
    string[] public ProductTemplateIDs;
    string[] public BatchTemplateIDs;

    function addBatchTemplate(
        string memory _batchTemplateID,
        string memory _productTemplateID,
        string memory _description,
        uint _batchSize,
        address _factoryADDRESS
    ) public{
        BatchTemplateMAP[_batchTemplateID]=BatchTemplate({
            batchTemplateID:_batchTemplateID,
            productTemplateID:_productTemplateID,
            description:_description,
            batchSize:_batchSize,
            factoryADDRESS:_factoryADDRESS            
        });
        BatchTemplateIDs.push(_batchTemplateID);
    }
    function addProductTemplate(
        string memory _productTemplateID,
        string memory _name,
        string memory _description
    ) public{
        ProductTemplateMAP[_productTemplateID]=ProductTemplate({
            productTemplateID:_productTemplateID,
            name:_name,
            description:_description          
        });
        ProductTemplateIDs.push(_productTemplateID);
    }   
    
    function getAllProductTemplateIDs() public view returns(string []memory){
        return ProductTemplateIDs;
    }

    function getAllBatchTemplateIDs() public view returns(string []memory){
        return BatchTemplateIDs;
    }

    // function shipBatchFromFactory(
        // string memory _productTemplateID,
        // string memory _batchTemplateID) public {
    // }
 
}