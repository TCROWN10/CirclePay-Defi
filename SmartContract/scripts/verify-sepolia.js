const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Starting contract verification on Sepolia...");

  // Contract addresses from deployment (replace with actual addresses)
  const CIRCLE_MANAGER_ADDRESS = "REPLACE_WITH_ACTUAL_ADDRESS";
  
  // Constructor arguments
  const SEPOLIA_CCIP_ROUTER = "0xD0daae2231E9CB96b94C8512223533293C3693Bf";
  const SEPOLIA_USDC = "0x1c7D4B196Cb0C7B01d743FbcD6D6B0C7B01d743Fb"; // Replace with actual Sepolia USDC
  const ADMIN_ADDRESS = "0x0ed9eA994966a7c278d1512A265503dE35d868D7";
  const YIELD_OPTIMIZER_PLACEHOLDER = "0x0000000000000000000000000000000000000001";
  const SEPOLIA_CHAIN_SELECTOR = "16015286601757825753";

  try {
    console.log("\n📋 Verification Details:");
    console.log("Contract:", CIRCLE_MANAGER_ADDRESS);
    console.log("Network: Sepolia");
    console.log("Constructor Args:");
    console.log("  - CCIP Router:", SEPOLIA_CCIP_ROUTER);
    console.log("  - USDC:", SEPOLIA_USDC);
    console.log("  - AI Agent:", ADMIN_ADDRESS);
    console.log("  - Yield Optimizer:", YIELD_OPTIMIZER_PLACEHOLDER);
    console.log("  - Chain Selector:", SEPOLIA_CHAIN_SELECTOR);

    console.log("\n🔗 Verification Commands:");
    console.log("1. Manual verification on Etherscan:");
    console.log(`   https://sepolia.etherscan.io/verifyContract?a=${CIRCLE_MANAGER_ADDRESS}`);
    
    console.log("\n2. Hardhat verification command:");
    console.log(`   npx hardhat verify --network sepolia ${CIRCLE_MANAGER_ADDRESS} "${SEPOLIA_CCIP_ROUTER}" "${SEPOLIA_USDC}" "${ADMIN_ADDRESS}" "${YIELD_OPTIMIZER_PLACEHOLDER}" "${SEPOLIA_CHAIN_SELECTOR}"`);

    console.log("\n3. Or use this script with actual addresses:");
    console.log("   - Update CIRCLE_MANAGER_ADDRESS in this script");
    console.log("   - Update SEPOLIA_USDC with actual USDC address");
    console.log("   - Run: node scripts/verify-sepolia.js");

  } catch (error) {
    console.error("❌ Verification script failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification script failed:", error);
    process.exit(1);
  }); 