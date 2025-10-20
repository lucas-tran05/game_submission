# Echoes of Tomorrow - Tiếng vọng của ngày mai

## 🎮 Game Overview

**Echoes of Tomorrow** is an interactive narrative game that explores the complex relationship between economic development, environmental protection, and community wellbeing in a coastal Vietnamese town facing climate change.

## 🌊 Theme

**Climate Change & Human Choices**

The game addresses pressing environmental challenges facing coastal communities in Vietnam, including:
- Rising sea levels
- Extreme weather events
- Plastic pollution
- Resource depletion
- Sustainable development dilemmas

## 🎯 How to Play

### Installation & Running

**No installation required!** Simply open `index.html` in any modern web browser.

**Default Mode (Recommended for first-time players):**
```
1. Download or clone this repository
2. Navigate to: game_submission/game_app/
3. Open index.html in your browser (Chrome, Firefox, Edge, Safari)
4. Click "Bắt đầu hành trình" and enjoy!
```

**AI Mode (Optional - for advanced experience):**
```
1. Get free API key from: https://aistudio.google.com/app/apikey
2. Open game_app/js/config.js
3. Replace 'YOUR_API_KEY_HERE' with your API key
4. Set USE_AI_GENERATION to true
5. Save and refresh the game
```

See detailed instructions in [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md)

### Gameplay Instructions

1. **Your Role**: You are the manager of a small coastal town for 10 years
2. **Make Decisions**: Each year presents a critical choice affecting three key metrics:
   - 💰 **Economy** - Financial health and development
   - 🌿 **Environment** - Ecosystem health and sustainability
   - 😊 **Community Spirit** - Citizen happiness and wellbeing

3. **Track Progress**: Monitor climate change through real-time charts showing temperature rise and sea level increase

4. **Receive Feedback**: NPCs send letters reflecting on your decisions - from gratitude to criticism

5. **Reach Your Ending**: One of 5 different endings based on your choices:
   - 🌟 **Green Paradise**: Sustainable development champion
   - ✅ **Balanced Harmony**: Stable and balanced growth
   - 💰 **Toxic Wealth**: Rich but environmentally devastated
   - 🌿 **Poor but Green**: Pristine nature, struggling economy
   - 😐 **Fragile Survival**: Mediocre outcomes across the board

### Controls

- Mouse/Touchscreen to select choices
- Click buttons to navigate menus

## 🛠️ Technology Stack

### Core Technologies
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Game logic and interactivity

### Libraries
- **Chart.js** (v4.4.0) - Climate data visualization via CDN

### AI Integration (Optional)
- **Google AI Studio (Gemini API)** - Dynamic event generation
- See [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md) for configuration

### AI Tools Used
1. **ChatGPT (GPT-4)** - Game concept, narrative design, code generation
2. **GitHub Copilot** - Code assistance and debugging
3. **Claude** - Content refinement and balancing

## 🎨 Game Features

- ✅ **2 Play Modes:**
  - **Default Mode** - 10 pre-designed scenarios (no setup needed)
  - **AI Mode** - Infinite dynamic scenarios with Google AI (requires API key)
- ✅ **Smart Decision System** - Each choice has meaningful consequences
- ✅ **Real-time Climate Charts** - Temperature & sea level visualization
- ✅ **Dynamic Feedback** - NPC notifications reflect your decisions
- ✅ **5 Unique Endings** - Based on your balance of priorities
- ✅ **Fully Vietnamese** - Authentic language and cultural context
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **No Installation** - Just open index.html in any browser!

## 🌍 Educational Impact

**Echoes of Tomorrow** teaches players about:
- The interconnection between economy, environment, and society
- Real-world trade-offs in climate policy
- Long-term consequences of short-term decisions
- Vietnamese coastal community challenges
- Climate change metrics (temperature, sea level rise)

**Target Message**: *"Development is not always progress"*

## 📁 Project Structure

```
game_submission/
├── README.md                    # This file
├── project_report.pdf          # Full project report
├── youtube_link.txt            # Demo video link
├── prompts/                    # AI prompts used
│   ├── concept_prompts.txt
│   ├── asset_generation_prompts.txt
│   ├── code_generation_prompts.txt
│   └── refinement_prompts.txt
├── game_app/                   # Game files
│   ├── index.html             # Main entry point
│   ├── css/
│   │   └── styles.css         # All styles
│   └── js/
│       └── game.js            # Game logic
└── screenshots/               # Game screenshots
    ├── menu_screen.png
    ├── play_screen1.png
    ├── play_screen2.png
    ├── play_screen3.png
    └── results_screen.png
```

## 🎮 Game Mechanics

### Decision System
- Each year presents 3 choice options
- Choices have immediate and cumulative effects
- No single "correct" path - all choices have trade-offs

### Stat Management
- Stats range from 0-100
- Game ends early if any stat reaches 0
- Final score determines ending

### Climate Tracking
- Temperature increase calculated from environment stat
- Sea level rise accelerates with poor environmental choices
- Visual feedback through Chart.js graphs

## 🏆 Credits

**Team**: [Your Team Name]
**Developed for**: RMIT Hackathon 2024
**Theme**: Social Impact Gaming

## 📝 License

This project is created for educational purposes as part of the RMIT Hackathon.

## 🙏 Acknowledgments

- Vietnamese coastal communities for inspiration
- Climate scientists for data insights
- RMIT for organizing the hackathon
- AI tools (ChatGPT, Copilot, Claude) for development assistance

---

**Play responsibly. Think sustainably. Build a better tomorrow.** 🌍
