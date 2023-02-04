// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;                 

contract Supplychain{

    struct BatchTemplate{
        uint BatchTemplateID;
        uint ProductTemplateID;
        string Description;
        uint BatchSize;
        string FactoryID;
    } 

    struct ProductTemplate{
        uint ProductTemplateID;
        string Name;
        string Description;
        string FactoryID;
    }               

    struct Product{
        uint ProductID;
        uint BatchID;
        uint ProductTemplateID;
        string DOM;
        string OwnerID;
        uint DateWhenSold; 
    }            
                 
    struct Batch{        
        uint BatchID;    
        uint BatchSize;  
        uint AmountSold;  
        string BatchDescription;    
        uint ProductTemplateID;    
        string FactoryID;    
        string DistributorID;
        string RetailerID;    
        string FactoryLocation; 
        string DateOfProduction;
        uint State;            
        bool FactoryScanned;   
        bool DistributorScanned;   
        bool RetailerScanned;   
    }                               

    struct Customer{
        uint BatchID;
        uint ProductID;
    }

    mapping(uint=>ProductTemplate) public ProductTemplateMAP;
    mapping(uint=>BatchTemplate) public BatchTemplateMAP;
    mapping(uint=>Product) public ProductMapping;  
    mapping(uint=>Batch) public BatchMapping; 
    mapping(uint=>uint[]) public BatchIDToProductIDMapping; 
    // CustomerID -> Customer[]
    mapping(string =>Customer[]) public CustomerData;

    uint[] public ProductTemplateIDs;
    uint[] public BatchTemplateIDs; 
    uint[] public ProductIDs;     
    uint[] public BatchIDs; 

    // FactoryID -> BatchID -> bool
    // mapping(uint=>mapping(uint=>bool)) public BatchScanned;

    function addBatchTemplate(
        uint _batchTemplateID,
        uint _productTemplateID,
        string memory _description,
        uint _batchSize,
        string memory _factoryID
    ) public{ 
        require(checkInBatchTemplateIDs(_batchTemplateID)==false,"This BatchTemplateID already exists in the system");
        require(checkInProductTemplateIDs(_productTemplateID)==true,"This ProductTemplateID does not exists in the system");
        BatchTemplateMAP[_batchTemplateID]=BatchTemplate({
            BatchTemplateID:_batchTemplateID,
            ProductTemplateID:_productTemplateID,
            Description:_description,
            BatchSize:_batchSize,
            FactoryID:_factoryID            
        });
        BatchTemplateIDs.push(_batchTemplateID);
    }   

    function addProductTemplate(
        uint _productTemplateID,
        string memory _name,
        string memory _description,
        string memory _factoryID
    ) public{
        require(checkInProductTemplateIDs(_productTemplateID)==false,"This ProductTemplateID already exists in the system");
        ProductTemplateMAP[_productTemplateID]=ProductTemplate({
            ProductTemplateID:_productTemplateID,
            Name:_name,
            Description:_description,     
            FactoryID:_factoryID    
        });
        ProductTemplateIDs.push(_productTemplateID);
    }   
    

    function batchProduced(
        uint batchID, 
        uint[] memory productIDs, 
        uint batchSize, 
        string memory batchDescription, 
        uint productTemplateID, 
        string memory factory, 
        string memory distributor,  
        string memory factoryLocation,
        string memory dateOfProduction 
        // 
    ) public{
        require(checkInBatchIDs(batchID)==false,"BatchID already exists in the system");
        require(productIDs.length==batchSize,"Size of productIDs array does not match with Batch size");
        BatchMapping[batchID]=Batch({
            BatchID:batchID,    
            // ProductIDs:productIDs,
            BatchSize:batchSize, 
            AmountSold:0,
            BatchDescription:batchDescription, 
            ProductTemplateID:productTemplateID,
            FactoryID:factory,
            DistributorID:distributor,
            RetailerID:"",
            FactoryLocation:factoryLocation,
            DateOfProduction:dateOfProduction,
            State:0,
            FactoryScanned:false,  
            DistributorScanned:false, 
            RetailerScanned:false
        }); 
        BatchIDs.push(batchID); 
        BatchIDToProductIDMapping[batchID]= productIDs;
        for(uint i=0;i<batchSize; i++){
            require(checkInProductIDs(productIDs[i])==false,"ProductID already exists in the system");
            ProductMapping[productIDs[i]]=Product({
                ProductID:productIDs[i],
                BatchID:batchID,
                ProductTemplateID:productTemplateID,
                DOM:dateOfProduction,
                OwnerID:"",
                DateWhenSold:0
            });
            ProductIDs.push(productIDs[i]);
        }   
    }    

    function factoryScansBatch(uint batchID, string memory _factoryID) public{
        require(BatchMapping[batchID].FactoryScanned==false,"This batch is already scanned by the factory");
        require(keccak256(abi.encodePacked(BatchMapping[batchID].FactoryID))== keccak256(abi.encodePacked(_factoryID)),"This batch is not owned by this factory");
        BatchMapping[batchID].FactoryScanned=true;
    }

    function distributorScansBatch(uint batchID, string memory _distributorID) public{
        require(BatchMapping[batchID].DistributorScanned==false,"This batch is already scanned by the distributor");
        require(keccak256(abi.encodePacked(BatchMapping[batchID].DistributorID))== keccak256(abi.encodePacked(_distributorID)),"This batch is not owned by this distributor");
        BatchMapping[batchID].DistributorScanned=true;
    } 

    function distributorSellToRetailer(uint batchID, string memory retailerID) public{
        BatchMapping[batchID].RetailerID=retailerID;
        BatchMapping[batchID].State=1;
    }   

    function retailerScansBatch(uint batchID, string memory _retailerID) public{
        require(BatchMapping[batchID].RetailerScanned==false,"This batch is already scanned by the retailer");
        require(keccak256(abi.encodePacked(BatchMapping[batchID].RetailerID))== keccak256(abi.encodePacked(_retailerID)),"This batch is not owned by this retailer");
        BatchMapping[batchID].RetailerScanned=true;
    } 

    function retailerSellToCustomer(uint batchID,uint productID, string memory customerID) public {
        BatchMapping[batchID].AmountSold +=1;
        ProductMapping[productID].OwnerID=customerID;
        ProductMapping[productID].DateWhenSold=block.timestamp;
        CustomerData[customerID].push(Customer({
            BatchID:batchID,
            ProductID:productID
        }));
    }    

    function getAllProductsBought(string memory customerID) public view returns(Customer[] memory){
        return CustomerData[customerID];
    } 

    function getAllProductTemplateIDs() public view returns(uint []memory){
        return ProductTemplateIDs;
    }   

    function checkInProductTemplateIDs(uint _productTemplateID) internal view returns(bool){
        for(uint i=0; i<ProductTemplateIDs.length; i++){
            if(ProductTemplateIDs[i]==_productTemplateID) return true;
        }
        return false;
    }

    function getAllBatchTemplateIDs() public view returns(uint []memory){
        return BatchTemplateIDs;
    }   

    function checkInBatchTemplateIDs(uint _batchTemplateID) internal view returns(bool){
        for(uint i=0; i<BatchTemplateIDs.length; i++){
            if(BatchTemplateIDs[i]==_batchTemplateID) return true;
        }
        return false;
    }

    function getAllBatchIDs() public view returns(uint []memory){
        return BatchIDs;
    }

    function checkInBatchIDs(uint _batchID) internal view returns(bool){
        for(uint i=0; i<BatchIDs.length; i++){
            if(BatchIDs[i]==_batchID) return true;
        }
        return false;
    }

    function getAllProductIDs() public view returns(uint []memory){
        return ProductIDs;
    }

    function checkInProductIDs(uint _productID) internal view returns(bool){
        for(uint i=0; i<ProductIDs.length; i++){
            if(ProductIDs[i]==_productID) return true;
        }
        return false;
    }

    function getProductIdsForaBatch(uint batchID) public view returns(uint []memory){
        return BatchIDToProductIDMapping[batchID];
    }
}