import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    let token = req.header("Authorization");
    if(!token) return res.status(400).send({message: "Authorization denied: No token"});

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MGM0MzFmMzAxNjVhZjViYWU5YTEiLCJuYW1lIjoiUGVwaXRhIFBlcmxhMyIsInJvbGVJZCI6IjYxOTNkYzJmYWE2OGRmNDhiNjFhYzhiNSIsImlhdCI6MTYzNzA5MjQxOX0.Hz_zbwIRJm_mssEe9nfUwghnn8lFtVF6ovl3T-uCQVA


    token = token.split(" ")[1];
    if(!token) return res.status(400).send({message: "Authorization denied: No token"});

    try {
        req.user = jwt.verify(token, process.env.SK_JWT);
        next();
    } catch (e) {
        return res.status(400).send({message: "Authorization denied: Invalid token"})
    }
};

export default auth;