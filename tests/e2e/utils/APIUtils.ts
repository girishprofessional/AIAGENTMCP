import {APIRequestContext, APIResponse} from '@playwright/test';

export class APIUtils{
    request: APIRequestContext;
  
    constructor(request: APIRequestContext){
        this.request = request;
    }
    async getToken (loginPayload: unknown): Promise<APIResponse> {
        console.log('Login Payload: ', loginPayload);
        const loginResponse = await this.request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload
        });
        console.log('Login Response Status: ', loginResponse.status());
        console.log('Login Response Body: ', await loginResponse.json());
        return loginResponse;
    }

    async createOrder(token: string, orderPayload: unknown): Promise<APIResponse> {
        const createOrderResponse = await this.request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            headers: {
                'Authorization': token
            },
            data: {
                orders: orderPayload
            }
        });

        return createOrderResponse;
    }   
}
module.exports = {APIUtils};