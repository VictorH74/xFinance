import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { Request, Response } from 'express';

export const expressJsonRouteAdapter =
    (controller: BaseController) => async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
        };

        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };