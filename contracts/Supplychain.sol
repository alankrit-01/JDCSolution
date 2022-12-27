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
        // uint[] ProductIDs;  
        uint BatchSize; 
        string BatchDescription;    
        uint ProductTemplateID;              
        address Factory;    
        address Distributor;    
        string FactoryLocation; 
        // string DistributorLocation;
        string DateOfProduction;
    }   

    mapping(uint=>Product) public ProductMapping;
    // uint[] public ProductID;
    mapping(uint=>Batch) public BatchMapping;
    mapping(uint=>uint[]) public BatchIDToProductIDMapping;
    uint[] public BatchIDs;
 
    function batchProduced(
        uint batchID, 
        uint[] memory productIDs,
        uint batchSize,
        string memory batchDescription,
        uint productTemplateID,
        address factory,
        address distributor, 
        string memory factoryLocation,
        string memory dateOfProduction 
    ) public{                   
        BatchMapping[batchID]=Batch({
            BatchID:batchID,    
            // ProductIDs:productIDs,
            BatchSize:batchSize, 
            BatchDescription:batchDescription, 
            ProductTemplateID:productTemplateID,
            Factory:factory,
            Distributor:distributor,
            FactoryLocation:factoryLocation,
            DateOfProduction:dateOfProduction 
        });                       
        BatchIDs.push(batchID);  
        BatchIDToProductIDMapping[batchID]= productIDs;  
    }

    function getAllBatchIDs() public view returns(uint []memory){
        return BatchIDs;
    }

    function getProductIdsForaBatch(uint batchID) public view returns(uint []memory){
        return BatchIDToProductIDMapping[batchID];
    }
    
}