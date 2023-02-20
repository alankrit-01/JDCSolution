// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;        
import "hardhat/console.sol";         

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
        string CustomerID; 
        string RetailerID;     
        bool RetailerScanned;    
        string RetailerScannedTimeStamp;    
        string DateWhenSoldToRetailer;
        string DateWhenSoldToCustomer;
    }           
                 
    struct Batch{      
        // string Name;
        // string Description;   
        uint BatchID;     
        uint BatchSize;    
        uint AmountSoldTOCustomer;  
        string BatchDescription;     
        uint ProductTemplateID;    
        string FactoryID;    
        string DistributorID;
        string FactoryLocation; 
        string DateOfProduction;
        uint State;            
        // bool FactoryScanned;   
        bool DistributorScanned; 
        string  DistributorScannedTimeStamp;
        uint AmountLeftForSellingTORetailer;  
    }                               

    struct Customer{
        uint BatchID;
        uint ProductID;
    } 

    struct Retailer{
        string DistributorID;
        string RetailerID;   
        uint BatchID; 
        uint Quantity; 
        string TimeStamp; 
    } 

    mapping(uint=>ProductTemplate) public ProductTemplateMAP;
    mapping(uint=>BatchTemplate) public BatchTemplateMAP;
    mapping(uint=>Product) public ProductMapping;  
    mapping(uint=>Batch) public BatchMapping; 
    mapping(uint=>uint[]) public BatchIDToProductIDMapping; 
    mapping(string =>Customer[]) public CustomerData;
    
    mapping(string=>Retailer[]) public DistributorIDToRetailerStruct; 
    mapping(string=>Retailer[]) public RetailerIDToRetailerStruct; 

    // mapping(string=>uint) public RetailerIDToProductID;   


    uint[] public ProductTemplateIDs;
    uint[] public BatchTemplateIDs; 
    uint[] public ProductIDs;     
    uint[] public BatchIDs;  

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
            AmountSoldTOCustomer:0,
            BatchDescription:batchDescription, 
            ProductTemplateID:productTemplateID,
            FactoryID:factory,
            DistributorID:distributor,
            // RetailerID:"",
            FactoryLocation:factoryLocation,
            DateOfProduction:dateOfProduction,
            State:0,
            // FactoryScanned:false,  
            DistributorScanned:false,
            DistributorScannedTimeStamp:"",
            AmountLeftForSellingTORetailer:batchSize
            // RetailerScanned:false
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
                CustomerID:"",
                RetailerID:"",
                RetailerScanned:false,
                RetailerScannedTimeStamp:"",
                DateWhenSoldToRetailer:"",
                DateWhenSoldToCustomer:""
            });
            ProductIDs.push(productIDs[i]);
        }   
    }    

    // function factoryScansBatch(uint batchID, string memory _factoryID) public{
    //     require(BatchMapping[batchID].FactoryScanned==false,"This batch is already scanned by the factory");
    //     require(keccak256(abi.encodePacked(BatchMapping[batchID].FactoryID))== keccak256(abi.encodePacked(_factoryID)),"This batch is not owned by this factory");
    //     BatchMapping[batchID].FactoryScanned=true;
    // }   

    function distributorScansBatch(uint batchID, string memory _distributorID,string memory timeStamp) public{
        require(BatchMapping[batchID].DistributorScanned==false,"This batch is already scanned by the distributor");
        require(keccak256(abi.encodePacked(BatchMapping[batchID].DistributorID))== keccak256(abi.encodePacked(_distributorID)),"This batch is not owned by this distributor");
        BatchMapping[batchID].DistributorScanned=true;
        BatchMapping[batchID].DistributorScannedTimeStamp=timeStamp;
    } 

    // distributor k saare sells?  DONE
    // retailer k buys . 

    // batchSize -20
    // sold - 5
    // amountleft -15
    // quantity -3
    // array  5,6,7
    // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    //  s s s s s 

    // Cant buy same product 

    // Distributor Screen
    // View batch received from factory
    // Sell to retailers
    // View to whom retailers he has send 
    // distributor,  retailer, productIDs
    // distributor -> retailerID[] 
    // distributor -> retailerID ->retailerStruct[]
    // retailerStruct -> batchIDs, quantities 

    function distributorSellToRetailer(uint batchID, uint quantity, string memory retailerID, string memory timeStamp) public{
        uint amountLeft =BatchMapping[batchID].AmountLeftForSellingTORetailer;
        uint batchSize =BatchMapping[batchID].BatchSize;
        string memory d =BatchMapping[batchID].DistributorID;
        require(amountLeft>=quantity,"Quantity is greater than the amount left to be sold in this batch");
        require(quantity>0,"Quantity cannot be zero");
        // require(BatchMapping[batchID].DistributorID==distributorID,"Quantity cannot be zero");
        uint sold = batchSize-amountLeft; 
        uint[] memory productIDs =BatchIDToProductIDMapping[batchID];
        for(uint i=sold; i<(sold+quantity); i++){
            uint ID =productIDs[i];
            Product memory p=ProductMapping[ID];
            p.RetailerID=retailerID;
            p.DateWhenSoldToRetailer=timeStamp;
            ProductMapping[ID]=p;
        } 
        BatchMapping[batchID].AmountLeftForSellingTORetailer-=quantity;
        // DistributorIDToRetailerStruct
        Retailer memory r = Retailer({ 
            DistributorID:d,
            RetailerID: retailerID,
            BatchID:batchID,
            Quantity:quantity,
            TimeStamp:timeStamp
        }); 
        DistributorIDToRetailerStruct[d].push(r); 
        RetailerIDToRetailerStruct[retailerID].push(r); 
    }     

    function retailerSellToAnotherRetailer(uint batchID, uint quantity, string memory retailerID, string memory timeStamp) public{
        uint amountLeft =BatchMapping[batchID].AmountLeftForSellingTORetailer;
        uint batchSize =BatchMapping[batchID].BatchSize;
        string memory d =BatchMapping[batchID].DistributorID;   
        // require(amountLeft>=quantity,"Quantity is greater than the amount left to be sold in this batch");
        require(quantity>0,"Quantity cannot be zero");
        
        uint sold = batchSize-amountLeft; 
        uint[] memory productIDs =BatchIDToProductIDMapping[batchID];
        for(uint i=sold; i<(sold+quantity); i++){
            uint ID =productIDs[i];
            Product memory p=ProductMapping[ID];
            p.RetailerID=retailerID;
            p.DateWhenSoldToRetailer=timeStamp;
            ProductMapping[ID]=p;
        } 
        BatchMapping[batchID].AmountLeftForSellingTORetailer-=quantity;
        
        Retailer memory r = Retailer({ 
            DistributorID:d,
            RetailerID: retailerID,
            BatchID:batchID,
            Quantity:quantity,
            TimeStamp:timeStamp
        }); 
        DistributorIDToRetailerStruct[d].push(r); 
        RetailerIDToRetailerStruct[retailerID].push(r); 
    }      

    function retailerScansProduct(uint _productID, string memory _retailerID,string memory timeStamp) public{
        require(ProductMapping[_productID].RetailerScanned==false,"This batch is already scanned by the retailer");
        require(keccak256(abi.encodePacked(ProductMapping[_productID].RetailerID))== keccak256(abi.encodePacked(_retailerID)),"This product is not owned by this retailer");
        ProductMapping[_productID].RetailerScanned=true; 
        ProductMapping[_productID].RetailerScannedTimeStamp=timeStamp; 
    }        

    function retailerSellToCustomer(uint batchID,uint productID, string memory customerID,string memory timeStamp) public {
        BatchMapping[batchID].AmountSoldTOCustomer +=1;
        ProductMapping[productID].CustomerID=customerID;
        ProductMapping[productID].DateWhenSoldToCustomer=timeStamp;
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

    function getDistributorIDToRetailerStruct(string memory distributorID) public view returns(Retailer []memory){
        return DistributorIDToRetailerStruct[distributorID];
    }

    function getRetailerIDToRetailerStruct(string memory retailerID) public view returns(Retailer []memory){
        return RetailerIDToRetailerStruct[retailerID];
    }

}