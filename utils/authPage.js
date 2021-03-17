import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';
import jwt from 'jsonwebtoken';

export default async function authPage(ctx){
    const cookie = ctx.req?.headers.cookie;
    const { origin } = absoluteUrl(ctx.req);
    if(cookie && cookie.token){
        let match = jwt.verify(cookie.token, process.env.SECRET);
        if(match){
            return {}
        }
    }
    if(!ctx.req){
        Router.replace(`${origin}/login`);
        return {};
    }
    if(ctx.req){
        ctx.res?.setHeader({
            Location: `${origin}/login`
        });
        return {};
    }
}