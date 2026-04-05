# 1. What is System Design?

- Apart from all the complex definition crap; It's just designing systems just as in the name. A system is a place where interactions between stuff happens. So, Designing a system is just, making an environment where things interact in the best way possible.
- Programming is a nice example of a system:
    - **Database**: Stores all data, sorts it, and makes it easy to access.
    - **Backend**: Handles all heavy logic, serves data from the database to the user.
    - **Functions**: Break the large task into smaller tasks, especially helping to reuse it on multiple places.
    - **Classes**: Used to sort similar functions together, and create "objects" in memory with unique traits.
    - **Frontend**: Uses the backend and APIs, to show information in an appealing way to the user.
    - **API**: A simple way to access functionality from a backend whether designed by you or someone else.

## 1.1 Steps for System Design

- Get an idea for a system. It can be on anything you hate. For example, companies stealing and selling your data, so you make your own app which does the same but privately. Don't go into forking programs as a beginner.
- Get a pen, paper, and a screen in front of you. Now, do research on what you want to do, and how are you going to implement it.
- Draw as many drafts of a system. Not doing this step, is the **biggest mistake**, and to refactor the code, will be necessary and impossible at the same time. Changing a function breaks another and you are stuck in a hell of code.
- Start coding and make it good, readable, extensible. No need for optimisation at first when you are starting from scratch. The thing is you can *edit a function and optimise it, but making a new function that does completely different thing is not possible unless you dedicate a ton of resources*.
