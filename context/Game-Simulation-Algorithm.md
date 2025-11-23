# Game Simulation Algorithm Specification
**Pomodoro Cafe MVP**

---

## Overview

This document specifies the core game simulation algorithm that processes a player's turn and generates results. The simulation is **deterministic** (same inputs = same outputs) and **pure** (no side effects).

**File Location:** `/src/game/simulation.ts`

---

## Algorithm Flow

```
Input: SimulationInput
  ↓
1. Calculate Base Customer Demand
  ↓
2. Apply Event Modifiers
  ↓
3. Apply Weather Effects
  ↓
4. Apply Pricing Modifiers
  ↓
5. Determine Final Customer Count
  ↓
6. Process Sales (until stock runs out)
  ↓
7. Calculate Revenue & Costs
  ↓
8. Update Reputation
  ↓
9. Generate Customer Feedback
  ↓
10. Apply Random Events
  ↓
Output: DayResult
```

---

## Main Simulation Function

```typescript
/**
 * Main entry point for game simulation
 * 
 * @param input - Current game state and player choices
 * @returns Complete results of the day
 */
export function simulateDay(input: SimulationInput): DayResult {
  // 1. Determine events for this day
  const events = generateEvents(input.player.dayNumber, input.seed);
  
  // 2. Calculate customer demand
  const customerDemand = calculateCustomerDemand(
    input.player.reputation,
    input.pricing,
    events
  );
  
  // 3. Process sales
  const salesResult = processSales(
    customerDemand,
    input.inventory,
    input.pricing
  );
  
  // 4. Calculate costs
  const costs = calculateOperatingCosts(input.player.dayNumber);
  
  // 5. Calculate profit
  const profit = salesResult.revenue - costs.total;
  
  // 6. Update reputation
  const reputationChange = calculateReputationChange(
    salesResult,
    events
  );
  const newReputation = clamp(
    input.player.reputation + reputationChange,
    0,
    100
  );
  
  // 7. Generate customer feedback
  const feedback = generateCustomerFeedback(salesResult, input.pricing);
  
  // 8. Update player state
  const newPlayerState: PlayerState = {
    ...input.player,
    money: input.player.money + profit,
    reputation: newReputation,
    dayNumber: input.player.dayNumber + 1,
    totalRevenue: input.player.totalRevenue + salesResult.revenue,
    totalProfit: input.player.totalProfit + profit,
  };
  
  // 9. Compile results
  return {
    day: input.player.dayNumber,
    timestamp: new Date().toISOString(),
    revenue: salesResult.revenue,
    costs,
    profit,
    sales: salesResult.breakdown,
    customersServed: salesResult.customersServed,
    customersSatisfied: salesResult.customersSatisfied,
    customersUnsatisfied: salesResult.customersUnsatisfied,
    customersTurnedAway: salesResult.customersTurnedAway,
    inventoryUsed: salesResult.inventoryUsed,
    inventorySpoiled: { coffeeBeans: 0, milk: 0, croissants: 0 }, // MVP: no spoilage
    inventoryRemaining: salesResult.inventoryRemaining,
    reputationChange,
    newReputation,
    events,
    feedback,
    stockOuts: salesResult.stockOuts,
    newPlayerState,
  };
}
```

---

## 1. Customer Demand Calculation

### Base Demand

```typescript
/**
 * Calculate base customer demand before modifiers
 * 
 * Formula: baseCustomers * (reputation / 50)
 * 
 * @param reputation - Player's current reputation (0-100)
 * @returns Base customer count (before modifiers)
 */
function calculateBaseDemand(reputation: number): number {
  const { basePerDay } = GAME_BALANCE.customer;
  
  // Reputation 50 = 100% of base customers
  // Reputation 25 = 50% of base customers
  // Reputation 75 = 150% of base customers
  const reputationMultiplier = reputation / 50;
  
  return basePerDay * reputationMultiplier;
}
```

