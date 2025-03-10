#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Multilingo Test Script ===${NC}"
echo -e "${YELLOW}This script will start the Multilingo server and open test tools in your browser${NC}"
echo ""

# Check if PostgreSQL is running
echo -e "${YELLOW}Checking if PostgreSQL is running...${NC}"
pg_isready -h localhost -p 5432 > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}PostgreSQL is not running. Please start PostgreSQL and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}PostgreSQL is running.${NC}"

# Start the Spring Boot application
echo -e "${YELLOW}Starting Multilingo server...${NC}"
echo -e "${YELLOW}(This will run in the background. Press Ctrl+C when done testing)${NC}"
./gradlew bootRun &
SERVER_PID=$!

# Wait for the server to start
echo -e "${YELLOW}Waiting for server to start...${NC}"
sleep 10

# Check if server is running
curl -s http://localhost:8080/actuator/health > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Server might still be starting, waiting another 10 seconds...${NC}"
    sleep 10
    curl -s http://localhost:8080/actuator/health > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo -e "${RED}Server failed to start. Check the logs for errors.${NC}"
        kill $SERVER_PID
        exit 1
    fi
fi

echo -e "${GREEN}Server is running!${NC}"

# Open test tools in browser
echo -e "${YELLOW}Opening test tools in your browser...${NC}"

# Open Swagger UI
# echo -e "${YELLOW}1. Opening Swagger UI for API testing${NC}"
# open http://localhost:8080/swagger-ui/index.html

# Open test client
# echo -e "${YELLOW}2. Opening test client for WebSocket testing${NC}"
# open http://localhost:8080/test-client.html

# Open dual user test client
echo -e "${YELLOW}3. Opening dual user test client for WebSocket testing${NC}"
open http://localhost:8080/dual-client-test.html

echo ""
echo -e "${GREEN}Test tools are now open in your browser.${NC}"
echo -e "${YELLOW}Follow these steps to test:${NC}"
echo "1. Use Swagger UI to explore and test the REST APIs"
echo "2. Use the test client to test the core functionality:"
echo "   - Register a user"
echo "   - Login"
echo "   - Create a conversation"
echo "   - Connect to WebSocket"
echo "   - Send and receive messages"
echo "3. Use the dual user test client to test WebSocket communication between two users:"
echo "   - Register two users with different languages"
echo "   - Login with both users"
echo "   - Create a conversation between them"
echo "   - Connect both users to WebSocket"
echo "   - Send messages from each user and observe the translation"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server when done testing.${NC}"

# Wait for user to press Ctrl+C
wait $SERVER_PID 