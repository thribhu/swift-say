# Implementing Casbin Authorization in Node.js Express

## Introduction

- The project is cloned from [casbin-react-express](https://github.com/casdoor/casdoor-nodejs-react-example)
- For seamless development expeirence, [lerna](https://lerna.js.org/docs/getting-started) is initilized to adapt mono repo approach
- There are 2 packages in the monorepo
  1. milana-server
  2. milana-web-client

## Prerequisites

> For simplicity, the documentation uses `milana` as the name of origanisation and application

1. Should have a casdoor application setup on the [casdoor](https://casdoor.org/)
2. Create an organisation in casdoor,
3. Create application associating with the organisation created above

## Installation

- Clone the repo
- Install docker on your machine
- Run docker-compose build
- After build is succesful, run `docker-compose up` 
## Development
- In the root folder, use `yarn` to install the dependencies
- Later run the script `yarn serve-local` which will start both server and react application on a sigle go

## Scripts

This section of scripts only cover the global scripts which run parllel across the packages.
1. `yarn lint` run eslint linter to lint the code and help with any errors
2. `yarn format` run prettier to format the code for consistency

## Casdoor SDK

- Below are a few important pacakges required for the authentication and authorisation

1. casdoor-js-sdk
2. casdoor-nodejd-sdk
3. casbin

## Configuration

In the package milana-server, A folder `Casbin` is being used to define the models, policies of the casbin.
The below is a base model file required by the casbin

```conf
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act

```

The below is a policy file defined inside policy.csv

```csv
p, supervisor, /api/getSalesOpportunities, GET
```

- In the `Casbin/index.js` require the casbin module and initialize the Casbin enforcer with your model and adapter.

## Define Access Control Rules

- For brewity, 2 roles are created in the casdoor application.

1. Supervisor
2. Employee

- To add policy with rbac, we must use the role and create policy.
  > Note: Two users are added to check the authorization with above roles in the casdoor application

| Email       | Password | Role       |
| ----------- | -------- | ---------- |
| bb@bb.com   | test123  | supervisor |
| aa@aaa4.com | test123  | employee   |

## Middleware Integration

- onlyAuthenticated
  > This will only lets the authenticated user to procedd on to futher requests
- onlySupervisor
  > This will enforce is some user is having `supervisor` role on their assigned roles

## Role and Policy Management

- A role can be added directly in the casdoor client or by using the casdoor api
- Any number of policies can be added in the policy.csv file

## Example Usage

Below a new policy is added on the route `api/updateAttendence`

```csv
p, supervisor, /api/updateAttendence, POST
```

Later a middleware or an express route function can be used to enfore the above policy

```js
module.exports = async (req, res, next) => {
  let user = req.user; // The middleware onlyAuthenticated will set the user object in the request local
  const roles = user.roles; //list of the roles associated to user
  const path = req.path;
  const method = req.method;
  // assuming the first element of roles list is supervisor
  const hasPermission = await enforcer.enforce(roles[0].name, path, method);
  // you can continue with code from here
};
```

## Best Practices

- Bearer authentication is implemented for the project
- Must chage the expiration time as requird in the prodution environment

## Conclusion

- The documentation helps in setting up casdoor authentication on the frontend and casbin authorization on the backend

## Additional Resources

- Casdoor implementation [tutorial](https://casdoor.org/docs/basic/tutorials)

## License

This project is licensed under the [CC0 1.0 Universal License](./CC0_LICENSE.txt) - see the [LICENSE.txt](./CC0_LICENSE.txt) file for details.