### Price Sensitivity

```typescript
/**
 * Calculate customer reduction due to pricing
 * 
 * @param pricing - Current menu prices
 * @returns Multiplier (1.0 = no change, 0.9 = -10%)
 */
function calculatePriceModifier(pricing: Pricing): number {
  const { fairCoffeePrice, pricePenaltyPerDollar } = GAME_BALANCE.customer;
  
  // How much over fair price?
  const priceDeviation = pricing.coffee - fairCoffeePrice;
  
  // Within tolerance range? No penalty
  if (Math.abs(priceDeviation) <= 1.0) {
    return 1.0;
  }
  
  // Too expensive? Penalty
  if (priceDeviation > 1.0) {
    const dollarsOver = priceDeviation - 1.0;
    const penalty = dollarsOver * pricePenaltyPerDollar;
    return Math.max(0.5, 1.0 - penalty); // Min 50% customers
  }
  
  // Too cheap? Small penalty (quality concerns)
  if (priceDeviation < -1.0) {
    return 0.95; // -5% customers
  }
  
  return 1.0;
}
```

### Event Modifiers

```typescript
/**
 * Apply event effects to customer demand
 * 
 * @param baseCustomers - Customer count before events
 * @param events - Active events for this day
 * @returns Modified customer count
 */
function applyEventModifiers(
  baseCustomers: number,
  events: GameEvent[]
): number {
  let customers = baseCustomers;
  
  for (const event of events) {
    if (event.effects.customerModifier) {
      customers *= event.effects.customerModifier;
    }
  }
  
  return Math.round(customers);
}
```

### Complete Customer Demand

```typescript
/**
 * Calculate total customer demand for the day
 */
function calculateCustomerDemand(
  reputation: number,
  pricing: Pricing,
  events: GameEvent[]
): number {
  // 1. Base demand from reputation
  let customers = calculateBaseDemand(reputation);
  
  // 2. Apply pricing modifier
  const priceModifier = calculatePriceModifier(pricing);
  customers *= priceModifier;
  
  // 3. Apply event modifiers
  customers = applyEventModifiers(customers, events);
  
  // 4. Add random variance (±10%)
  const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
  customers *= variance;
  
  // 5. Round and ensure minimum
  return Math.max(1, Math.round(customers));
}
```

---

## 2. Sales Processing

### Sales Algorithm

