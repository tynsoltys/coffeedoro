# Pomodoro Cafe: Game Balance Spreadsheet
**Version:** 1.0 - Initial Balance Proposal  
**Last Updated:** November 22, 2025

---

## Overview

This document outlines the initial game balance for Pomodoro Cafe. All values are starting proposals and should be tuned based on playtesting. The goal is to create a challenging but fair progression curve that keeps players engaged for 20-30 days of play.

---

## Starting Values

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| **Starting Money** | $100 | Enough for 2-3 days of initial inventory |
| **Starting Reputation** | 50 | Middle of 0-100 scale, room to grow or fall |
| **Starting Day** | 1 | Linear day counter |
| **Base Customers per Day** | 20 | Enough to feel activity without overwhelming |

---

## Item Costs & Prices (MVP)

### Coffee Beans

| Quality Tier | Cost per Unit | Suggested Retail | Margin | Customer Appeal |
|--------------|--------------|------------------|--------|-----------------|
| **Basic** | $2.00 | $4.00 - $6.00 | 100-200% | Low quality, price-sensitive customers |
| **Premium** (Phase 2) | $3.50 | $6.00 - $8.00 | 71-129% | Higher quality, less price-sensitive |
| **Specialty** (Phase 2) | $5.00 | $8.00 - $12.00 | 60-140% | Best quality, coffee enthusiasts |

**Notes:**
- 1 unit of coffee beans = 10 servings
- Each customer buys 1 serving
- Unused beans carry over to next day (no spoilage in MVP)

### Milk

| Quality Tier | Cost per Unit | Usage | Notes |
|--------------|--------------|-------|-------|
| **Regular** | $3.00 | 15 servings per unit | Oat milk, whole milk, etc. (MVP uses regular) |
| **Premium** (Phase 2) | $4.50 | 15 servings per unit | Organic, specialty alternatives |

**Notes:**
- Approximately 60% of coffee drinks use milk
- Unused milk carries over (no spoilage in MVP)

### Pastries

| Item | Cost per Unit | Suggested Retail | Notes |
|------|--------------|------------------|-------|
| **Croissant** | $1.00 | $3.00 - $4.00 | Most popular |
| **Muffin** | $0.80 | $2.50 - $3.50 | Budget option |
| **Cookie** | $0.50 | $2.00 - $3.00 | Impulse buy |

**Notes:**
- 40% of customers buy a pastry with their drink
- Pastries don't spoil in MVP (simplification)

---

## Operating Costs

| Expense Type | Cost per Day | When Charged | Notes |
|--------------|--------------|--------------|-------|
| **Rent** | $10 | Every day | Fixed cost, always charged |
| **Utilities** | $5 | Every day | Electricity, water, internet |
| **Supplies** | $2 | Every day | Cups, napkins, cleaning supplies |
| **Total Fixed Costs** | $17/day | - | Minimum daily cost |

**Phase 2 Additions:**
- Staff wages (if hired): $20-50/day per employee
- Marketing costs (optional): $10-30/day for promotions
- Loan repayment (if taken): Variable based on terms

---

## Customer Demand Algorithm (MVP)

### Base Calculation
```
Base Customers = 20 * (Reputation / 50)

Example:
- Reputation 50 (starting): 20 customers
- Reputation 75: 30 customers
- Reputation 25: 10 customers
```

### Modifiers

| Modifier | Effect | Example |
|----------|--------|---------|
| **Weather: Rainy** | +30% customers | 20 → 26 customers |
| **Weather: Sunny** | -10% customers | 20 → 18 customers |
| **Price vs Market** | -5% per $1 over fair price | Coffee at $7 vs $5 fair: -10% |
| **Stock-Out** | Reputation -10 | Ran out of coffee during day |
| **Day of Week** (Phase 2) | Weekends +20%, Mondays +10% | More busy at start/end of week |

### Price Sensitivity

| Price Range | Customer Response |
|-------------|-------------------|
| **$4.00 - $5.00** | Optimal - no penalty |
| **$5.00 - $6.00** | Slight penalty: -5% customers |
| **$6.00 - $7.00** | Moderate penalty: -10% customers |
| **$7.00+** | Heavy penalty: -20% customers |
| **< $4.00** | Suspicious - quality concerns: -5% customers |

