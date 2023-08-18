**register**
curl -X POST http://localhost:3001/auth/register -H "Content-Type: application/x-www-form-urlencoded" -d "username=newed&email=newed@gmail.com&password=newed"

**login**
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/x-www-form-urlencoded" -d "email=test@gmail.com&password=tester"

**join group**
curl -X POST "http://localhost:3001/group/join" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMjAzNCwiaWF0IjoxNjkyMjUzNDQ5LCJleHAiOjE2OTIyNTcwNDl9.1ZexV0x-EqCXruTpPVijU9iLqhVkyqaTpu9CJ2RiZGo" -d "{\"invCode\": \"jdLvzvBB\"}"
 
**edit group**
curl -X POST "http://localhost:3001/group/edit" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMjU0NTA3LCJleHAiOjE2OTIyNTgxMDd9.9Ihj9tEnV1WfGEeXZVjAHKhKgcBr6T2wqUkJLxWY79c" -d "{\"groupId\": 10008561, \"newGroupName\": \"New Group Name\"}"

**kick user**
curl -X DELETE "http://localhost:3001/group/kick" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMjU1NjI3LCJleHAiOjE2OTIyNTkyMjd9.ASj80VLvF1Ifk3BSomzWiMX8IUg6J9Jev0I93Xc5PiQ" -d "{\"groupId\": 10008561, \"userId\": 102034}"