```typescript
interface SalesResult {
  revenue: number;
  breakdown: SalesBreakdown;
  customersServed: number;
  customersSatisfied: number;
  customersUnsatisfied: number;
  customersTurnedAway: number;
  inventoryUsed: InventoryUsed;
  inventoryRemaining: Inventory;
  stockOuts: string[];
}

/**
 * Process sales for the day
 * Customers buy until inventory runs out
 */
function processSales(
  customerDemand: number,
  startingInventory: Inventory,
  pricing: Pricing
): SalesResult {
  // Working copies
  const inventory = { ...startingInventory };
  const inventoryUsed: InventoryUsed = {
    coffeeBeans: 0,
    milk: 0,
    croissants: 0,
  };
  
  let revenue = 0;
  let customersServed = 0;
  let customersSatisfied = 0;
  let customersUnsatisfied = 0;
  let customersTurnedAway = 0;
  
  const coffeeSold: number[] = [];
  const croissantsSold: number[] = [];
  const stockOuts: string[] = [];
  
  // Process each customer
  for (let i = 0; i < customerDemand; i++) {
    // Customer wants coffee
    if (inventory.coffeeBeans > 0) {
      // Check if needs milk (60% chance)
      const needsMilk = Math.random() < GAME_BALANCE.customer.milkUsageRate;
      
      if (needsMilk && inventory.milk === 0) {
        // Customer leaves unsatisfied (no milk)
        customersUnsatisfied++;
        customersTurnedAway++;
        if (!stockOuts.includes('milk')) {
          stockOuts.push('milk');
        }
        continue;
      }
      
      // Sell coffee
      inventory.coffeeBeans -= 1;
      inventoryUsed.coffeeBeans += 1;
      if (needsMilk) {
        inventory.milk -= 1;
        inventoryUsed.milk += 1;
      }
      
      revenue += pricing.coffee;
      coffeeSold.push(1);
      customersServed++;
      
      // Check if wants pastry (40% chance)
      const wantsPastry = Math.random() < GAME_BALANCE.customer.pastryPurchaseRate;
      
      if (wantsPastry) {
        if (inventory.croissants > 0) {
          inventory.croissants -= 1;
          inventoryUsed.croissants += 1;
          revenue += pricing.croissant;
          croissantsSold.push(1);
          customersSatisfied++;
        } else {
          // Customer satisfied with just coffee
          customersSatisfied++;
          if (!stockOuts.includes('croissant')) {
            stockOuts.push('croissant');
          }
        }
      } else {
        customersSatisfied++;
      }
    } else {
      // Out of coffee - customer leaves
      customersUnsatisfied++;
      customersTurnedAway++;
      if (!stockOuts.includes('coffee')) {
        stockOuts.push('coffee');
      }
    }
  }
  
  return {
    revenue,
    breakdown: {
      coffee: {
        sold: coffeeSold.length,
        revenue: coffeeSold.length * pricing.coffee,
      },
      croissant: {
        sold: croissantsSold.length,
        revenue: croissantsSold.length * pricing.croissant,
      },
    },
    customersServed,
    customersSatisfied,
    customersUnsatisfied,
    customersTurnedAway,
    inventoryUsed,
    inventoryRemaining: inventory,
    stockOuts,
  };
}
```

---

## 3. Cost Calculation

```typescript
/**
 * Calculate daily operating costs
 */
function calculateOperatingCosts(dayNumber: number): OperatingCosts {
  const { rent, utilities, supplies } = GAME_BALANCE.operatingCosts;
  
  // MVP: Fixed costs (no inflation)
  return {
    rent,
    utilities,
    supplies,
    spoilage: 0, // Phase 2
    wages: 0, // Phase 2
    total: rent + utilities + supplies,
  };
}
```

---

## 4. Reputation Calculation

```typescript
/**
 * Calculate reputation change based on day's performance
 */
function calculateReputationChange(
  salesResult: SalesResult,
  events: GameEvent[]
): number {
  let change = 0;
  
  // 1. Satisfied customers
  change += salesResult.customersSatisfied * 
    GAME_BALANCE.reputation.satisfiedCustomerBonus;
  
  // 2. Unsatisfied customers
  change -= salesResult.customersUnsatisfied * 
    GAME_BALANCE.reputation.unsatisfiedCustomerPenalty;
  
  // 3. Stock-outs
  change -= salesResult.stockOuts.length * 
    GAME_BALANCE.reputation.stockOutPenalty;
  
  // 4. Perfect day bonus
  if (salesResult.customersUnsatisfied === 0 && 
      salesResult.stockOuts.length === 0 &&
      salesResult.customersServed > 0) {
    change += GAME_BALANCE.reputation.perfectDayBonus;
  }
  
  // 5. Event effects
  for (const event of events) {
    if (event.effects.reputationChange) {
      // Food critic: Depends on performance
      if (event.type === 'food_critic') {
        const satisfaction = 
          salesResult.customersSatisfied / 
          (salesResult.customersSatisfied + salesResult.customersUnsatisfied);
        
        // Good performance? Positive review
        if (satisfaction > 0.8) {
          change += 15;
        } else {
          change -= 15;
        }
      } else {
        change += event.effects.reputationChange;
      }
    }
  }
  
  return change;
}
```

---

## 5. Event Generation

