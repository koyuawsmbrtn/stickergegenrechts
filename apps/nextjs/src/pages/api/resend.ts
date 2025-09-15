import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend';

type ResponseData = {
    message: string
}

const resend = new Resend(process.env.RESEND_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const template = {
        subject: 'New contact form submission',
        html: `
            <h1>New contact form submission</h1>
            <p>Someone has submitted the contact form on your website.</p>
            <h2>Details</h2>
            <p>Submitted at: ${new Date().toISOString()}</p>
            <h2>Submission</h2>
            <p>IP: ${req.headers['x-real-ip'] || req.socket.remoteAddress}</p>
            <p>User agent: ${req.headers['user-agent']}</p>
            <h2>Form data</h2>
            <p>Name: ${req.body.name}</p>
            <p>Email: ${req.body.email}</p>
            <p>Message:<br>${req.body.message}</p>
        `,
    };
    await resend.emails.send({
        from: 'stickergegenrechts.de <no-reply@stickergegenrechts.de>',
        to: ['me@koyu.space', 'me@subrapier.space', 'Laura.Werner.2006@web.de'],
        ...template,
    });
    res.status(302).setHeader('Location', '/contact-success').end();
}