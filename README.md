How to use:

1. Create new repo using this template

    https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template

2. Install dependencies

    ```
    yarn
    ```
3. Rename the project

    - Rename static values:

    ```
    Search/Replace typescript-template
    ```
    - Rename package name:

    ```
    //package.json
    name: "some-project-name"
    ```

4. Done! `yarn test` should pass

5. Find errors in this repository or guide and update it!


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
- [ ] the session must be store in the system
- [x] cashing out transfer the money to the user account.