**Market Fair Price (MVP):** $5.00 for regular coffee

---

## Reputation System

### Reputation Range: 0-100

| Reputation Level | Description | Customer Volume Modifier |
|-----------------|-------------|-------------------------|
| **0-20** | Terrible - near bankruptcy | 0.2x (very few customers) |
| **21-40** | Poor - struggling | 0.5x |
| **41-60** | Average - steady | 1.0x (base) |
| **61-80** | Good - thriving | 1.5x |
| **81-100** | Excellent - neighborhood favorite | 2.0x |

### Reputation Changes

| Event | Reputation Change | Notes |
|-------|------------------|-------|
| **Satisfied Customer** | +0.5 per customer | Cumulative over day |
| **Unsatisfied Customer** | -1.0 per customer | Happens when stock-out or very high prices |
| **Stock-Out** | -10 | Per item that runs out |
| **Perfect Day** | +5 bonus | Sold everything, no complaints |
| **Food Critic Visit** (Event) | +15 or -15 | Based on quality and price |
| **Negative Review** (Event) | -20 | Random event, rare |
| **Featured in Local Paper** (Event) | +25 | Random event, rare |

**Reputation Decay:** None in MVP (simplified). Phase 2 could add -1 per day if inactive.

---

## Difficulty Progression

### Days 1-5: Tutorial Phase
- **Goal:** Learn the basics without pressure
- **Customer Volume:** 15-25 customers
- **Events:** None (or very simple positive events)
- **Margin for Error:** High - easy to make profit

### Days 6-10: Early Game
- **Goal:** Establish profitable routine
- **Customer Volume:** 25-40 customers
- **Events:** Occasional (20% chance per day)
- **Competition:** None yet
- **Challenge:** Balancing inventory and pricing

### Days 11-20: Mid Game
- **Goal:** Build reputation, unlock upgrades (Phase 2)
- **Customer Volume:** 40-60 customers
- **Events:** Regular (30% chance per day)
- **Competition:** Mild (another cafe opens nearby)
- **Challenge:** Maintaining quality while scaling

### Days 21-30: Late Game
- **Goal:** Maximize profit, achieve mastery
- **Customer Volume:** 60-100 customers
- **Events:** Frequent (40% chance per day), higher stakes
- **Competition:** Strong (multiple competitors)
- **Challenge:** Complex decision-making, reacting to events

### Days 31+: Endgame
- **Goal:** See how high you can go
- **Customer Volume:** 100+ customers (if reputation maxed)
- **Events:** Constant surprises
- **Win Condition:** Reach $1,000 profit (or other milestone)

---

## Example Day Simulation

### Day 1 Example (Good Choices)

**Starting State:**
- Money: $100
- Reputation: 50
- Day: 1

**Player Decisions:**
- Buy 2 units coffee beans: -$4 (20 servings)
- Buy 1 unit milk: -$3 (15 servings)
- Buy 5 croissants: -$5
- Set coffee price: $5.00
- Set croissant price: $3.50
- **Remaining Money:** $88

**Simulation:**
- Base customers: 20 (reputation 50)
- Weather: Sunny (-10%): 18 customers
- Price modifier (fair price): 0%
- **Total Customers:** 18

**Sales:**
- Coffee sold: 18 servings (plenty of stock)
- Milk used: ~11 servings (60% of coffees)
- Croissants sold: 7 (40% of customers)

**Revenue:**
- Coffee: 18 × $5.00 = $90
- Croissants: 7 × $3.50 = $24.50
- **Total Revenue:** $114.50

**Costs:**
- Inventory: $12 (already deducted)
- Operating: $17 (rent, utilities, supplies)
- **Total Costs:** $29

**Profit:** $114.50 - $29 = $85.50

**Reputation Change:**
- Satisfied customers: 18 × 0.5 = +9
- No stock-outs: 0
- **New Reputation:** 59

**End of Day 1:**
- Money: $88 + $85.50 = $173.50 (great day!)
- Reputation: 59
- Inventory Remaining: 2 coffee servings, 4 milk servings, 0 croissants

---

### Day 1 Example (Poor Choices)

**Starting State:** Same as above

