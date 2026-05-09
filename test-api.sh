#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"

echo -e "${BLUE}=== API Testing Script ===${NC}\n"

# Test 1: Create a Task
echo -e "${YELLOW}1. Testing POST /tasks (Create Task)${NC}"
curl -X POST "${BASE_URL}/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete Project Documentation",
    "deadline": "2026-05-15T18:00:00Z",
    "priority": "high",
    "status": "pending"
  }' \
  -w "\nStatus: %{http_code}\n\n"

# Test 2: Create another Task
echo -e "${YELLOW}2. Testing POST /tasks (Create Another Task)${NC}"
curl -X POST "${BASE_URL}/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review Code Pull Requests",
    "deadline": "2026-05-16T15:00:00Z",
    "priority": "medium",
    "status": "pending"
  }' \
  -w "\nStatus: %{http_code}\n\n"

# Test 3: Get all Tasks
echo -e "${YELLOW}3. Testing GET /tasks (Get All Tasks)${NC}"
curl -X GET "${BASE_URL}/tasks" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

# Test 4: Create Finance (Income)
echo -e "${YELLOW}4. Testing POST /finance (Create Income)${NC}"
curl -X POST "${BASE_URL}/finance" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "income",
    "amount": 5000000,
    "category": "Gaji",
    "date": "2026-05-09T00:00:00Z"
  }' \
  -w "\nStatus: %{http_code}\n\n"

# Test 5: Create Finance (Expense)
echo -e "${YELLOW}5. Testing POST /finance (Create Expense)${NC}"
curl -X POST "${BASE_URL}/finance" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 500000,
    "category": "Makan",
    "date": "2026-05-09T00:00:00Z"
  }' \
  -w "\nStatus: %{http_code}\n\n"

# Test 6: Get all Finance
echo -e "${YELLOW}6. Testing GET /finance (Get All Finance)${NC}"
curl -X GET "${BASE_URL}/finance" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n\n"

echo -e "${GREEN}=== Testing Complete ===${NC}"