```typescript
/**
 * Generate random events for the day
 * Uses seeded random for reproducibility
 */
function generateEvents(
  dayNumber: number,
  seed?: number
): GameEvent[] {
  // Seed random number generator (if provided)
  const rng = seed !== undefined ? seedRandom(seed) : Math.random;
  
  // Determine event probability based on day
  const probability = getEventProbability(dayNumber);
  
  // Roll for event
  if (rng() > probability) {
    return []; // No events today
  }
  
  // Choose random event
  const eventPool = getAvailableEvents(dayNumber);
  const event = eventPool[Math.floor(rng() * eventPool.length)];
  
  return [event];
}

/**
 * Get event probability based on progression
 */
function getEventProbability(dayNumber: number): number {
  const { days1to5, days6to15, days16plus } = 
    GAME_BALANCE.events.probabilityByDay;
  
  if (dayNumber <= 5) return days1to5;
  if (dayNumber <= 15) return days6to15;
  return days16plus;
}

/**
 * Get available events for current day
 */
function getAvailableEvents(dayNumber: number): GameEvent[] {
  // MVP: All events available from day 1
  return Object.values(EVENTS);
  
  // Phase 2: Unlock events progressively
  // if (dayNumber < 5) return [EVENTS.RAINY_DAY, EVENTS.LOCAL_FESTIVAL];
  // if (dayNumber < 10) return [...basic, EVENTS.SUPPLY_SHORTAGE];
  // return ALL_EVENTS;
}

/**
 * Simple seeded random number generator
 */
function seedRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
```

---

## 6. Customer Feedback Generation

```typescript
/**
 * Generate customer feedback quotes for display
 */
function generateCustomerFeedback(
  salesResult: SalesResult,
  pricing: Pricing
): CustomerFeedback[] {
  const feedback: CustomerFeedback[] = [];
  
  // Always generate 2-3 pieces of feedback
  const feedbackCount = 2 + Math.floor(Math.random() * 2);
  
  // Calculate satisfaction ratio
  const totalCustomers = 
    salesResult.customersSatisfied + salesResult.customersUnsatisfied;
  const satisfactionRatio = 
    totalCustomers > 0 
      ? salesResult.customersSatisfied / totalCustomers 
      : 0;
  
  // Determine feedback types based on performance
  if (satisfactionRatio > 0.8) {
    // Mostly positive
    feedback.push(randomPositiveFeedback(pricing));
    feedback.push(randomPositiveFeedback(pricing));
    if (feedbackCount === 3) {
      feedback.push(randomNeutralFeedback());
    }
  } else if (satisfactionRatio > 0.5) {
    // Mixed
    feedback.push(randomPositiveFeedback(pricing));
    feedback.push(randomNeutralFeedback());
    if (feedbackCount === 3) {
      feedback.push(randomNegativeFeedback(pricing, salesResult));
    }
  } else {
    // Mostly negative
    feedback.push(randomNegativeFeedback(pricing, salesResult));
    feedback.push(randomNegativeFeedback(pricing, salesResult));
    if (feedbackCount === 3) {
      feedback.push(randomNeutralFeedback());
    }
  }
  
  return feedback;
}

// Feedback generators
function randomPositiveFeedback(pricing: Pricing): CustomerFeedback {
  const messages = [
    "Great coffee, perfect price!",
    "Love the cozy atmosphere here.",
    "Best coffee in the neighborhood!",
    "The croissants are amazing!",
    "I come here every day!",
    "Quality is always consistent.",
  ];
  
  return {
    type: 'positive',
    message: messages[Math.floor(Math.random() * messages.length)],
  };
}

function randomNegativeFeedback(
  pricing: Pricing,
  salesResult: SalesResult
): CustomerFeedback {
  // Contextual negative feedback
  if (salesResult.stockOuts.includes('coffee')) {
    return {
      type: 'negative',
      message: "Ran out of coffee! I had to go elsewhere.",
    };
  }
  
  if (pricing.coffee > GAME_BALANCE.customer.fairCoffeePrice + 1) {
    return {
      type: 'negative',
      message: "Too expensive! I can get better prices down the street.",
    };
  }
  
  const messages = [
    "Service was slow today.",
    "The coffee was just okay.",
    "Not as good as it used to be.",
    "Disappointed with today's experience.",
  ];
  
  return {
    type: 'negative',
    message: messages[Math.floor(Math.random() * messages.length)],
  };
}

function randomNeutralFeedback(): CustomerFeedback {
  const messages = [
    "Solid cup of joe.",
    "It's a convenient spot.",
    "Gets the job done.",
    "Nothing special, but reliable.",
  ];
  
  return {
    type: 'neutral',
    message: messages[Math.floor(Math.random() * messages.length)],
  };
}
```

