import { Router } from 'express';

interface Controller {
    apiVersion: string;
    path: string;
    router: Router;
}

export default Controller;