**Player Decisions:**
- Buy 1 unit coffee beans: -$2 (10 servings) - not enough!
- Buy 0 milk: -$0 - rookie mistake
- Buy 2 croissants: -$2
- Set coffee price: $8.00 - way too expensive!
- Set croissant price: $5.00 - also too expensive
- **Remaining Money:** $96

**Simulation:**
- Base customers: 20
- Weather: Sunny (-10%): 18
- Price modifier ($8 vs $5 fair): -15% penalty → 15 customers show up
- **Total Customers:** 15

**Sales:**
- Coffee sold: 10 servings (stock-out after 10!)
- 5 customers leave unsatisfied (no coffee available)
- No milk available (customers even more disappointed)
- Croissants sold: 1 (too expensive, low sales)

**Revenue:**
- Coffee: 10 × $8.00 = $80
- Croissants: 1 × $5.00 = $5
- **Total Revenue:** $85

**Costs:**
- Inventory: $4
- Operating: $17
- **Total Costs:** $21

**Profit:** $85 - $21 = $64 (seems okay but...)

**Reputation Change:**
- Satisfied customers: 10 × 0.5 = +5
- Stock-out penalty: -10 (coffee ran out)
- Overpriced penalty: Customers unhappy → 5 × -1 = -5
- **New Reputation:** 50 + 5 - 10 - 5 = 40 (uh oh!)

**End of Day 1:**
- Money: $96 + $64 = $160 (profit but damaged reputation)
- Reputation: 40 (dropped significantly!)
- Inventory Remaining: 0 coffee, 0 milk, 1 croissant

**Lesson:** Short-term profit at cost of reputation = bad long-term strategy

---

## Random Events (MVP)

| Event | Probability | Effect | Description |
|-------|-------------|--------|-------------|
| **Rainy Day** | 20% | +30% customers | People seek shelter in cozy cafes |
| **Supply Shortage** | 10% | +50% ingredient costs (next purchase) | Coffee bean shortage in region |
| **Food Critic Visit** | 5% | +/-15 reputation | Critic reviews your cafe (based on quality) |
| **Competitor Opens** | 5% | -20% customers (for 3 days) | New cafe nearby steals business |
| **Local Event** | 10% | +40% customers | Festival, concert, or market nearby |
| **Equipment Malfunction** (Phase 2) | 5% | Half serving speed | Espresso machine breaks, pay to fix |
| **Regular Customer** (Phase 2) | 15% | +$20 tip, small reputation boost | Loyal customer appreciates you |

**Event Frequency:**
- Days 1-5: 10% chance per day
- Days 6-15: 25% chance per day
- Days 16+: 35% chance per day

---

## Win/Loss Conditions

