# projectchip
(temp project name) Golf score tracker.

## Notes
backend Go
frontend React

one Go binary

frontend -> build step to generate static files ( minified and stuff )
move those files to some folder say /frontend/dist
build go backend embeding the frontend
one binary to run our server

Work downwards
/graphql
/playground
/logout
/callback
/\* -> responds with the frontend

/graphql -> we do graphql
/index or anything not the other 4
we respond with our frontend client, that has its own routing

we can build and run, one binary for both
scaling up is ok ( it would be nice sometimes to scale up just the backend rather then both )
but in reality, processing the /\* http request is really easy and fast

because it is fairly basic deployment process, we can easily run it locally
through docker we can use docker compose to run our webservice and postgres together
( we can also use other tools but these work fine )
