// src/server.ts
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
var app = express();
var PORT = process.env.PORT || 3001;
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    agent: "ready",
    character: "Circle"
  });
});
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationId, userId = "web_user" } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Message is required"
      });
    }
    const roomId = conversationId || `room_${userId}_${Date.now()}`;
    console.log("Received chat request:", {
      message: message.trim(),
      conversationId: roomId,
      userId
    });
    let agentResponse = generateCircleResponse(message.trim());
    console.log("Generated response:", {
      responseLength: agentResponse.length,
      preview: agentResponse.substring(0, 100) + "..."
    });
    res.json({
      success: true,
      response: agentResponse,
      conversationId: roomId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      messageId: uuidv4()
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    const fallbackResponse = "I'm experiencing some technical difficulties right now. As your DeFi assistant, I'm here to help with questions about decentralized finance, yield farming, liquidity provision, and DeFi protocols. Please try your question again!";
    res.status(500).json({
      success: false,
      error: "Internal server error",
      response: fallbackResponse,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
app.get("/api/agent", (req, res) => {
  res.json({
    success: true,
    agent: {
      name: "Circle",
      bio: [
        "Expert in decentralized finance (DeFi) protocols and strategies",
        "Helps users navigate the complex world of DeFi safely",
        "Provides insights on yield farming, liquidity provision, and token swaps",
        "Emphasizes risk management and user education",
        "Stays updated on the latest DeFi trends and opportunities"
      ],
      topics: [
        "DeFi protocols",
        "yield farming",
        "liquidity provision",
        "decentralized exchanges",
        "smart contracts",
        "blockchain networks",
        "risk management",
        "token economics",
        "circlepay bridges",
        "DeFi analytics"
      ],
      modelProvider: "openai",
      model: "gpt-4"
    }
  });
});
function generateCircleResponse(userMessage) {
  const message = userMessage.toLowerCase();
  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "Hello! I'm Circle, your DeFi assistant. I'm here to help you navigate the world of decentralized finance safely. What would you like to learn about today? \u{1F680}";
  }
  if (message.includes("yield") || message.includes("farming")) {
    return "Great question about yield farming! Yield farming involves providing liquidity to DeFi protocols to earn rewards. Here are some key points:\n\n\u2022 **Liquidity Provision**: Add tokens to DEX pools (like ETH/USDC on Uniswap)\n\u2022 **Lending**: Deposit assets on platforms like Aave to earn interest\n\u2022 **Staking**: Lock tokens to support network operations\n\n\u26A0\uFE0F **Important Risks**: Impermanent loss, smart contract vulnerabilities, market volatility\n\nWould you like me to explain any specific yield farming strategy in detail?";
  }
  if (message.includes("defi") || message.includes("decentralized")) {
    return "DeFi (Decentralized Finance) is a revolutionary financial system built on blockchain technology! Here's what makes it special:\n\n\u2022 **No Intermediaries**: Direct peer-to-peer transactions\n\u2022 **Global Access**: Available to anyone with an internet connection\n\u2022 **Transparency**: All transactions are visible on the blockchain\n\u2022 **Composability**: Protocols can work together like building blocks\n\nWhat specific aspect of DeFi interests you most?";
  }
  if (message.includes("risk") || message.includes("safe")) {
    return "Excellent question about DeFi safety! Here are the key risk factors to consider:\n\n\u{1F6E1}\uFE0F **Smart Contract Risk**: Always check if protocols are audited\n\u{1F4B0} **Impermanent Loss**: Can occur in liquidity pools\n\u{1F4CA} **Market Volatility**: Crypto prices can be highly volatile\n\u{1F512} **Private Key Security**: Never share your seed phrase\n\nMy advice: Start small, use well-established protocols, and always DYOR (Do Your Own Research)!";
  }
  if (message.includes("start") || message.includes("begin")) {
    return "Perfect! Here's how to start your DeFi journey safely:\n\n1. **Education First**: Learn about wallets, smart contracts, and how DeFi works\n2. **Start Small**: Begin with amounts you can afford to lose\n3. **Use Established Protocols**: Stick to well-audited protocols like Uniswap, Aave, or Compound\n4. **Understand Gas Fees**: Factor in transaction costs\n5. **Security First**: Use hardware wallets when possible\n\nWhat's your first DeFi goal? I can help guide you!";
  }
  return `Thanks for your message: "${userMessage}"! I'm Circle, your DeFi assistant, and I'm here to help you understand decentralized finance, yield farming strategies, risk management, and much more. What specific DeFi topic would you like to explore? \u{1F4A1}`;
}
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`\u{1F916} Circle DeFi Agent Server Started`);
  console.log(`=================================`);
  console.log(`Port: ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`Agent info: http://localhost:${PORT}/api/agent`);
  console.log(`Agent: Circle`);
  console.log(`=================================`);
});
var gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  process.exit(0);
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
//# sourceMappingURL=server.js.map