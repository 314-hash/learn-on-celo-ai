# Learn-on-Celo AI 🚀

An AI-powered blockchain learning assistant that simplifies development on the **Celo blockchain** using intelligent agents, LangChain, and workflow automation with n8n.

> 🧠 Designed as a capstone project to demonstrate how AI can accelerate blockchain education and onboarding.

---

## 🔍 Overview

**Learn-on-Celo AI** is a developer-friendly learning platform that uses LangChain agents to interactively teach and assist users in building smart contracts and understanding Celo blockchain concepts.

Built with:

- 🟨 **Celo SDKs** for contract deployment and queries
- 🤖 **LangChain** for multi-agent AI orchestration
- 🔗 **n8n** for blockchain automation workflows
- 🔊 **ElevenLabs** (optional) for AI voice interaction

---

## 📦 Features

✅ AI Agent that answers blockchain questions  
✅ Code generation and smart contract walkthroughs  
✅ n8n integration for blockchain workflows  
✅ Optional text-to-speech via ElevenLabs  
✅ Custom prompt system and memory integration  
✅ Open-source and locally hosted

---

## 🏗️ Project Structure

learn-on-celo-ai/
│
├── langchain_server/ # LangChain server with Celo-trained agents
│ └── main.py # FastAPI app serving agent responses
│
├── n8n-workflows/ # Prebuilt n8n workflow JSONs for automation
│
├── prompts/ # Custom system prompts and AI training files
│
├── examples/ # Example prompts and response samples
│
├── README.md # Project documentation
└── requirements.txt # Python dependencies


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/314-hash/learn-on-celo-ai.git
cd learn-on-celo-ai

pip install -r requirements.txt

cd langchain_server
uvicorn main:app --reload

This runs a FastAPI server with a chatbot endpoint (e.g. http://localhost:8000/ask).

4. Use n8n for Workflow Execution
Import .json files from the n8n-workflows/ folder into your n8n instance.

Connect AI responses to real actions (e.g., sending transactions, calling APIs, etc.)

🧪 Example Use Case
Prompt:

“How do I create a token on Celo?”

Response:
The agent responds with:

An explanation of ERC20 on Celo

Sample Solidity code

Deployment script

Option to trigger an n8n workflow to simulate deployment

🛠 Tech Stack
Tool	Role
🟨 Celo SDK	Blockchain interaction
🤖 LangChain	AI agent orchestration
⚙️ FastAPI	Local AI backend
🔁 n8n	Automation workflows
🧠 GPT (OpenAI)	Language model
🔊 ElevenLabs	Text-to-speech (optional)

🌱 Future Plans
Add multi-language support

Integrate real blockchain deployment via user wallet

Expand agents to teach other blockchains (e.g. Solana, Polygon)

Track user progress and analytics

📄 License
MIT License © 2025 314-hash

🤝 Contribute
If you'd like to improve this project or expand it to other chains, feel free to fork, open issues, or submit PRs!

📬 Contact
For questions or collaborations, reach out via your portfolio or GitHub issues.


