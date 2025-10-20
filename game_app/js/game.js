let gameState = {
    year: 1,
    maxYears: 10,
    economy: Math.floor(Math.random() * 41) + 30,
    environment: Math.floor(Math.random() * 41) + 30,
    happiness: Math.floor(Math.random() * 41) + 30,
    budget: Math.floor(Math.random() * 40000) + 10000,
    decisions: [],
    climateData: {
        temperature: [0.5],
        seaLevel: [0],
        urbanization: [30],
        years: [2024]
    },
    apiKey: '',
    useAI: false
};

let climateChart = null;

// Events and Decisions Database
const events = [
    {
        year: 1,
        title: "Investment Opportunity: Seafood Processing Plant",
        description: "A large company wants to build a seafood processing plant in town. They promise 200 jobs but may pollute the ocean.",
        choices: [
            {
                text: "Accept with strict conditions",
                description: "Require modern wastewater treatment system (Est. revenue: +$2,000M)",
                impact: { economy: 15, environment: -5, happiness: 10, money: 2000 },
                letter: { author: "John Nguyen - Fisherman", content: "Thank you for bringing jobs to us, but I'm worried about ocean water quality.", sentiment: "neutral" }
            },
            {
                text: "Reject and develop eco-tourism",
                description: "Focus on sustainable tourism instead of industry (Est. cost: -$1,500M)",
                impact: { economy: 5, environment: 15, happiness: 5, money: -1500 },
                letter: { author: "Maria Tran - Homestay Owner", content: "Wise decision! Eco-tourism will bring long-term benefits to the town.", sentiment: "positive" }
            },
            {
                text: "Accept unconditionally",
                description: "Maximize short-term economic profit (Est. revenue: +$5,000M)",
                impact: { economy: 25, environment: -20, happiness: 15, money: 5000 },
                letter: { author: "David Lee - Resident", content: "My son has a job now, but the beach is starting to smell strange...", sentiment: "neutral" }
            }
        ]
    },
    {
        year: 2,
        title: "Natural Disaster: Major Storm Approaching",
        description: "A major storm will make landfall in 2 weeks. Budget is limited, you must prioritize preparation.",
        choices: [
            {
                text: "Strengthen seawalls and plant mangroves",
                description: "Sustainable solution but expensive (Est. cost: -$3,000M)",
                impact: { economy: -15, environment: 20, happiness: -5, money: -3000 },
                letter: { author: "Peter Pham - Engineer", content: "Mangroves are the best natural shield. This is the right decision!", sentiment: "positive" }
            },
            {
                text: "Evacuate residents and prepare rescue",
                description: "Focus on human safety (Est. cost: -$2,000M)",
                impact: { economy: -10, environment: 0, happiness: 15, money: -2000 },
                letter: { author: "Emily Hoang - Teacher", content: "Thank you for prioritizing our lives. My family was evacuated safely.", sentiment: "positive" }
            },
            {
                text: "Do nothing, trust luck",
                description: "Save budget, hope storm won't be strong (Est. cost: $0)",
                impact: { economy: 5, environment: -15, happiness: -25, money: 0 },
                letter: { author: "Vincent Vo - Farmer", content: "My house collapsed, my fields flooded. Why didn't anyone warn us?!", sentiment: "negative" }
            }
        ]
    },
    {
        year: 3,
        title: "Education: Environmental Awareness Program",
        description: "Schools propose climate change education program for students. Annual cost: $100 million.",
        choices: [
            {
                text: "Comprehensive education investment",
                description: "Train teachers and students, organize practical activities (Est. cost: -$1,000M)",
                impact: { economy: -10, environment: 10, happiness: 15, money: -1000 },
                letter: { author: "Grace Nguyen - Student", content: "Thank you! I learned a lot about environmental protection and convinced my family to sort waste.", sentiment: "positive" }
            },
            {
                text: "Basic program",
                description: "Reduce costs by 50%, focus only on theory (Est. cost: -$500M)",
                impact: { economy: -5, environment: 5, happiness: 5, money: -500 },
                letter: { author: "Henry Tran - Parent", content: "Better than nothing, but my child says the school lacks materials and practical activities.", sentiment: "neutral" }
            },
            {
                text: "Reject, prioritize other budget",
                description: "Save money for infrastructure (Est. revenue: +$500M)",
                impact: { economy: 10, environment: -5, happiness: -10, money: 500 },
                letter: { author: "Isabella Le - Teacher", content: "So disappointed! Children are the future, but we don't invest in their awareness.", sentiment: "negative" }
            }
        ]
    },
    {
        year: 4,
        title: "Energy: Wind Farm Proposal",
        description: "A company wants to build an offshore wind farm. Clean energy but affects landscape and fishing industry.",
        choices: [
            {
                text: "Approve and support fishermen transition",
                description: "Invest in renewable energy and vocational training (Est. cost: -$1,200M)",
                impact: { economy: 10, environment: 25, happiness: -5, money: -1200 },
                letter: { author: "Jack Pham - Fisherman", content: "Initially I opposed, but the aquaculture training program has opened new opportunities for me.", sentiment: "positive" }
            },
            {
                text: "Reject to protect traditional fishing",
                description: "Prioritize current fishermen's livelihoods (Est. revenue: +$300M)",
                impact: { economy: 5, environment: -10, happiness: 10, money: 300 },
                letter: { author: "Karen Vo - Fisherman's Wife", content: "Thank you for thinking of us. The sea is all we have.", sentiment: "positive" }
            },
            {
                text: "Approve without compensation",
                description: "Maximize economic benefits (Est. revenue: +$2,500M)",
                impact: { economy: 20, environment: 20, happiness: -20, money: 2500 },
                letter: { author: "Leo Hoang - Fisherman", content: "We've been fishing here for three generations! How are we supposed to live now?!", sentiment: "negative" }
            }
        ]
    },
    {
        year: 5,
        title: "Pollution: Plastic Waste Overload",
        description: "Plastic waste on beaches has surged. Emergency measures needed.",
        choices: [
            {
                text: "Ban single-use plastics",
                description: "Strict policy but impacts small businesses (Est. cost: -$800M)",
                impact: { economy: -10, environment: 30, happiness: 5, money: -800 },
                letter: { author: "Mary Nguyen - Restaurant Owner", content: "Difficult at first, but tourists praise our clean town. I'm proud!", sentiment: "positive" }
            },
            {
                text: "Community voluntary campaign",
                description: "No enforcement, gradual encouragement (Est. cost: -$300M)",
                impact: { economy: 0, environment: 10, happiness: 10, money: -300 },
                letter: { author: "Nathan Tran - Volunteer", content: "Many people join beach cleanups, but it's not enough. We need clearer regulations.", sentiment: "neutral" }
            },
            {
                text: "Do nothing",
                description: "Avoid conflict with businesses (Est. revenue: +$500M)",
                impact: { economy: 10, environment: -25, happiness: -15, money: 500 },
                letter: { author: "Olivia Le - Tourist", content: "This beach used to be beautiful. Now it's full of trash. I won't be coming back.", sentiment: "negative" }
            }
        ]
    },
    {
        year: 6,
        title: "Tourism: Peak Season Approaching",
        description: "Tourists expected to increase 300%. Great economic opportunity but may overload environment.",
        choices: [
            {
                text: "Limit number of tourists",
                description: "Protect environment, develop sustainable tourism (Est. revenue: +$1,800M)",
                impact: { economy: 10, environment: 20, happiness: 5, money: 1800 },
                letter: { author: "Paula Pham - Tour Guide", content: "High-quality tourists are willing to pay well for good experiences. Smart decision!", sentiment: "positive" }
            },
            {
                text: "Welcome all, increase management",
                description: "Maximize revenue, invest in infrastructure (Est. revenue: +$3,500M)",
                impact: { economy: 25, environment: -10, happiness: 15, money: 3500 },
                letter: { author: "Quinn Vo - Hotel Owner", content: "Revenue skyrocketed! But trash and noise increased too...", sentiment: "neutral" }
            },
            {
                text: "Free development, no control",
                description: "Let the market self-regulate (Est. revenue: +$5,000M)",
                impact: { economy: 30, environment: -30, happiness: 10, money: 5000 },
                letter: { author: "Rachel Hoang - Local Resident", content: "The town is livelier and richer, but I don't recognize my hometown anymore.", sentiment: "negative" }
            }
        ]
    },
    {
        year: 7,
        title: "Climate Change: Rising Sea Levels",
        description: "Coastal areas are flooding frequently. Long-term plan needed.",
        choices: [
            {
                text: "Relocate residents and build new settlement",
                description: "Long-term solution but very expensive (Est. cost: -$4,500M)",
                impact: { economy: -25, environment: 15, happiness: -10, money: -4500 },
                letter: { author: "Steve Nguyen - Relocated Resident", content: "Hard to leave the old house, but the new area is safer and more modern. Thanks for the care.", sentiment: "neutral" }
            },
            {
                text: "Build dikes and pumps",
                description: "Temporary solution, fighting nature (Est. cost: -$2,500M)",
                impact: { economy: -15, environment: -10, happiness: 5, money: -2500 },
                letter: { author: "Tina Tran - Engineer", content: "Dikes may hold for a few years, but this isn't a long-term solution. The sea is still rising.", sentiment: "neutral" }
            },
            {
                text: "No action, wait for central support",
                description: "Save budget, push responsibility upward (Est. revenue: +$800M)",
                impact: { economy: 5, environment: -20, happiness: -25, money: 800 },
                letter: { author: "Ulysses Le - Flood Zone Resident", content: "My house has been flooded for half a year! Why doesn't anyone care?! My child is sick from the dampness!", sentiment: "negative" }
            }
        ]
    },
    {
        year: 8,
        title: "Agriculture: Prolonged Drought",
        description: "Freshwater sources depleted. Both farmers and residents struggling.",
        choices: [
            {
                text: "Invest in smart irrigation system",
                description: "Water-saving technology, high efficiency (Est. cost: -$2,200M)",
                impact: { economy: -15, environment: 20, happiness: 10, money: -2200 },
                letter: { author: "Victor Pham - Farmer", content: "The new system helps me save 60% water and productivity increased 30%! Excellent!", sentiment: "positive" }
            },
            {
                text: "Emergency support, wait for rain",
                description: "Short-term solution, free water distribution (Est. cost: -$1,500M)",
                impact: { economy: -10, environment: -5, happiness: 10, money: -1500 },
                letter: { author: "Wendy Vo - Resident", content: "Thanks for the free water, but we're worried about next year if the drought continues.", sentiment: "neutral" }
            },
            {
                text: "Let farmers handle it themselves",
                description: "No intervention, save budget (Est. revenue: +$600M)",
                impact: { economy: 10, environment: -15, happiness: -20, money: 600 },
                letter: { author: "Xavier Hoang - Farmer", content: "All the rice died! What will my family live on now? Do you just sit in your office?!", sentiment: "negative" }
            }
        ]
    },
    {
        year: 9,
        title: "Technology: AI Environmental Monitoring App",
        description: "A startup proposes AI system to monitor air and water quality and predict natural disasters.",
        choices: [
            {
                text: "Invest and deploy comprehensively",
                description: "Modern technology, accurate data (Est. cost: -$1,800M)",
                impact: { economy: -10, environment: 25, happiness: 15, money: -1800 },
                letter: { author: "Yara Nguyen - IT Expert", content: "The system gave early warnings about pollution and helped us respond promptly. Excellent!", sentiment: "positive" }
            },
            {
                text: "Small-scale trial",
                description: "Cautious approach, verify before expanding (Est. cost: -$800M)",
                impact: { economy: -5, environment: 10, happiness: 5, money: -800 },
                letter: { author: "Zack Tran - Engineer", content: "Promising results in the trial area. Should expand further.", sentiment: "positive" }
            },
            {
                text: "Reject, trust traditional methods",
                description: "Doubt technology, keep old ways (Est. revenue: +$400M)",
                impact: { economy: 5, environment: -10, happiness: -10, money: 400 },
                letter: { author: "Alice Le - Scientist", content: "Unfortunate! Technology could save many lives through accurate predictions.", sentiment: "negative" }
            }
        ]
    },
    {
        year: 10,
        title: "Final Decision: Legacy for the Future",
        description: "Your term is ending. What legacy do you want to leave for the next generation?",
        choices: [
            {
                text: "Permanent environmental protection fund",
                description: "Ensure funding for long-term environmental protection (Est. cost: -$4,000M)",
                impact: { economy: -20, environment: 30, happiness: 20, money: -4000 },
                letter: { author: "Bella Pham - Youth", content: "Thank you for thinking of us. This fund will keep our town green forever!", sentiment: "positive" }
            },
            {
                text: "Green innovation center",
                description: "Invest in environmental ideas and startups (Est. cost: -$2,500M)",
                impact: { economy: 10, environment: 20, happiness: 20, money: -2500 },
                letter: { author: "Carl Vo - Young Entrepreneur", content: "The center supported my startup to develop ocean cleaning solutions. Excellent!", sentiment: "positive" }
            },
            {
                text: "Lower taxes to stimulate economy",
                description: "Short-term growth, let successor handle environment (Est. revenue: +$3,000M)",
                impact: { economy: 30, environment: -15, happiness: 15, money: 3000 },
                letter: { author: "Diana Hoang - Resident", content: "Wallet is thicker but the air is increasingly polluted. Will our children and grandchildren be happy?", sentiment: "neutral" }
            }
        ]
    }
];

