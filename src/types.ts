import {CookieSerializeOptions} from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export type CookieArgs = {
    name: string
    value: any
    options?: CookieSerializeOptions
}

export type NextApiResponseWithCookie = NextApiResponse & {
    cookie: (args: CookieArgs) => void
}

export type NextApiHandlerWithCookie = (
    req: NextApiRequest,
    res: NextApiResponseWithCookie
) => unknown | Promise<unknown>

export type CookiesMiddleware = (
    handler: NextApiHandlerWithCookie
) => (req: NextApiRequest, res: NextApiResponseWithCookie) => void


export type NextApiRequestWithUserId = NextApiRequest & {
    user_id: string
}

export type NextApiHandlerWithUserId = (
    req: NextApiRequestWithUserId,
    res: NextApiResponse
) => unknown | Promise<unknown>

export type AuthGuardMiddleware = (
    handler: NextApiHandlerWithUserId
) => (req: NextApiRequestWithUserId, res: NextApiResponse) => void

export type Note = {
    id: number,
    title: string,
    desc: string,
    author_id: number,
    is_archived: boolean,
    time_created: Date,
}

export type Reminder = {
    id: number,
    title: string,
    desc: string,
    author_id: number,
    is_archived: boolean,
    time_created: Date,
    time_remind: Date
}