const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Get admin address from environment
  const adminAddress = process.env.ADMIN_ADDRESS || "0x0ed9eA994966a7c278d1512A265503dE35d868D7";
  console.log("👑 Admin address:", adminAddress);

  // Deploy Mock contracts first
  console.log("\n🔧 Deploying Mock contracts...");
  
  const MockIYieldOptimizer = await ethers.getContractFactory("MockIYieldOptimizer");
  const mockYieldOptimizer = await MockIYieldOptimizer.deploy();
  await mockYieldOptimizer.deployed();
  console.log("✅ MockIYieldOptimizer deployed to:", mockYieldOptimizer.address);

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const mockUSDC = await MockERC20.deploy("Mock USDC", "mUSDC", 6);
  await mockUSDC.deployed();
  console.log("✅ Mock USDC deployed to:", mockUSDC.address);

  const MockIRouterClient = await ethers.getContractFactory("MockIRouterClient");
  const mockRouter = await MockIRouterClient.deploy();
  await mockRouter.deployed();
  console.log("✅ Mock Router deployed to:", mockRouter.address);

  // Deploy CircleManager
  console.log("\n🚀 Deploying CircleManager...");
  
  const CircleManager = await ethers.getContractFactory("CircleManager");
  const circleManager = await CircleManager.deploy(
    mockRouter.address,        // ccipRouter
    mockUSDC.address,          // stablecoin
    adminAddress,              // aiAgent (using admin address)
    mockYieldOptimizer.address, // yieldOptimizer
    16015286601757825753       // currentChainSelector (Sepolia)
  );
  await circleManager.deployed();
  console.log("✅ CircleManager deployed to:", circleManager.address);

  // Deploy TestCCIPReceiver
  console.log("\n🧪 Deploying TestCCIPReceiver...");
  
  const TestCCIPReceiver = await ethers.getContractFactory("TestCCIPReceiver");
  const testReceiver = await TestCCIPReceiver.deploy(circleManager.address);
  await testReceiver.deployed();
  console.log("✅ TestCCIPReceiver deployed to:", testReceiver.address);

  // Set up initial configuration
  console.log("\n⚙️ Setting up initial configuration...");
  
  // Transfer ownership to admin
  await circleManager.transferOwnership(adminAddress);
  console.log("✅ Ownership transferred to admin");

  // Set supported chains
  await circleManager.updateSupportedChain(16015286601757825753, true);  // Sepolia
  await circleManager.updateSupportedChain(3478487238524512106, true);   // Arbitrum Sepolia
  await circleManager.updateSupportedChain(10344971235874465080, true);  // Base Sepolia
  console.log("✅ Supported chains configured");

  // Set cross-chain manager addresses (for testing, use the same address)
  await circleManager.setCrossChainManager(16015286601757825753, circleManager.address);  // Sepolia
  await circleManager.setCrossChainManager(3478487238524512106, circleManager.address);   // Arbitrum Sepolia
  await circleManager.setCrossChainManager(10344971235874465080, circleManager.address);  // Base Sepolia
  console.log("✅ Cross-chain manager addresses configured");

  // Set default strategy
  await circleManager.setDefaultStrategy(0);
  console.log("✅ Default strategy set to 0");

  // Mint some USDC to the contract for testing
  await mockUSDC.mint(circleManager.address, ethers.utils.parseUnits("10000", 6));
  console.log("✅ Minted 10,000 USDC to CircleManager");

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("CircleManager:", circleManager.address);
  console.log("Mock USDC:", mockUSDC.address);
  console.log("Mock Yield Optimizer:", mockYieldOptimizer.address);
  console.log("Mock Router:", mockRouter.address);
  console.log("Test CCIP Receiver:", testReceiver.address);
  console.log("\n👑 Admin Address:", adminAddress);
  
  console.log("\n🔗 Next steps:");
  console.log("1. Verify contracts on Etherscan");
  console.log("2. Test cross-chain functionality");
  console.log("3. Deploy to other testnets");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 