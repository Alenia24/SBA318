# Travel Agency API

This is a RESTful API for managing a travel agency system. You can **add**, **edit**, and **delete**:

- Trips
- Itenaries
- Reviews
- Paassengers( Only accessable by admins which has not been implemented as yet)

---

## Features

- CRUD operations for Trips, Activities, Reviews, and Passengers
- JSON-based REST API

---

## Tech Stack

- **Backend:** Node.js / Express 
---

## Getting Started

### Prerequisites

- Node.js
- Postman or similar API testing tool

### Installation

```bash
git clone https://github.com/Alenia24/SBA318.git
npm install
```

### Running the Server
``` bash
npm start
```

### API Endpoints
# Trips
| Method        | Endpoint       |    Description             |
| ------------- |:--------------:| --------------------------:|
| GET           | /api/trips     | 	  Get all trips           |
| POST          | /api/trips     |  	Create a new trip       |
| GET           | /api/trips/:id | 	  Get a single trip by id |
| PUT           | /api/trips/:id |    Update a trip           |
| DELETE        | /api/trips/:id |    Delete a trip           |

# Itenaries
| Method        | Endpoint           | Description                |
| ------------- |:------------------:| --------------------------:|
| GET           | /api/itenaries     | Get all itenaries          |
| POST          | /api/trips         | Create a new itenary       |
| GET           | /api/itenaries/:id | Get a single itenary by id |
| PUT           | /api/itenaries/:id | Update an itenary by id    |
| DELETE        | /api/itenaries/:id | Delete an itenary by id    |

# Reviews
| Method        | Endpoint           |    Description                |
| ------------- |:------------------:| -----------------------------:|
| GET           | /api/reviews       | 	  Get all review             |
| POST          | /api/reviews       |  	Create a new review        |
| GET           | /api/reviews/:id   | 	  Get a single review by id  |
| PUT           | /api/reviews/:id   |    Update a review by id      |
| DELETE        | /api/reviews/:id   |    Delete a review by id      |

# Passengers
| Method        | Endpoint              |    Description                   |
| ------------- |:---------------------:| --------------------------------:|
| GET           | /api/passengers       | 	Get all passengers             |
| POST          | /api/passengers       |  	Create a new passenger         |
| GET           | /api/passengers/:id   | 	Get a single passenger by id   |
| PUT           | /api/passengers/:id   |    Update a review by id         |
| DELETE        | /api/passengers/:id   |    Delete a review by id         |




