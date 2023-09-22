# Restful communication
 Instead of javascript fetch api, we use axios extending the custom configuration. Look for [axios cofiguration](https://axios-http.com/docs/instance)


## Authentication and Authorization
The desired and required authentication machanism must strictly abide to auth0. We are using casdoor in the project to handle our authentication. The typical journey for th user is defined as below.

sequenceDiagram
    participant User
    participant Casdoor
    participant Express App
    participant React App
    participant Casbin

    User ->>  React App: Requests Casdoor Authorization
    Casdoor ->> User: Presents Login Page
    User ->> Casdoor: Provides Credentials
    Casdoor ->> User: Authenticates User
    Casdoor ->> Redirects with code to Express App 
    Casdoor ->> Express App: Provides Authorization Code
    Express App ->> User: Redirects to Login Page (if needed)
    User ->> Express App: Logs in (if not already)
    Express App ->> Casdoor: Exchanges Authorization Code for Token
    Casdoor ->> Express App: Provides Access Token
    Express App ->> Casbin: Performs Authorization Check
    Casbin ->> Express App: Authorization Decision
    Express App ->> User: Provides Access to Protected Resources



## Request And Response cycle

The poject is always expected to communicate with only a single external server, In this case `milana-sever` appliction. Further integations of business of thrid party tools for analytics should be handled on the same appplication.

Any integrations on the frontend applicaton s stricly not advisible. 

sequenceDiagram
    participant User
    participant Client (Frontend)
    participant Server
    participant Auth Server

    User ->> Client: Sends a Request
    Client ->> Server: Initiates an Axios Request (with Axios Config)
    Server ->> Auth Server: Checks Authentication (access token)
    Auth Server -->> Server: Sends Authentication Response
    Server ->> Client: Returns Data or Forbidden Response
    Client ->> User: Displays Data or Forbidden Message

    Note over Server, Auth Server: Refresh Token Mechanism

    Client ->> Server: Retries Request (with new access token)
    Server ->> Auth Server: Validates New Access Token
    Auth Server -->> Server: Sends Authentication Response
    Server ->> Client: Returns Data or Forbidden Response
    Client ->> User: Displays Data or Forbidden Message