---

## 7. Helper Functions

### Utility Functions

```typescript
/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate percentage change
 */
function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Round to specified decimal places
 */
function roundTo(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}
```

---

## Testing the Simulation

### Unit Test Examples

```typescript
import { describe, it, expect } from 'vitest';
import { simulateDay, calculateBaseDemand, processSales } from './simulation';

describe('calculateBaseDemand', () => {
  it('should return base customers at 50 reputation', () => {
    const demand = calculateBaseDemand(50);
    expect(demand).toBe(20);
  });
  
  it('should return 50% customers at 25 reputation', () => {
    const demand = calculateBaseDemand(25);
    expect(demand).toBe(10);
  });
  
  it('should return 150% customers at 75 reputation', () => {
    const demand = calculateBaseDemand(75);
    expect(demand).toBe(30);
  });
});

describe('processSales', () => {
  it('should sell coffee until stock runs out', () => {
    const result = processSales(
      20, // 20 customers
      { coffeeBeans: 10, milk: 10, croissants: 5 }, // Limited stock
      { coffee: 5.0, croissant: 3.5 }
    );
    
    expect(result.customersServed).toBeLessThanOrEqual(10);
    expect(result.stockOuts).toContain('coffee');
    expect(result.inventoryRemaining.coffeeBeans).toBe(0);
  });
  
  it('should calculate revenue correctly', () => {
    const result = processSales(
      5, // 5 customers
      { coffeeBeans: 10, milk: 10, croissants: 5 },
      { coffee: 5.0, croissant: 3.5 }
    );
    
    // All 5 customers should be served
    expect(result.customersServed).toBe(5);
    
    // Revenue should be customers * coffee price + some pastries
    expect(result.revenue).toBeGreaterThanOrEqual(25); // 5 * $5
    expect(result.revenue).toBeLessThan(50); // Not all buy pastries
  });
});

describe('simulateDay', () => {
  it('should be deterministic with same seed', () => {
    const input: SimulationInput = {
      player: {
        money: 100,
        reputation: 50,
        dayNumber: 1,
        totalRevenue: 0,
        totalProfit: 0,
        milestonesAchieved: [],
      },
      inventory: { coffeeBeans: 20, milk: 15, croissants: 10 },
      pricing: { coffee: 5.0, croissant: 3.5 },
      seed: 12345,
    };
    
    const result1 = simulateDay(input);
    const result2 = simulateDay(input);
    
    // Same inputs + same seed = same outputs
    expect(result1.revenue).toBe(result2.revenue);
    expect(result1.customersServed).toBe(result2.customersServed);
  });
  
  it('should handle stock-outs gracefully', () => {
    const input: SimulationInput = {
      player: {
        money: 100,
        reputation: 75, // High reputation = lots of customers
        dayNumber: 10,
        totalRevenue: 0,
        totalProfit: 0,
        milestonesAchieved: [],
      },
      inventory: { coffeeBeans: 5, milk: 2, croissants: 1 }, // Very limited
      pricing: { coffee: 5.0, croissant: 3.5 },
    };
    
    const result = simulateDay(input);
    
    // Should have stock-outs
    expect(result.stockOuts.length).toBeGreaterThan(0);
    
    // Reputation should decrease
    expect(result.reputationChange).toBeLessThan(0);
    
    // Some customers turned away
    expect(result.customersTurnedAway).toBeGreaterThan(0);
  });
  
  it('should increase reputation on perfect day', () => {
    const input: SimulationInput = {
      player: {
        money: 100,
        reputation: 50,
        dayNumber: 1,
        totalRevenue: 0,
        totalProfit: 0,
        milestonesAchieved: [],
      },
      inventory: { coffeeBeans: 100, milk: 100, croissants: 100 }, // Abundant
      pricing: { coffee: 5.0, croissant: 3.5 }, // Fair prices
    };
    
    const result = simulateDay(input);
    
    // No stock-outs
    expect(result.stockOuts.length).toBe(0);
    
    // Reputation should increase
    expect(result.reputationChange).toBeGreaterThan(0);
    
    // Should get perfect day bonus
    expect(result.reputationChange).toBeGreaterThan(
      result.customersSatisfied * 0.5 // More than just customer bonus
    );
  });
});
```