// NPCs for letters
const npcs = [
    "Alex Nguyen", "Beth Tran", "Chris Le", "Diana Pham",
    "Eric Vo", "Fiona Hoang", "George Do", "Hannah Bui"
];

// Initialize game
function initGame() {
    setupEventListeners();
    showScreen('menuScreen');
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('howToPlayButton').addEventListener('click', () => showScreen('howToPlayScreen'));
    document.getElementById('backToMenuButton').addEventListener('click', () => showScreen('menuScreen'));
    document.getElementById('playAgainButton').addEventListener('click', resetGame);
    document.getElementById('mainMenuButton').addEventListener('click', () => {
        resetGame();
        showScreen('menuScreen');
    });
    document.getElementById('clearCacheButton').addEventListener('click', () => {
        localStorage.removeItem('aiGeneratedEvents');
        alert('✅ AI cache cleared! Next game will generate new scenarios.');
    });
}

// Show screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start game
async function startGame() {
    resetGameState();
    
    // Check if AI should be used
    if (typeof CONFIG !== 'undefined' && CONFIG.USE_AI_GENERATION && isAPIKeyValid()) {
        gameState.apiKey = CONFIG.GOOGLE_AI_API_KEY;
        gameState.useAI = true;
        console.log('AI mode enabled - Generating all 10 years...');
        
        // Generate all 10 years at once
        await generateAllYearsWithAI();
    } else {
        gameState.useAI = false;
        console.log('Default mode - Using predefined scenarios');
    }
    
    showScreen('gameScreen');
    initChart();
    loadYear();
}

