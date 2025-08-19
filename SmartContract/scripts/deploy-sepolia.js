const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting Sepolia deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Get admin address from environment
  const adminAddress = process.env.ADMIN_ADDRESS || "0x0ed9eA994966a7c278d1512A265503dE35d868D7";
  console.log("👑 Admin address:", adminAddress);

  try {
    // Sepolia Network Configuration
    const SEPOLIA_CHAIN_SELECTOR = "16015286601757825753";
    const ARBITRUM_SEPOLIA_CHAIN_SELECTOR = "3478487238524512106";
    const BASE_SEPOLIA_CHAIN_SELECTOR = "10344971235874465080";

    // Sepolia CCIP Router Address (Chainlink's official address)
    const SEPOLIA_CCIP_ROUTER = "0xD0daae2231E9CB96b94C8512223533293C3693Bf";
    
    // USDC on Sepolia (Circle's official testnet address)
    const SEPOLIA_USDC = "0x1c7D4B196Cb0C7B01d743FbcD6D6B0C7B01d743Fb"; // Replace with actual Sepolia USDC address
    
    // For now, use a placeholder for yield optimizer
    const YIELD_OPTIMIZER_PLACEHOLDER = "0x0000000000000000000000000000000000000001";

    console.log("\n🔧 Deploying CircleManager to Sepolia...");
    
    const CircleManager = await ethers.getContractFactory("CircleManager");
    const circleManager = await CircleManager.deploy(
      SEPOLIA_CCIP_ROUTER,      // ccipRouter
      SEPOLIA_USDC,              // stablecoin
      adminAddress,               // aiAgent (using admin address)
      YIELD_OPTIMIZER_PLACEHOLDER, // yieldOptimizer (placeholder)
      SEPOLIA_CHAIN_SELECTOR     // currentChainSelector (Sepolia)
    );
    await circleManager.waitForDeployment();
    const circleManagerAddress = await circleManager.getAddress();
    console.log("✅ CircleManager deployed to:", circleManagerAddress);

    // Set up initial configuration
    console.log("\n⚙️ Setting up initial configuration...");
    
    // Set supported chains (before transferring ownership)
    await circleManager.updateSupportedChain(SEPOLIA_CHAIN_SELECTOR, true);
    await circleManager.updateSupportedChain(ARBITRUM_SEPOLIA_CHAIN_SELECTOR, true);
    await circleManager.updateSupportedChain(BASE_SEPOLIA_CHAIN_SELECTOR, true);
    console.log("✅ Supported chains configured");

    // Set cross-chain manager addresses (for now, use the same address)
    await circleManager.setCrossChainManager(SEPOLIA_CHAIN_SELECTOR, circleManagerAddress);
    await circleManager.setCrossChainManager(ARBITRUM_SEPOLIA_CHAIN_SELECTOR, circleManagerAddress);
    await circleManager.setCrossChainManager(BASE_SEPOLIA_CHAIN_SELECTOR, circleManagerAddress);
    console.log("✅ Cross-chain manager addresses configured");

    // Set default strategy
    await circleManager.setDefaultStrategy(0);
    console.log("✅ Default strategy set to 0");

    // Transfer ownership to admin (after all configuration)
    await circleManager.transferOwnership(adminAddress);
    console.log("✅ Ownership transferred to admin");

    console.log("\n🎉 Sepolia deployment completed successfully!");
    console.log("\n📋 Contract Addresses:");
    console.log("CircleManager:", circleManagerAddress);
    console.log("CCIP Router:", SEPOLIA_CCIP_ROUTER);
    console.log("USDC:", SEPOLIA_USDC);
    console.log("\n👑 Admin Address:", adminAddress);
    
    console.log("\n🔗 Next steps:");
    console.log("1. Verify contract on Sepolia Etherscan");
    console.log("2. Deploy to other testnets (Arbitrum Sepolia, Base Sepolia)");
    console.log("3. Set up cross-chain manager addresses for each network");
    console.log("4. Test cross-chain functionality");

    // Save deployment info
    const deploymentInfo = {
      network: "Sepolia",
      deployer: deployer.address,
      admin: adminAddress,
      contracts: {
        CircleManager: circleManagerAddress,
        CCIPRouter: SEPOLIA_CCIP_ROUTER,
        USDC: SEPOLIA_USDC
      },
      chainSelectors: {
        Sepolia: SEPOLIA_CHAIN_SELECTOR,
        ArbitrumSepolia: ARBITRUM_SEPOLIA_CHAIN_SELECTOR,
        BaseSepolia: BASE_SEPOLIA_CHAIN_SELECTOR
      },
      timestamp: new Date().toISOString()
    };

    console.log("\n📄 Deployment Info (save this):");
    console.log(JSON.stringify(deploymentInfo, null, 2));

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