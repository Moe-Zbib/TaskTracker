**register**
curl -X POST http://localhost:3001/auth/register -H "Content-Type: application/x-www-form-urlencoded" -d "username=newed&email=newed@gmail.com&password=newed"

**login**
curl -X POST http://localhost:3001/auth/login -H "Content-Type: application/x-www-form-urlencoded" -d "email=test@gmail.com&password=tester"

**create group**
curl -X POST "http://localhost:3001/group/create" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyNDc0NDQ3LCJleHAiOjE2OTI0NzgwNDd9.tJgluqVg_xvqCtYuIJfYhe4IHrhIRYmckGlZwiO3qb8" -d "{\"name\": \"My New Group\", \"description\": \"A test group\", \"public\": true}"

**join group**
curl -X POST "http://localhost:3001/group/join" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwNTI2OCwiaWF0IjoxNjkyNDc0NzI0LCJleHAiOjE2OTI0NzgzMjR9.tvASgNLmMD16_pH-8IgJ75Fj9reggmyhlEK46DFrDe0" -d "{\"invCode\": \"VXKjw1ik\"}"

**edit group**
curl -X POST "http://localhost:3001/group/edit" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMjU0NTA3LCJleHAiOjE2OTIyNTgxMDd9.9Ihj9tEnV1WfGEeXZVjAHKhKgcBr6T2wqUkJLxWY79c" -d "{\"groupId\": 10008561, \"newGroupName\": \"New Group Name\"}"

**kick user**
curl -X DELETE "http://localhost:3001/group/kick" -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyMjU1NjI3LCJleHAiOjE2OTIyNTkyMjd9.ASj80VLvF1Ifk3BSomzWiMX8IUg6J9Jev0I93Xc5PiQ" -d "{\"groupId\": 10008561, \"userId\": 102034}"

**create task**
curl -X POST http://localhost:3001/task/create -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDM1MywiaWF0IjoxNjkyNDc0NzY0LCJleHAiOjE2OTI0NzgzNjR9.BN9dg-JXtSFVgLsMbCdwZM0hz4DAZq5s94zF8voBNsc" -d "{\"title\": \"Your Task Title\",\"description\": \"Your Task Description\",\"taskType\": \"Task Type\",\"priority\": \"Priority\",\"assignedToUserId\": 105268,\"tags\": \"Tag1,Tag2\",\"comments\": \"Your Task Comments\",\"startDate\": \"2023-08-16T00:00:00Z\",\"deadline\": \"2023-08-31T00:00:00Z\",\"completionPercentage\": 0,\"groupId\": 10007909,\"dependencyId\": null}"
