import fetch from 'isomorphic-unfetch';
import { Router } from 'next/router';
import absoluteUrl from 'next-absolute-url'

export default async function authPage(url,ctx){
    const cookie = ctx.req?.headers.cookie;
    const { protocol, host } = absoluteUrl(ctx.req, 'localhost:3000');
    const resp = await fetch(url,{
        headers: {
            cookie :cookie
        }
    });

    if(resp.status === 401 && !ctx.req){
        Router.replace(`${protocol}//${host}/login`);
        return {};
    }
    if(resp.status === 401 && ctx.req){
        ctx.res?.writeHead(302,{
            Location: `${protocol}//${host}/login`
        });
        ctx.res?.end();
        return;
    }
}