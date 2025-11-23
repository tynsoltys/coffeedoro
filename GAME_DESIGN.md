# Game Design Document: Coffeedoro

## Table of Contents
1. [Core Concept](#core-concept)
2. [Gameplay Loop](#gameplay-loop)
3. [Game Mechanics](#game-mechanics)
4. [Progression Systems](#progression-systems)
5. [Content & Features](#content--features)
6. [User Interface](#user-interface)
7. [Audio Design](#audio-design)
8. [Balance & Economy](#balance--economy)

---

## Core Concept

### High-Level Summary
Coffeedoro is a cozy coffee shop management game where each "day" in the game corresponds to a break period in a Pomodoro productivity timer. Players run a coffee shop by purchasing ingredients, setting prices, serving customers, and upgrading their establishment. The game is designed for short, satisfying play sessions (5-15 minutes) that provide a rewarding mental break from focused work.

### Core Pillars
1. **Cozy & Relaxing**: No stress, no failure states, warm aesthetic
2. **Meaningful Choices**: Strategic decisions with visible impact
3. **Progressive Growth**: Steady advancement and unlocks
4. **Break-Sized Fun**: Satisfying progress in short sessions

### Unique Selling Points
- Seamlessly integrated with productivity workflow
- Each work session makes your breaks more rewarding
- Business strategy without time pressure
- Personalization through shop customization

---

## Gameplay Loop

### Macro Loop (Daily Cycle)
```
Work Session (Pomodoro)
    ↓
    [Earn bonus currency/item]
    ↓
Break Period → Start Game Day
    ↓
    1. Review previous day's results
    2. Plan strategy for the day
    3. Purchase ingredients & supplies
    4. Set prices & menu
    5. Open shop & serve customers
    6. Day ends → View results
    7. Spend earnings on upgrades
    ↓
Return to Work Session
    ↓
    [Continue productivity]
    ↓
Next Break → Next Game Day
```

### Micro Loop (Within a Game Day)
```
Customer enters
    ↓
View order & preferences
    ↓
Prepare drink (select ingredients)
    ↓
Serve customer
    ↓
Receive payment & feedback
    ↓
Update reputation/satisfaction
    ↓
Next customer (until day ends)
```

### Session Flow
1. **Pre-Day Planning** (30-60 seconds)
   - Review cash and inventory
   - Purchase needed supplies
   - Adjust menu and prices

2. **Service Period** (3-10 minutes)
   - Serve 8-15 customers per day
   - Make strategic decisions on recipes
   - Respond to special requests

3. **End-of-Day Summary** (30-60 seconds)
   - View earnings and statistics
   - See customer feedback
   - Unlock achievements

4. **Upgrade & Customize** (2-5 minutes)
   - Purchase shop upgrades
   - Unlock new recipes
   - Decorate and personalize shop

---

## Game Mechanics

### 1. Inventory Management

#### Ingredients
| Category | Items | Properties |
|----------|-------|------------|
| **Coffee Beans** | Regular, Premium, Decaf, Specialty | Quality, cost, customer preference |
| **Milk** | Whole, Skim, Oat, Almond, Soy | Type affects taste, price, appeal |
| **Flavors** | Vanilla, Caramel, Hazelnut, Mocha, Seasonal | Add-ons for customization |
| **Toppings** | Whipped Cream, Cocoa, Cinnamon, Sprinkles | Visual & taste enhancement |
| **Pastries** | Croissant, Muffin, Cookie, Scone | Complementary items |

#### Supply Mechanics
- **Spoilage**: Some ingredients expire after X days (encourages planning)
- **Bulk discounts**: Buy more = lower per-unit cost
- **Quality tiers**: Higher quality = better reviews = higher prices
- **Storage limits**: Upgrade storage capacity as shop grows

### 2. Recipe System

#### Drink Types
1. **Basic Drinks** (Available from start)
   - Drip Coffee
   - Espresso
   - Americano
   - Tea

2. **Intermediate Drinks** (Unlock with upgrades)
   - Latte
   - Cappuccino
   - Mocha
   - Macchiato

3. **Advanced Drinks** (Late-game unlocks)
   - Specialty Lattes (Matcha, Lavender, Rose)
   - Cold Brew variations
   - Signature House Blends
   - Seasonal Specials

#### Recipe Mechanics
- **Base + Modifiers**: Choose base (espresso/coffee) + add-ins
- **Temperature**: Hot vs. Iced variations
- **Size**: Small, Medium, Large (affects ingredients used & price)
- **Customization**: Customers can request modifications
- **Recipe Book**: Unlock and save favorite recipes

### 3. Customer System

#### Customer Types
1. **Regulars** (40% of customers)
   - Have favorite drinks
   - Build relationships over time
   - Tip better when satisfied
   - Unlock story moments

2. **Tourists** (30% of customers)
   - Try different things
   - Less price-sensitive
   - Leave reviews (affects reputation)

3. **Students** (20% of customers)
   - Price-conscious
   - Study in shop (ambiance matters)
   - Morning and evening peaks

4. **Business Professionals** (10% of customers)
   - Value speed and quality
   - High-margin customers
   - Rush hour presence

#### Customer Preferences
Each customer has:
- **Drink preference**: Favorite type/recipe
- **Price sensitivity**: Budget range
- **Quality expectations**: Ingredient quality matters
- **Wait tolerance**: Some are more patient
- **Tip likelihood**: Based on satisfaction

#### Satisfaction System
Factors affecting satisfaction:
- **Correct order**: Fulfilling their request (+++)
- **Quality ingredients**: Using premium items (++)
- **Fair pricing**: Within their budget expectations (+)
- **Shop ambiance**: Cleanliness, décor, music (+)
- **Speed of service**: Wait time (+ or -)

Satisfaction leads to:
- ⭐⭐⭐⭐⭐ **Perfect**: Generous tip + great review
- ⭐⭐⭐⭐ **Happy**: Normal tip + good review
- ⭐⭐⭐ **Satisfied**: Full payment, no tip
- ⭐⭐ **Disappointed**: May not return
- ⭐ **Unhappy**: Damages reputation

### 4. Pricing Strategy

#### Dynamic Pricing
- **Menu pricing**: Set base prices for each drink type
- **Modifiers**: Add-ons increase price
- **Size multipliers**: Medium (+30%), Large (+60%)
- **Seasonal adjustments**: Event-based pricing

#### Economic Balance
- **Cost consideration**: Must cover ingredient costs + overhead
- **Market positioning**: Budget, Mid-range, or Premium
- **Competition awareness**: Neighborhood shops affect demand
- **Supply-demand**: Popular items can be priced higher

### 5. Shop Management

#### Upgrades
1. **Equipment**
   - Better Espresso Machine (faster, better quality)
   - Grinder Upgrade (unlocks premium beans)
   - Second Blender (serve more customers)
   - Pastry Warmer (food service)

2. **Capacity**
   - Additional Seating
   - Larger Inventory Storage
   - Display Case (showcase pastries)
   - Queue Management (more customers per day)

3. **Efficiency**
   - Auto-Grinder (saves time)
   - Quick-Serve Station (faster service)
   - Ingredient Pre-Prep (reduce waste)

#### Customization
- **Furniture**: Tables, chairs, counter styles
- **Décor**: Wall art, plants, lighting
- **Color scheme**: Paint, accents, theme
- **Music player**: Ambient sound options
- **Exterior**: Signage, awning, outdoor seating

#### Shop Stats
- **Cleanliness**: Affects customer satisfaction (requires maintenance)
- **Ambiance**: Décor + music + cleanliness = atmosphere score
- **Reputation**: Cumulative reviews from customers
- **Neighborhood presence**: Grow from local secret to hotspot

---

## Progression Systems

### 1. Level & Experience
- **Shop Level**: Gain XP from serving customers, completing days
- **Level Benefits**: Unlock new recipes, equipment, customization
- **Milestones**: Every 5 levels = major unlock

### 2. Reputation Tiers
| Tier | Name | Benefits |
|------|------|----------|
| 1 | **Neighborhood Secret** | Starting tier, locals only |
| 2 | **Local Favorite** | +10% customer traffic |
| 3 | **Hidden Gem** | Tourists start appearing, reviews matter |
| 4 | **Trending Spot** | +25% traffic, premium customers |
| 5 | **Renowned Café** | Special events, celebrity visits |

### 3. Currency & Economy

#### Primary Currency: Coins
- Earned from customer sales
- Used for ingredients, supplies, upgrades
- Bonus from completed work sessions (timer integration)

#### Secondary Currency: Hearts (Reputation Points)
- Earned from customer satisfaction
- Used for special unlocks (recipes, décor items)
- Can't be bought, only earned through service

#### Special Items
- **Gift items**: From regular customers
- **Seasonal tokens**: Limited-time event currency
- **Achievement badges**: Display in shop

### 4. Unlock Tree

#### Early Game (Days 1-10)
- Basic equipment upgrades
- Essential recipes (latte, cappuccino)
- Initial customization options
- Storage expansion

#### Mid Game (Days 11-30)
- Advanced recipes
- Efficiency upgrades
- Regular customer relationships
- Seasonal events unlock

#### Late Game (Days 31+)
- Specialty drinks
- Premium customization
- Story completion
- Challenge modes

---

## Content & Features

### Launch Content (MVP)

#### Recipes: 15 drinks
- Drip Coffee, Espresso, Americano
- Latte, Cappuccino, Mocha
- Macchiato, Flat White, Cortado
- Iced variants of popular drinks
- Tea (Black, Green, Herbal)

#### Ingredients: 25+ items
- 4 coffee bean types
- 5 milk alternatives
- 6 flavor syrups
- 5 toppings
- 5 pastry types

#### Upgrades: 20+ items
- 5 equipment upgrades
- 8 capacity expansions
- 7 efficiency boosts

#### Customization: 30+ options
- 10 furniture sets
- 12 décor items
- 8 color schemes

### Post-Launch Content

#### Update 1: Seasonal Events
- Summer: Iced drink festival
- Fall: Pumpkin spice season
- Winter: Holiday specials
- Spring: Floral flavors

#### Update 2: Customer Stories
- 10 regular customers with narrative arcs
- Relationship building mechanics
- Special unlock rewards

#### Update 3: Advanced Management
- Staff hiring (automation option)
- Supply chain mini-game
- Catering events

---

## User Interface

### UI Screens

#### 1. Timer View (Work Session)
```
┌─────────────────────────────┐
│   ☕ COFFEEDORO              │
├─────────────────────────────┤
│                             │
│         25:00               │
│     ████████████░░░         │
│                             │
│   [Focus Session 2/4]       │
│                             │
│   💰 Coins earned: +50      │
│   Next break: Coffee shop!  │
│                             │
│   [Pause] [Skip] [Settings] │
└─────────────────────────────┘
```

#### 2. Shop Main View (Game)
```
┌─────────────────────────────────────┐
│ ☕ My Coffee Shop      Day 12  ⭐⭐⭐  │
├─────────────────────────────────────┤
│  💰 245  🍵 Inventory  ❤️ 78         │
├─────────────────────────────────────┤
│  [Shop View - Isometric or 2D]     │
│                                     │
│   Customers waiting: 3              │
│                                     │
│  👤 → "Can I get a latte?"          │
│      [Serve] [View Order]           │
│                                     │
├─────────────────────────────────────┤
│ [Menu] [Inventory] [Upgrade] [☰]    │
└─────────────────────────────────────┘
```

#### 3. Recipe Crafting
```
┌─────────────────────────────┐
│   Craft: Latte              │
├─────────────────────────────┤
│  Base: [Espresso ▼]         │
│  Milk: [Whole Milk ▼]       │
│  Size: [●] S  [●] M  [ ] L  │
│  Temp: [●] Hot  [ ] Iced    │
│                             │
│  Add-ons:                   │
│  [ ] Vanilla (+$0.50)       │
│  [ ] Caramel (+$0.50)       │
│  [✓] Extra Shot (+$0.75)    │
│                             │
│  Cost: $2.50 | Sell: $5.50  │
│  Profit: $3.00              │
│                             │
│  [Cancel]  [Serve! ☕]      │
└─────────────────────────────┘
```

### UI Principles
- **Clarity**: Information at a glance
- **Cozy aesthetic**: Warm colors, rounded corners, friendly fonts
- **Minimal clicks**: Streamlined interactions
- **Visual feedback**: Satisfying animations and sounds
- **Accessibility**: Readable fonts, color-blind friendly, keyboard shortcuts

---

## Audio Design

### Sound Effects
- **Coffee preparation**: Grinding, brewing, steaming milk, pouring
- **Customer interactions**: Door chime, conversation murmur, coins jingling
- **UI feedback**: Button clicks, achievement pops, level-up fanfare
- **Ambiance layers**: Background café sounds, rain (optional), music

### Music
- **Lo-fi café beats**: Chill, instrumental background music
- **Adaptive volume**: Lower during timer, present during game
- **Unlockable tracks**: Expand playlist through progression
- **Silence option**: For users who prefer quiet breaks

### Audio Settings
- Master volume
- SFX volume
- Music volume
- Ambiance volume
- Mute during focus sessions option

---

## Balance & Economy

### Starting Conditions
- **Starting cash**: $100
- **Starting inventory**: Basic supplies for 5 drinks
- **Starting equipment**: Basic coffee maker
- **Starting shop**: Minimal décor, 2 seats

### Progression Curve
| Day Range | Avg. Daily Earnings | Major Unlock | Customer Count |
|-----------|---------------------|--------------|----------------|
| 1-5 | $50-$100 | Basic recipes | 5-8 |
| 6-10 | $100-$200 | First equipment upgrade | 8-12 |
| 11-20 | $200-$400 | Intermediate recipes | 12-15 |
| 21-30 | $400-$700 | Customization freedom | 15-20 |
| 31+ | $700-$1500 | Advanced content | 20-25 |

### Economic Balance Goals
- **Upgrade pacing**: Major upgrade every 3-5 days
- **Recipe variety**: New recipe every 2-3 days
- **Customization**: Cosmetic changes affordable throughout
- **Never stuck**: Always have something to work toward
- **Soft caps**: Diminishing returns prevent runaway growth

### Difficulty Balancing
- **Forgiving early game**: Hard to fail, easy to learn
- **Strategic mid-game**: Choices matter, optimizations possible
- **Relaxed late game**: Comfortable routine, focus on aesthetics
- **Optional challenges**: Hard mode for experienced players

---

## Appendix: Future Features

### Potential Expansions
1. **Staff System**: Hire baristas to automate service
2. **Supply Chain**: Negotiate with suppliers, farm relationships
3. **Catering**: Special events for bonus earnings
4. **Franchise Mode**: Open multiple locations
5. **Recipe Creation**: Custom drinks with unique names
6. **Customer Loyalty Programs**: Punch cards, memberships
7. **Mini-games**: Latte art, coffee tasting
8. **Photo Mode**: Share your beautiful shop
9. **Mods Support**: Community-created content
10. **Shop Themes**: Beyond coffee (tea house, juice bar)

### Community Features (Future)
- Visit friend's shops
- Trade rare items
- Weekly challenges
- Global events
- Recipe sharing

---

## Design Philosophy

### What Makes Coffeedoro Special

1. **Respect for Time**: Designed around real break lengths
2. **Positive Reinforcement**: Work and play reward each other
3. **No FOMO**: Miss a day? No penalties, just welcome back
4. **Player Expression**: Your shop reflects your style
5. **Gentle Strategy**: Think, but don't stress
6. **Cozy First**: Aesthetics and feel are paramount

### What We Avoid

❌ **Time pressure mechanics** (timed events, customer anger)
❌ **Punishment for breaks** (decay, failure states)
❌ **Grinding** (repetitive tasks for minimal progress)
❌ **Pay-to-win** (monetization that affects gameplay)
❌ **Dark patterns** (manipulative engagement tactics)
❌ **Complexity creep** (keeping it accessible)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-23
**Status**: Initial Design - Ready for Development
