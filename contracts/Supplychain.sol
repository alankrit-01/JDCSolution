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

    struct Product{
        uint ProductID;
        string Name;
        string Description;
        string DOM;
    }   

    struct Batch{
        uint BatchID;
        uint[] productIDs;
        uint BatchSize;
        address Factory;
        address Distributor;
        string FactoryLocation;
        string DistributorLocation;
        uint DateOfProduction;
    }   

    mapping(uint=>Product) public ProductMapping;
    // uint[] public ProductID;
    mapping(uint=>Batch) public BatchMapping;
    uint[] public BatchIDs;
 
    function batchProduced(
        address factory,
        address distributor,
        // string memory name,
        // string memory description,
        uint batchSize,
        uint batchID,
        uint[] memory productID,
        string memory factoryLocation,
        string memory distributorLocation,
        uint dateOfProduction
    ) public{
        BatchMapping[batchID]=Batch({
            BatchID:batchID,
            productIDs:productID,
            BatchSize:batchSize,
            Factory:factory,
            Distributor:distributor,
            FactoryLocation:factoryLocation,
            DistributorLocation:distributorLocation,
            DateOfProduction:dateOfProduction 
        }); 
        BatchIDs.push(batchID);
    }
}