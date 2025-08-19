const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting simplified deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Get admin address from environment
  const adminAddress = process.env.ADMIN_ADDRESS || "0x0ed9eA994966a7c278d1512A265503dE35d868D7";
  console.log("👑 Admin address:", adminAddress);

  try {
    // Deploy MockERC20 first
    console.log("\n🔧 Deploying MockERC20...");
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const mockUSDC = await MockERC20.deploy("Mock USDC", "mUSDC", 6);
    await mockUSDC.waitForDeployment();
    const mockUSDCAddress = await mockUSDC.getAddress();
    console.log("✅ MockERC20 deployed to:", mockUSDCAddress);

    // Deploy MockIRouterClient
    console.log("\n🔧 Deploying MockIRouterClient...");
    const MockIRouterClient = await ethers.getContractFactory("MockIRouterClient");
    const mockRouter = await MockIRouterClient.deploy();
    await mockRouter.waitForDeployment();
    const mockRouterAddress = await mockRouter.getAddress();
    console.log("✅ MockIRouterClient deployed to:", mockRouterAddress);

    // Create a simple mock yield optimizer address for now
    const mockYieldOptimizerAddress = "0x0000000000000000000000000000000000000001";
    console.log("🔧 Using mock yield optimizer address:", mockYieldOptimizerAddress);

    // Deploy CircleManager
    console.log("\n🚀 Deploying CircleManager...");
    const CircleManager = await ethers.getContractFactory("CircleManager");
    const circleManager = await CircleManager.deploy(
      mockRouterAddress,         // ccipRouter
      mockUSDCAddress,           // stablecoin
      adminAddress,              // aiAgent (using admin address)
      mockYieldOptimizerAddress, // yieldOptimizer (mock address)
      "16015286601757825753"     // currentChainSelector (Sepolia)
    );
    await circleManager.waitForDeployment();
    const circleManagerAddress = await circleManager.getAddress();
    console.log("✅ CircleManager deployed to:", circleManagerAddress);

    // Set up initial configuration
    console.log("\n⚙️ Setting up initial configuration...");
    
    // Set supported chains (before transferring ownership)
    await circleManager.updateSupportedChain("16015286601757825753", true);  // Sepolia
    await circleManager.updateSupportedChain("3478487238524512106", true);   // Arbitrum Sepolia
    await circleManager.updateSupportedChain("10344971235874465080", true);  // Base Sepolia
    console.log("✅ Supported chains configured");

    // Set cross-chain manager addresses (for testing, use the same address)
    await circleManager.setCrossChainManager("16015286601757825753", circleManagerAddress);  // Sepolia
    await circleManager.setCrossChainManager("3478487238524512106", circleManagerAddress);   // Arbitrum Sepolia
    await circleManager.setCrossChainManager("10344971235874465080", circleManagerAddress);  // Base Sepolia
    console.log("✅ Cross-chain manager addresses configured");

    // Set default strategy
    await circleManager.setDefaultStrategy(0);
    console.log("✅ Default strategy set to 0");

    // Transfer ownership to admin (after all configuration)
    await circleManager.transferOwnership(adminAddress);
    console.log("✅ Ownership transferred to admin");

    // Mint some USDC to the contract for testing
    await mockUSDC.mint(circleManagerAddress, ethers.parseUnits("10000", 6));
    console.log("✅ Minted 10,000 USDC to CircleManager");

    console.log("\n🎉 Deployment completed successfully!");
    console.log("\n📋 Contract Addresses:");
    console.log("CircleManager:", circleManagerAddress);
    console.log("Mock USDC:", mockUSDCAddress);
    console.log("Mock Router:", mockRouterAddress);
    console.log("Mock Yield Optimizer:", mockYieldOptimizerAddress);
    console.log("\n👑 Admin Address:", adminAddress);
    
    console.log("\n🔗 Next steps:");
    console.log("1. Verify contracts on Etherscan");
    console.log("2. Test cross-chain functionality");
    console.log("3. Deploy to other testnets");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 