// Reset game state
function resetGameState() {
    const apiKey = gameState.apiKey;
    const useAI = gameState.useAI;
    
    gameState = {
        year: 1,
        maxYears: 10,
        economy: Math.floor(Math.random() * 41) + 30, // 30-70
        environment: Math.floor(Math.random() * 41) + 30, // 30-70
        happiness: Math.floor(Math.random() * 41) + 30, // 30-70
        budget: Math.floor(Math.random() * 400000) + 100000,
        decisions: [],
        climateData: {
            temperature: [0.5],
            seaLevel: [0],
            urbanization: [30],
            years: [2024]
        },
        apiKey: apiKey,
        useAI: useAI,
        generatedEvents: [] // Store AI-generated events
    };
}

// Reset game
function resetGame() {
    resetGameState();
    showScreen('gameScreen');
    if (climateChart) {
        climateChart.destroy();
    }
    initChart();
    loadYear();
}

// Initialize climate chart
function initChart() {
    const ctx = document.getElementById('climateChart').getContext('2d');
    
    if (climateChart) {
        climateChart.destroy();
    }
    
    climateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [gameState.year],
            datasets: [
                {
                    label: 'Economy',
                    data: [gameState.economy],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Environment',
                    data: [gameState.environment],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Community',
                    data: [gameState.happiness],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: '10-Year Development Trends',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score (0-100)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Load year
async function loadYear() {
    let event;
    
    // Use pre-generated AI events if available
    if (gameState.useAI && gameState.generatedEvents && gameState.generatedEvents.length > 0) {
        event = gameState.generatedEvents[gameState.year - 1];
        console.log(`Loading pre-generated AI event for year ${gameState.year}`);
    }
    
    // Fallback to default events
    if (!event) {
        event = events[gameState.year - 1];
        console.log(`Loading default event for year ${gameState.year}`);
    }
    
    // Update year display
    document.getElementById('currentYear').textContent = gameState.year;
    
    // Update stats
    updateStats();
    
    // Display event
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    
    // Display choices
    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';
    
    event.choices.forEach((choice, index) => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-card';
        
        let impactsHTML = '<div class="choice-impacts">';
        
        // Money impact with clear labels
        if (choice.impact.money !== 0) {
            const sign = choice.impact.money > 0 ? '+' : '';
            const className = choice.impact.money > 0 ? 'positive' : 'negative';
            const label = choice.impact.money > 0 ? '💰 Revenue' : '💸 Cost';
            const amount = Math.abs(choice.impact.money).toLocaleString('en-US');
            impactsHTML += `<span class="impact money ${className}">${label}: ${sign}$${amount}M</span>`;
        }
        
        if (choice.impact.economy !== 0) {
            const sign = choice.impact.economy > 0 ? '+' : '';
            const className = choice.impact.economy > 0 ? 'positive' : 'negative';
            impactsHTML += `<span class="impact ${className}">Economy: ${sign}${choice.impact.economy}</span>`;
        }
        if (choice.impact.environment !== 0) {
            const sign = choice.impact.environment > 0 ? '+' : '';
            const className = choice.impact.environment > 0 ? 'positive' : 'negative';
            impactsHTML += `<span class="impact ${className}">Environment: ${sign}${choice.impact.environment}</span>`;
        }
        if (choice.impact.happiness !== 0) {
            const sign = choice.impact.happiness > 0 ? '+' : '';
            const className = choice.impact.happiness > 0 ? 'positive' : 'negative';
            impactsHTML += `<span class="impact ${className}">Community: ${sign}${choice.impact.happiness}</span>`;
        }
        impactsHTML += '</div>';
        
        choiceCard.innerHTML = `
            <h4>${choice.text}</h4>
            <p>${choice.description}</p>
            ${impactsHTML}
        `;
        choiceCard.addEventListener('click', () => makeDecision(choice, index));
        choicesContainer.appendChild(choiceCard);
    });
}

// Generate all 10 years with AI at once
async function generateAllYearsWithAI() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const loadingText = document.getElementById('loadingText');
    const loadingSubtext = document.getElementById('loadingSubtext');
    
    try {
        // Check localStorage first
        const cached = localStorage.getItem('aiGeneratedEvents');
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.length === 10) {
                    console.log('Loaded 10 AI events from localStorage');
                    gameState.generatedEvents = parsed;
                    return;
                }
            } catch (e) {
                console.warn('Failed to parse cached events:', e);
            }
        }
        
        loadingIndicator.style.display = 'flex';
        loadingText.textContent = 'Generating 10 years with AI in parallel...';
        loadingSubtext.textContent = 'This should take ~10-15 seconds...';
        console.log('Generating all 10 years with AI in parallel...');
        
        // Generate all years in parallel for speed
        const promises = [];
        for (let year = 1; year <= 10; year++) {
            promises.push(generateSingleEventWithAI(year, []));
        }
        
        // Wait for all to complete
        const results = await Promise.all(promises);
        
        // Process results
        const generatedEvents = results.map((event, index) => {
            if (event) {
                console.log(`Year ${index + 1} generated`);
                return event;
            } else {
                console.log(`Year ${index + 1} fallback to default`);
                return events[index];
            }
        });
        
        gameState.generatedEvents = generatedEvents;
        
        loadingText.textContent = 'Saving to localStorage...';
        
        // Save to localStorage
        try {
            localStorage.setItem('aiGeneratedEvents', JSON.stringify(generatedEvents));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
        
    } catch (error) {
        console.error('Error generating all years:', error);
        gameState.generatedEvents = [];
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Generate single event with Google AI
async function generateSingleEventWithAI(year, previousEvents = []) {
    try {
        const currentStats = {
            economy: 50,
            environment: 50,
            happiness: 50
        };
        
        const prompt = `Climate change game scenario for coastal town. Year ${year}/10.

JSON format (no markdown):
{
  "title": "Event title",
  "description": "Brief description",
  "choices": [
    {
      "text": "Choice 1",
      "description": "Details with (Est. cost: -$XXM) or (Est. revenue: +$XXM)",
      "impact": {"economy": -10, "environment": 20, "happiness": -5, "money": -15000},
      "letter": {"author": "Name", "content": "Feedback", "sentiment": "positive"}
    },
    {
      "text": "Choice 2",
      "description": "Details with money estimate",
      "impact": {"economy": 15, "environment": -15, "happiness": 10, "money": 25000},
      "letter": {"author": "Name", "content": "Feedback", "sentiment": "neutral"}
    },
    {
      "text": "Choice 3",
      "description": "Details with money estimate",
      "impact": {"economy": 5, "environment": -5, "happiness": -15, "money": 0},
      "letter": {"author": "Name", "content": "Feedback", "sentiment": "negative"}
    }
  ]
}

Impact ranges: economy/environment/happiness (-30 to +30), money (-50000 to +50000). Topics: storms, floods, tourism, industry, energy, pollution. English only.`;
        
        // Try primary endpoint first, then fallbacks
        const endpoints = [CONFIG.API_ENDPOINT, ...(CONFIG.FALLBACK_ENDPOINTS || [])];
        let lastError = null;
        
        for (let i = 0; i < endpoints.length; i++) {
            const endpoint = endpoints[i];
            
            try {
                const response = await fetch(`${endpoint}?key=${gameState.apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: CONFIG.AI_SETTINGS
                    })
                });
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.warn(`Endpoint ${i + 1} failed:`, errorText);
                    lastError = errorText;
                    continue;
                }

                const data = await response.json();
                
                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                    console.warn('Unexpected API response structure:', data);
                    lastError = 'Invalid response structure';
                    continue;
                }
                
                const generatedText = data.candidates[0].content.parts[0].text;
                
                // Extract JSON from response
                let jsonText = generatedText.trim();
                if (jsonText.startsWith('```json')) {
                    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
                } else if (jsonText.startsWith('```')) {
                    jsonText = jsonText.replace(/```\n?/g, '');
                }
                
                const event = JSON.parse(jsonText);
                console.log(`✅ Year ${year} generated successfully`);
                return event;
                
            } catch (error) {
                console.warn(`Error with endpoint ${i + 1}:`, error);
                lastError = error;
                continue;
            }
        }
        
        throw new Error(lastError || 'All endpoints failed');
        
    } catch (error) {
        console.error(`Failed to generate year ${year}:`, error);
        return null;
    }
}

// Generate event with Google AI (legacy - not used anymore)
async function generateEventWithAI() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    try {
        loadingIndicator.style.display = 'flex';
        
        const currentStats = {
            economy: Math.round(gameState.economy),
            environment: Math.round(gameState.environment),
            happiness: Math.round(gameState.happiness)
        };
        
        const previousDecisions = gameState.decisions.map(d => d.choiceText).join(', ');
        
        const prompt = `Bạn là một AI tạo tình huống cho game quản lý thị trấn ven biển Việt Nam về biến đổi khí hậu.

Năm hiện tại: ${gameState.year}/10
Chỉ số hiện tại:
- Kinh tế: ${currentStats.economy}/100
- Môi trường: ${currentStats.environment}/100
- Tinh thần cộng đồng: ${currentStats.happiness}/100
- Ngân sách: ${Math.round(gameState.budget).toLocaleString('vi-VN')} triệu VNĐ

Quyết định trước: ${previousDecisions || 'Chưa có'}

Hãy tạo một tình huống phù hợp với năm ${gameState.year} và các chỉ số hiện tại. Tình huống phải thực tế, liên quan đến biến đổi khí hậu ở Việt Nam (như bão, lũ lụt, hạn hán, ô nhiễm, phát triển kinh tế, du lịch, công nghiệp, giáo dục, v.v.).

Trả về ĐÚNG định dạng JSON sau (không có markdown, chỉ JSON thuần):
{
  "title": "Tiêu đề ngắn gọn",
  "description": "Mô tả chi tiết tình huống (2-3 câu)",
  "choices": [
    {
      "text": "Lựa chọn 1 (ngắn gọn)",
      "description": "Mô tả hậu quả",
      "impact": {"economy": -10, "environment": 20, "happiness": -5, "money": -15000},
      "letter": {"author": "Tên người dân", "content": "Phản hồi", "sentiment": "positive"}
    },
    {
      "text": "Lựa chọn 2",
      "description": "Mô tả hậu quả",
      "impact": {"economy": 15, "environment": -15, "happiness": 10, "money": 25000},
      "letter": {"author": "Tên người dân", "content": "Phản hồi", "sentiment": "neutral"}
    },
    {
      "text": "Lựa chọn 3",
      "description": "Mô tả hậu quả",
      "impact": {"economy": 5, "environment": -5, "happiness": -15, "money": 0},
      "letter": {"author": "Tên người dân", "content": "Phản hồi", "sentiment": "negative"}
    }
  ]
}

Lưu ý:
- Impact economy/environment/happiness: -30 đến +30
- Impact money (ngân sách): -50000 đến +50000 (triệu VNĐ)
- Mỗi lựa chọn phải có trade-off rõ ràng
- sentiment: "positive", "negative", hoặc "neutral"
- Nội dung bằng tiếng Việt, tự nhiên`;

        console.log('🤖 Calling Google AI API...');
        console.log('API Key (first 10 chars):', gameState.apiKey.substring(0, 10) + '...');
        
        // Try primary endpoint first, then fallbacks
        const endpoints = [CONFIG.API_ENDPOINT, ...(CONFIG.FALLBACK_ENDPOINTS || [])];
        let lastError = null;
        
        for (let i = 0; i < endpoints.length; i++) {
            const endpoint = endpoints[i];
            console.log(`Trying endpoint ${i + 1}/${endpoints.length}:`, endpoint);
            
            try {
                const response = await fetch(`${endpoint}?key=${gameState.apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: CONFIG.AI_SETTINGS
                    })
                });

                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.warn(`Endpoint ${i + 1} failed:`, errorText);
                    lastError = errorText;
                    continue; // Try next endpoint
                }

                const data = await response.json();
                console.log('API Response received');
                
                // Check if response has the expected structure
                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                    console.warn('Unexpected API response structure:', data);
                    lastError = 'Invalid response structure';
                    continue; // Try next endpoint
                }
                
                const generatedText = data.candidates[0].content.parts[0].text;
                console.log('Generated text length:', generatedText.length);
                
                // Extract JSON from response (remove markdown if present)
                let jsonText = generatedText.trim();
                if (jsonText.startsWith('```json')) {
                    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
                } else if (jsonText.startsWith('```')) {
                    jsonText = jsonText.replace(/```\n?/g, '');
                }
                
                const event = JSON.parse(jsonText);
                event.year = gameState.year;
                
                console.log('✅ AI generated event successfully with endpoint:', endpoint);
                return event;
                
            } catch (error) {
                console.warn(`Endpoint ${i + 1} error:`, error.message);
                lastError = error;
                // Continue to next endpoint
            }
        }
        
        // All endpoints failed
        throw new Error(lastError || 'All endpoints failed');
        
    } catch (error) {
        console.error('❌ AI generation failed after trying all endpoints:', error);
        console.error('Error details:', error.message || error);
        showNotification('System', `Cannot connect to Google AI. Using default scenario.`, 'neutral');
        return null;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function makeDecision(choice, choiceIndex) {
    const economyChange = choice.impact.economy || 0;
    gameState.economy = Math.max(0, Math.min(100, gameState.economy + economyChange));
    gameState.environment = Math.max(0, Math.min(100, gameState.environment + choice.impact.environment));
    gameState.happiness = Math.max(0, Math.min(100, gameState.happiness + choice.impact.happiness));

    // Đồng bộ Economy và Budget: mỗi 1 điểm economy = +100 vào budget
    if (economyChange !== 0) {
        gameState.budget += economyChange * 100;
        const econBudgetText = (economyChange * 100 > 0 ? '+' : '-') + `$${Math.abs(economyChange * 100).toLocaleString('en-US')} million (from Economy)`;
        const econBudgetColor = economyChange > 0 ? 'positive' : 'negative';
        showNotification('Budget', econBudgetText, econBudgetColor);
    }

    if (choice.impact.money) {
        const oldBudget = gameState.budget;
        gameState.budget += choice.impact.money;
        const moneyChange = choice.impact.money;
        const moneyText = moneyChange > 0 
            ? `+$${moneyChange.toLocaleString('en-US')} million` 
            : `-$${Math.abs(moneyChange).toLocaleString('en-US')} million`;
        const moneyColor = moneyChange > 0 ? 'positive' : 'negative';
        showNotification('Budget', moneyText, moneyColor);
    }
    
    gameState.decisions.push({
        year: gameState.year,
        choice: choiceIndex,
        choiceText: choice.text
    });
    
    updateClimateData(choice);
    
    // Show letter
    if (choice.letter) {
        showLetter(choice.letter);
    }
    
    // Update stats
    updateStats();
    
    // Check game over conditions (bao gồm ngân sách âm quá nhiều)
    if (gameState.economy <= 0 || gameState.environment <= 0 || gameState.happiness <= 0 || gameState.budget < -100000) {
        setTimeout(() => endGame(true), 2000);
        return;
    }
    
    // Next year or end game
    if (gameState.year >= gameState.maxYears) {
        setTimeout(() => endGame(false), 2000);
    } else {
        gameState.year++;
        setTimeout(() => loadYear(), 1500);
    }
}

// Update stats
function updateStats() {
    // Ensure gameState.budget exists
    if (typeof gameState.budget === 'undefined') {
        console.error('⚠️ gameState.budget is undefined! Resetting to default.');
        gameState.budget = 100000;
    }
    
    const budgetElement = document.getElementById('budgetValue');
    budgetElement.textContent = gameState.budget.toLocaleString('en-US');
    
    if (gameState.budget < 0) {
        budgetElement.style.color = '#ff4444';
    } else if (gameState.budget < 50000) {
        budgetElement.style.color = '#ffaa00';
    } else {
        budgetElement.style.color = 'white';
    }
    
    document.getElementById('economyBar').style.width = gameState.economy + '%';
    document.getElementById('economyValue').textContent = Math.round(gameState.economy);
    
    document.getElementById('environmentBar').style.width = gameState.environment + '%';
    document.getElementById('environmentValue').textContent = Math.round(gameState.environment);
    
    document.getElementById('happinessBar').style.width = gameState.happiness + '%';
    document.getElementById('happinessValue').textContent = Math.round(gameState.happiness);
    
    // Color coding
    updateStatColor('economyBar', gameState.economy);
    updateStatColor('environmentBar', gameState.environment);
    updateStatColor('happinessBar', gameState.happiness);
}

// Update stat color based on value
function updateStatColor(barId, value) {
    const bar = document.getElementById(barId);
    if (value < 30) {
        bar.style.opacity = '0.5';
    } else {
        bar.style.opacity = '1';
    }
}

// Update climate data
function updateClimateData(choice) {
    // Update chart with current values
    if (climateChart) {
        climateChart.data.labels.push(gameState.year);
        climateChart.data.datasets[0].data.push(gameState.economy);
        climateChart.data.datasets[1].data.push(gameState.environment);
        climateChart.data.datasets[2].data.push(gameState.happiness);
        climateChart.update();
    }
}

// Show letter from NPC
function showLetter(letter) {
    showNotification(letter.author, letter.content, letter.sentiment);
}

// Show notification (replaces letter system)
function showNotification(author, content, sentiment = 'neutral') {
    const notificationArea = document.getElementById('notificationArea');
    
    const notification = document.createElement('div');
    notification.className = `notification ${sentiment}`;
    notification.innerHTML = `
        <div class="notification-header">
            <span class="notification-author">${author}</span>
            <button class="notification-close">×</button>
        </div>
        <div class="notification-content">${content}</div>
    `;
    
    notificationArea.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 8000);
}

// End game
async function endGame(prematureEnd) {
    const avgScore = (gameState.economy + gameState.environment + gameState.happiness) / 3;
    let ending;
    
    if (prematureEnd) {
        ending = {
            title: "Failure: Early Collapse",
            image: "😢",
            description: "The town collapsed before completing 10 years. One of the three pillars (Economy, Environment, or Community) has completely failed.",
            message: "Sustainable development requires balance. You cannot completely sacrifice one aspect for another."
        };
    } else if (avgScore >= 80 && gameState.environment >= 70) {
        ending = {
            title: "🌟 Ending A: Green Paradise",
            image: "🏝️",
            description: "The town has become a model of sustainable development! Visitors from everywhere come to learn. Citizens live happily in a clean environment, with an economy based on eco-tourism and green technology.",
            message: "You proved that economic development and environmental protection can go hand in hand!"
        };
    } else if (avgScore >= 65 && gameState.economy >= 60 && gameState.environment >= 60 && gameState.happiness >= 60) {
        ending = {
            title: "✅ Ending B: Balanced Harmony",
            image: "⚖️",
            description: "The town developed steadily with reasonable balance between three factors. Nobody's perfect, but life is still good. Citizens believe in the future.",
            message: "Sometimes, balance and stability matter more than perfection."
        };
    } else if (gameState.economy >= 70 && gameState.environment <= 40) {
        ending = {
            title: "💰 Ending C: Toxic Wealth",
            image: "🏭",
            description: "The town is wealthy but the environment is devastated. Polluted air, dying seas. The rich move away, the poor are stuck with the consequences. Children suffer increasing illnesses.",
            message: "Money can't buy clean air and pure water. When nature dies, humans can't survive either."
        };
    } else if (gameState.environment >= 70 && gameState.economy <= 35) {
        ending = {
            title: "🌿 Ending D: Poor but Green",
            image: "🍃",
            description: "Clean environment but impoverished citizens. Many young people leave seeking opportunities. The town becomes a nature reserve but lacks human vitality.",
            message: "Environmental protection is important, but people also need livelihoods to survive."
        };
    } else {
        ending = {
            title: "😐 Ending E: Fragile Survival",
            image: "🌫️",
            description: "The town still exists but nobody's satisfied. Citizens are exhausted, economy stagnant, environment degraded. Nobody knows what the future holds.",
            message: "Half-hearted decisions lead to half-hearted results. Sometimes, clear determination matters more than hesitation."
        };
    }
    
    document.getElementById('endingTitle').textContent = ending.title;
    document.getElementById('endingImage').textContent = ending.image;
    document.getElementById('endingDescription').textContent = ending.description;
    document.getElementById('endingMessage').textContent = ending.message;
    
    const finalStatsHTML = `
        <div class="final-stat-item">
            <span class="final-stat-label">💰 Economy:</span>
            <span class="final-stat-value">${Math.round(gameState.economy)}/100</span>
        </div>
        <div class="final-stat-item">
            <span class="final-stat-label">🌿 Environment:</span>
            <span class="final-stat-value">${Math.round(gameState.environment)}/100</span>
        </div>
        <div class="final-stat-item">
            <span class="final-stat-label">😊 Community:</span>
            <span class="final-stat-value">${Math.round(gameState.happiness)}/100</span>
        </div>
        <div class="final-stat-item">
            <span class="final-stat-label">� Budget:</span>
            <span class="final-stat-value">$${Math.round(gameState.budget).toLocaleString('en-US')}M</span>
        </div>
        <div class="final-stat-item">
            <span class="final-stat-label">📊 Average Score:</span>
            <span class="final-stat-value">${Math.round(avgScore)}/100</span>
        </div>
        <div class="final-stat-item">
            <span class="final-stat-label">📈 Years Managed:</span>
            <span class="final-stat-value">${gameState.year} years</span>
        </div>
    `;
    document.getElementById('finalStats').innerHTML = finalStatsHTML;
    
    // Generate AI analysis if enabled
    if (gameState.useAI) {
        await generateAIAnalysis(ending, avgScore);
    }
    
    showScreen('endingScreen');
}

// Generate AI analysis of game results
async function generateAIAnalysis(ending, avgScore) {
    const aiAnalysisDiv = document.getElementById('aiAnalysis');
    if (!aiAnalysisDiv) return;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
