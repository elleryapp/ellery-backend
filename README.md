# Ellery (Backend)
> Your student university portal, made richer and smarter

Ellery is a full-stack web platform that allows university students to explore their student portal with a richer and more intuitive platform. In a way, Ellery becomes your personal college path assistant. It is composed of a decoupled backend JSON API and a front-end web application.

In our case, we created a demonstration of Ellery interfacing with our university's MyFIU student portal, but our platform can interface with any university platform in practice. It works by scraping a student's dataset from their portal upon giving us their student portal credentials.

## Statistical Analysis
Our backend utilizes data gathered from transcripts and online grade distributions present on your student portal. Using this, we determine how well you will do in specific courses and on your major as a whole. Currently, our statistical inference only works for Computer Science majors (because of time constraints, but the applications are endless).

Under the hood, our backend passes a JSON file of the student's academic data to the analysis engine that does our predictions. A sample of the passed data looks like this:
```javascript
{
    "semesters": [{
        "semester": "fall",
        "year": "2012",
        "termGpa": "4.0",
        "cumulativeGpa": "3.5",
        "courses": [{
            "id": "CHM 1045", 
            "credits": "3.0",
            "creditsEarned": "9.0",
        }, {
            "id": "COP2210",
            "credits": "3.0",
            "creditsEarned": "12.0"
        }]
    }]
}
```

The analysis engine returns this, which the backend API shuttles forward to the front-end:
```javascript
{
    "expectedGpa": "3.0", 
    "recommendedCourses": ["CHM 1045"]
}
```

## API Endpoints
All API endpoints have the prefix `api/<elleryVersion>`. All the API endpoints return an output that has the form:

```javascript
{
    "status": "<int: httpStatusCode>",
    "message" "<string: additional request/response information">,
    "data": "<?: whatever the API endpoint should return>"
}
```

1. `/login`
    * Given FIU credentials, return a JWT Token with the user's type (permissions), university email address, system supplied unique identifier and name.
        * **POST**
        * Accepts {username, password}
        * Returns {jwtToken}
2. `/student`
    * All these API endpoints require either an: 
        * `Authorization: Bearer <jwtToken>` provided as the Authorization header **OR** 
        * `token=<jwtToken>` as part of the request parameters
    * **GET** `/courses/present`
        * Returns a list of all courses that a student is currently taking
        * Returns [{courseType, courseId, sectionNumber, instructor, schedule:[{days, time}], location}]
    * **GET** `/courses/all`
        * Returns a list of all courses that a student has taken up to now
        * Returns [{courseType, courseId, sectionNumber, instructor, schedule:[{days, time}], location}]
    * **GET** `/prediction`
        * Returns a personalized prediction set of your academic path, using our analysis engine
        * Returns {expectedGpa, recommendedCourses:[]}
    