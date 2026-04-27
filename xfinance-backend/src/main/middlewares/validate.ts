import { HttpResponseError } from '@/infra/http/interfaces/HttpResponseError';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodObject, ZodRawShape } from 'zod';

export const validate =
    (schema: ZodObject<ZodRawShape>, errorCode: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.headers)
        
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers,
            });
            return next();
        } catch (error) {
            let error_description = '';
            if (error instanceof ZodError) {
                error_description = error.issues
                    .map((i) => i.message)
                    .join(' | ');
            } else if (error instanceof Error) {
                error_description = error.message;
            }

            const resObj: HttpResponseError = {
                error_code: errorCode,
                error_description,
            };

            return res.status(400).json(resObj);
        }
    };
