# ROCK-PAPER-SCISSORS Lottoland Frontend

This repository contains the react natve expo for the ROCK-PAPER-SCISSORS game according the requirements of the [BE_Java_Challenge_.docx](docs/BE_Java_Challenge_.docx)

## Assumptions

- Security is not relevant. No https, CORS, authentication...
- The identifier for the user will be the header `x-device-id`. This header is randomly generated in the frontend and stored in local memory. Anyone can modify this value and access to other player scores. If you delete your browser data, you lose the user.
- I memory database. Not distributed scores. Not durable scores.

## Index

- [How to run](docs/howtorun/README.md)
- [The rps lottoland backend](https://github.com/DavidNS/rps-lottoland-backend)