### Loss Conditions
- **Bankruptcy:** Money < $0 AND inventory = 0 (can't buy anything)
- **Reputation Death:** Reputation reaches 0 (no customers will come)

### Win Conditions (Milestones)
- **Bronze:** Survive 7 days
- **Silver:** Earn $500 total profit
- **Gold:** Reach 75 reputation
- **Platinum:** Earn $1,000 total profit
- **Diamond:** Reach 100 reputation

**Endless Mode:** No true win condition, just see how long you can thrive

---

## Phase 2: Upgrades & Expansions

### Equipment Upgrades

| Upgrade | Cost | Effect | Unlock Requirement |
|---------|------|--------|-------------------|
| **Better Espresso Machine (Tier 2)** | $200 | +20% customer capacity | Day 5, Reputation 60 |
| **Better Espresso Machine (Tier 3)** | $500 | +40% customer capacity | Day 15, Reputation 75 |
| **Premium Grinder** | $150 | +5 reputation per day | Day 7, Reputation 65 |
| **Comfortable Seating** | $300 | Customers stay longer, +10% tips | Day 10, Reputation 70 |
| **Outdoor Seating** | $400 | +15% customers on sunny days | Day 12, Reputation 70 |

### Staff Hiring (Phase 2)

| Staff Type | Daily Wage | Effect | Unlock |
|------------|-----------|--------|--------|
| **Barista** | $30/day | +25% serving speed | Day 8 |
| **Baker** | $25/day | -20% pastry costs (bulk discount) | Day 10 |
| **Manager** | $50/day | Auto-optimize prices daily | Day 20 |

### Menu Expansion (Phase 2)

| Item | Unlock Cost | Ingredient Cost | Suggested Price | Unlock Day |
|------|------------|----------------|----------------|------------|
| **Cappuccino** | $50 | $2.50 | $6.00 | Day 6 |
| **Latte** | $50 | $2.75 | $6.50 | Day 6 |
| **Cold Brew** | $75 | $3.00 | $7.00 | Day 10 |
| **Espresso** | $40 | $2.00 | $4.00 | Day 5 |
| **Sandwich** | $100 | $2.50 | $7.00 | Day 12 |
| **Soup** | $80 | $1.50 | $5.00 | Day 15 |

---

## Playtesting Guidelines

### What to Track
- [ ] Average days survived
- [ ] Bankruptcy rate (% of players)
- [ ] Average money at Day 7, 14, 30
- [ ] Average reputation at Day 7, 14, 30
- [ ] Most common cause of failure
- [ ] Player feedback on difficulty

### Target Metrics (Goals)
- Median survival: 10-15 days (encourages replay)
- Bankruptcy rate: 30-40% (challenging but fair)
- Day 7 success rate: 80% (tutorial phase works)
- "Just one more day" feeling: High (addictive loop)

### Tuning Knobs
If game is too easy:
- Increase operating costs ($17 → $20)
- Reduce base customers (20 → 15)
- Increase competition effects
- More negative events

If game is too hard:
- Increase starting money ($100 → $150)
- Reduce operating costs ($17 → $12)
- Increase base customers (20 → 25)
- More positive events
- Slower reputation decay

---

## Balance Philosophy

### Core Principles
1. **Risk vs Reward:** Higher margins = higher risk (expensive pricing)
2. **Long-term Thinking:** Reputation > short-term profit
3. **Adaptability:** React to events and adjust strategy
4. **No Optimal Solution:** Multiple viable strategies
5. **Forgiveness:** Mistakes shouldn't instantly end game

### Player Archetypes
- **Optimizer:** Finds perfect balance, maxes profit
- **Risk-Taker:** High prices, big swings
- **Conservative:** Plays it safe, slow growth
- **Storyteller:** Cares about events and narrative

**All archetypes should be viable!**

---

## Notes & TODOs

### Balance Concerns
- [ ] Is Day 1 too hard? Consider higher starting money
- [ ] Are events impactful enough?
- [ ] Does reputation change too slowly?
- [ ] Is operating cost too high/low?

### Future Considerations
- Dynamic difficulty based on performance
- Multiple cafe locations (scaling complexity)
- Loans and investments (risk/reward)
- Seasonal changes (winter = fewer customers, but higher prices work)
- Staff personalities and random events
- Customer types with different preferences

---

## Spreadsheet Format

**Recommended Tool:** Google Sheets or Excel

**Tabs to Create:**
1. **Starting Values** - All initial numbers
2. **Items & Costs** - Inventory pricing
3. **Reputation** - Reputation effects and changes
4. **Events** - Full events library with probabilities
5. **Progression** - Day-by-day difficulty curve
6. **Upgrades** - All Phase 2+ upgrades
7. **Simulation** - Interactive calculator for testing scenarios
8. **Playtesting** - Log actual player data

---

## Version History

### v1.0 (Nov 22, 2025)
- Initial balance proposal
- MVP-focused values
- Example simulations
- Phase 2 upgrade outlines

### Future Updates
- v1.1: After initial playtesting feedback
- v1.2: After MVP launch (real player data)
- v2.0: Phase 2 balance (upgrades, staff, menu)

---

**Maintainer:** Game Design Team  
**Last Playtested:** Not yet (pre-development)  
**Next Review:** After first playtest session

---

## Quick Reference Card

```
STARTING VALUES
Money: $100
Reputation: 50 (scale 0-100)
Base Customers: 20/day

COSTS (per unit)
Coffee Beans: $2 (10 servings)
Milk: $3 (15 servings)
Croissant: $1 each
Operating: $17/day (fixed)

RECOMMENDED PRICES
Coffee: $4-6 (fair price: $5)
Croissant: $3-4 (fair price: $3.50)

REPUTATION
+0.5 per satisfied customer
-1.0 per unsatisfied customer
-10 for stock-outs

CUSTOMER FORMULA
Base × (Reputation / 50) × Weather × Price Modifier
```

---

**Now go balance your cafe! ☕📊**
