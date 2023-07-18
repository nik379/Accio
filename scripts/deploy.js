const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("accio");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    let txn = await domainContract.register("HarryPotter",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain HarryPotter.accio");
  
    txn = await domainContract.setRecord("HarryPotter", "Welcome to Hogwarts!!");
    await txn.wait();
    console.log("Set record for HarryPotter.accio");
  
    const address = await domainContract.getAddress("HarryPotter");
    console.log("Owner of domain HarryPotter:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();