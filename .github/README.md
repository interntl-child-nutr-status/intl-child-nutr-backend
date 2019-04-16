# International Child Nutrution Stats

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A project to aid NGOs as they fight child malnutrition internationally

## Table of Contents

- [Background](#background)
- [API](#api)
- [Maintainer](#maintainer)
- [License](#license)


## API

### Authorization

#### `POST /api/auth/login`

Allows a user to login.

Takes an object containing valid `username` and `password` properties, and returns a JSON Web Token to the client. This token must be included in the `authorization` request header to access any other routes.

#### `POST /api/auth/register`

Allows an Admin user to create new users, will return 401 to clients attempting to access the resource with no credentials and 403 to clients attempting to access the resource with insufficient credentials.

Takes an object containing:

1. A unique `username` (**String**)
2. A `password` (**String**)
3. A `role_id` (**Integer**) [Admin=1, User=2]
4. A `country_id` (**Integer**) [Default=Null, Integer corresponds to the specific country a user should have access to]

If a `country_id` is not specified, will default to `null`.

### Countries

#### `GET /api/countries`

Returns a array of objects listing all known countries to an authenticated client.

```json
[
  {
      "Code": "AF",
      "Country": "Afghanistan"
  },
  {
      "Code": "AX",
      "Country": "Åland Islands"
  },
  {
      "Code": "AL",
      "Country": "Albania"
  },
  {
      "Code": "DZ",
      "Country": "Algeria"
  },
]
```

#### `GET /api/countries/active`

Returns a list of active countries, defined as a country that has at least one community in our database.

If user is not an Admin, it will return only the country specified in the token provided by the client.

```json
[
    {
        "Communities": "5",
        "Country": "United States"
    }
]
```

## Maintainer

[@nickcannariato](https://github.com/nickcannariato)

## License

MIT © 2019 Nick Cannariato
