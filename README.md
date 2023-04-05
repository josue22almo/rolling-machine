# Description

- Architecture: it could be a simple MVC or an hexagonal architecture approach. For this simple exercise I prefer MVC.

- The domain of the application would be coded following TDD. The main test scenarios has been described by you in the exercise assessment. Possible names for the models could be session and account.

- We would need 5 controllers that map to the following use cases:
  - Get session.
  - Create session. Here we must remember the domain clause about creating a session with 10 credits.
  - Roll session. The domain logic would be implemented following TDD.
  - Cash out session
  - Get account.

- To store the state of the session and the account we need a repository. We would define an interface for each repository with the needed methods (find, create, update...). But for simplicity, we will only have one implementation, in memory. That means that when restarting the backend we will lose our state. We can consider about implementing a filesystem repository.

- Each use case should be mapped into a endpoint, like follows:
  - Get session: GET /session
  - Create session: POST /session
  - Roll session: POST /session/:id/roll
  - Cash out: PUT /session/:I'd
  - Get account: GET /account

That's only the backend side.

The frontend it's a simple page implementing the desire solution.

There is one point missing: cash out button. The backend is ready but the button is not in the frontend.

# TDD

- [x] on roll cost 1 credit
- [ ] A roll consist of 3 blocks:
  - [x] chery (10 credits rewards)
  - [x] lemon (20 credits rewards) 
  - [x] orange (30 credits rewards) 
  - [x] watermelon (40 credits rewards)
- [x] not successful roll (no reward)
- [x] a session must be created with 10 starting credits
- [x] a session must be initiated with some credits
- [x] When a user has less than 40 credits in the game session, their rolls are truly
  random.
- [x] When a user has between 40 and 60 credits and a has a winning roll, the session must re-roll it with a 30% probability.
- [x] When a user has above 60 credits and a has a winning roll, the session must re-roll it with a 60% probability.
- [x] the session must be store in the system
- [x] cashing out transfer the money to the user account.