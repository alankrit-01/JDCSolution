// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;                 

contract Supplychain{

    struct BatchTemplate{
        uint batchTemplateID;
        uint productTemplateID;
        string description;
        uint batchSize;
        address factoryADDRESS;
    }
             
    struct ProductTemplate{
        uint productTemplateID;
        string name;
        string description;
    }         

    struct Product{
        uint ProductID;
        uint ProductTemplateID;
        string DOM;
    }            
                 
    struct Batch{   
        uint BatchID; 
        uint BatchSize; 
        string BatchDescription;    
        uint ProductTemplateID;              
        address Factory;    
        address Distributor;
        address Retailer;    
        string FactoryLocation; 
        string DateOfProduction;
        uint state;
    }             


    mapping(uint=>ProductTemplate) public ProductTemplateMAP;
    mapping(uint=>BatchTemplate) public BatchTemplateMAP;

    uint[] public ProductTemplateIDs;
    uint[] public BatchTemplateIDs;

    mapping(uint=>Product) public ProductMapping;
    uint[] public ProductIDs;     
    mapping(uint=>Batch) public BatchMapping;
    mapping(uint=>uint[]) public BatchIDToProductIDMapping;
    uint[] public BatchIDs; 


    function addBatchTemplate(
        uint _batchTemplateID,
        uint _productTemplateID,
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
        uint _productTemplateID,
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
        // 
    ) public{
        BatchMapping[batchID]=Batch({
            BatchID:batchID,    
            // ProductIDs:productIDs,
            BatchSize:batchSize, 
            BatchDescription:batchDescription, 
            ProductTemplateID:productTemplateID,
            Factory:factory,
            Distributor:distributor,
            Retailer:address(0),
            FactoryLocation:factoryLocation,
            DateOfProduction:dateOfProduction,
            state:0
        });                       
        BatchIDs.push(batchID); 
        BatchIDToProductIDMapping[batchID]= productIDs;
        for(uint i=0;i<batchSize; i++){
            ProductMapping[productIDs[i]]=Product({
                ProductID:productIDs[i],
                ProductTemplateID:productTemplateID,
                DOM:dateOfProduction
            });
            ProductIDs.push(productIDs[i]);
        }  
    }

    function distributorSellToRetailer(uint batchID, address retailer) public{
        BatchMapping[batchID].Retailer=retailer;
        BatchMapping[batchID].state=1;
    }

    function getAllProductTemplateIDs() public view returns(uint []memory){
        return ProductTemplateIDs;
    }   

    function getAllBatchTemplateIDs() public view returns(uint []memory){
        return BatchTemplateIDs;
    }

    function getAllBatchIDs() public view returns(uint []memory){
        return BatchIDs;
    }

    function getAllProductIDs() public view returns(uint []memory){
        return ProductIDs;
    }

    function getProductIdsForaBatch(uint batchID) public view returns(uint []memory){
        return BatchIDToProductIDMapping[batchID];
    } 


      
}