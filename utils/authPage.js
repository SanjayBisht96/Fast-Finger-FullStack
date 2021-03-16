import fetch from 'isomorphic-unfetch';
import { Router } from 'next/router';
import absoluteUrl from 'next-absolute-url'

export default async function authPage(url,ctx){
    const cookie = ctx.req?.headers.cookie;
    const { origin } = absoluteUrl(ctx.req);
    const resp = await fetch(url,{
        headers: {
            cookie :cookie
        }
    });

    if(resp.status === 401 && !ctx.req){
        Router.replace(`${origin}/login`);
        return {};
    }
    if(resp.status === 401 && ctx.req){
        ctx.res?.writeHead(302,{
            Location: `${origin}/login`
        });
        ctx.res?.end();
        return;
    }
}