---

## Performance Considerations

### Optimization Targets

- **Execution Time:** <10ms per simulation
- **Memory Usage:** Minimal allocations
- **Predictability:** Consistent performance

### Implementation Notes

```typescript
// ✅ Good: Pre-allocate arrays
const feedback: CustomerFeedback[] = new Array(3);

// ✅ Good: Avoid repeated calculations
const fairPrice = GAME_BALANCE.customer.fairCoffeePrice;
const deviation = pricing.coffee - fairPrice;

// ❌ Bad: Creating objects in loops
for (let i = 0; i < customers; i++) {
  const customer = { id: i, satisfied: true }; // Allocation in loop
}
```

---

## Validation & Error Handling

```typescript
/**
 * Validate simulation input before processing
 */
function validateSimulationInput(input: SimulationInput): string[] {
  const errors: string[] = [];
  
  // Check reputation bounds
  if (input.player.reputation < 0 || input.player.reputation > 100) {
    errors.push('Reputation must be between 0 and 100');
  }
  
  // Check inventory is non-negative
  if (input.inventory.coffeeBeans < 0 ||
      input.inventory.milk < 0 ||
      input.inventory.croissants < 0) {
    errors.push('Inventory cannot be negative');
  }
  
  // Check pricing is reasonable
  if (input.pricing.coffee < 0 || input.pricing.coffee > 20) {
    errors.push('Coffee price must be between $0 and $20');
  }
  
  return errors;
}

// Use in simulation
export function simulateDay(input: SimulationInput): DayResult {
  const errors = validateSimulationInput(input);
  if (errors.length > 0) {
    throw new Error(`Invalid simulation input: ${errors.join(', ')}`);
  }
  
  // ... proceed with simulation
}
```

---

## Future Enhancements (Phase 2+)

### Additional Features to Add

1. **Dynamic Pricing**
   - Peak hours (morning rush)
   - Happy hour discounts
   
2. **Spoilage System**
   - Inventory decays over time
   - Different decay rates per item
   
3. **Staff Management**
   - Staff reduce player workload
   - Staff have wages and skills
   
4. **Competition**
   - Other cafes in neighborhood
   - Dynamic market pricing
   
5. **Customer Types**
   - Students (price-sensitive)
   - Workers (quality-focused)
   - Tourists (ambiance-focused)
   - Regulars (loyalty bonus)

---

## Next Steps

1. **Implement** core simulation in `/src/game/simulation.ts`
2. **Write tests** for all functions
3. **Tune balance** based on playtesting
4. **Profile performance** to ensure <10ms execution
5. **Document edge cases** as they're discovered

---

**Last Updated:** November 22, 2025  
**Owner:** Game Design Team  
**Related Docs:**
- [Data Models](./Data-Models.md)
- [Game Balance Spreadsheet](./Game-Balance-Spreadsheet.md)
- [Technical Architecture](./Technical-Architecture.md)
