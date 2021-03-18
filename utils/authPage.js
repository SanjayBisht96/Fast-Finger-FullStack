import jwt from 'jsonwebtoken';

export default async function authPage(req){
    const cookie = req.cookies;
    if(cookie && cookie.token){
        let match = jwt.verify(cookie.token, process.env.SECRET);
        if(match){
            return true;
        }
    }
    return false;
}