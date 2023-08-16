**login**
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/x-www-form-urlencoded" -d "email=test@gmail.com&password=tester"

**join group**
curl -X POST "http://localhost:3001/group/join" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMDgxMTYyLCJleHAiOjE2OTIwODQ3NjJ9.soQvTisGeSfG_44uUtXr9MIALpMea6m3KwTcCf1qQFg" -d "{\"invCode\": \"jdLvzvBB\"}"

**edit group**
curl -X POST "http://localhost:3001/group/edit" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMDgzNzAwLCJleHAiOjE2OTIwODczMDB9.llTSyWGCoVxjTYScbyYfQPqNz9Md-Utm8PMg6-31REc" -d "{\"groupId\": 10008561, \"newGroupName\": \"New Group Name\"}"
