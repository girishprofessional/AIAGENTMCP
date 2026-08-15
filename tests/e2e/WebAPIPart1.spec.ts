import {test, expect} from '@playwright/test';

import {APIUtils} from './utils/APIUtils';

const loginPayload = {
    userEmail: 'girish.software.test.eng@gmail.com',
    userPassword: 'Ques@1241'
};

const createOrderPayload = {
    orders: [{
        country: "India",
        productOrderedId: "6960eac0c941646b7a8b3e68"
    }]
};

let token: string;
test.beforeAll('Before All Tests', async ({request})=>{
    const loginResponse = await new APIUtils(request).getToken(loginPayload);
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token from beforeAll: ', token);
})

test('Web and API Tests Create Order', async ({ page, request}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState('networkidle');
    page.locator('#products .card-body').first().waitFor({state:'visible'});
    const createOrderResponse= await new APIUtils(request).createOrder(token, createOrderPayload);
    await expect(createOrderResponse.status()).toBe(201);
    const createOrderResponseJson = await createOrderResponse.json();
    const orderId = createOrderResponseJson.orders[0];
    console.log("Order ID: "+orderId);
    await page.pause();
    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor({state:'visible'});
    const rows= page.locator('tbody tr');
    const rowCount= await rows.count();
    for(let i=0; i<rowCount; ++i){
        const rowOrderId= await rows.nth(i).locator('th').textContent();
        if(orderId?.includes(rowOrderId ?? '')){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    await page.pause();    

});

test('Web and API Tests', async ({ page }) => {
   console.log('Token from beforeAll: ', token);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState('networkidle');
    page.locator('#products .card-body').first().waitFor({state:'visible'});
    const products= page.locator('#products .card-body');
    const count= await products.count();
    console.log("product Count: " + count);
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator('b').textContent() === 'ZARA COAT 3'){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.waitForLoadState('networkidle');

    await page.locator('div li').first().waitFor({ state: 'visible' });
    await expect(page.locator('.cartSection h3')).toContainText(['ZARA COAT 3']);
    await page.locator('text=Checkout').click();
    // credit card details
    await page.locator("//div[text()='Credit Card Number ']/following-sibling::input").fill('4111 1111 1111 1111');
    await page.locator("//div[text()='Expiry Date ']/following-sibling::select").first().selectOption('12');
    await page.locator("//div[text()='Expiry Date ']/following-sibling::select").last().selectOption('20');
    await page.locator("//div[text()='CVV Code ']/following-sibling::input").fill('123');
    await page.locator("//div[text()='Name on Card ']/following-sibling::input").fill('Girish Kumar');
    await page.locator("//div[text()='Apply Coupon ']/following-sibling::input").fill('rahulshettyacademy');
    await page.locator("//button[text()='Apply Coupon']").click();
    await page.locator("//div[text()='Apply Coupon ']/following-sibling::input").waitFor({state:'visible'});
    await expect(page.locator("//div[text()='Apply Coupon ']/following-sibling::input")).toHaveValue('rahulshettyacademy');
    await expect(page.locator(".details__user div label")).toHaveText('girish.software.test.eng@gmail.com');
     await page.locator('[placeholder*="Country"]').click();
    await page.locator('[placeholder*="Country"]').pressSequentially('ind', {delay:500});
    const dropdown= page.locator('[class*="ta-results"]');
    await dropdown.waitFor();
    const optionsCount= await dropdown.locator('button').count();
    for(let i=0; i<optionsCount; ++i){
        const text= await dropdown.locator('button').nth(i).textContent();
        if(text?.trim() === 'India'){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    await page.locator('.action__submit').  click();      
    await page.locator('div').filter({ hasText: 'ZARA COAT 3' }).first().waitFor({ state: 'visible' });
    await expect(page.locator('.order-summary')).toContainText(['ZARA COAT 3']);
    const orderId= await page.locator('label[class*="ng-star-inserted"]').textContent();  
    console.log(orderId);
    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor({state:'visible'});
    const rows= page.locator('tbody tr');
    const rowCount= await rows.count();
    for(let i=0; i<rowCount; ++i){
        const rowOrderId= await rows.nth(i).locator('th').textContent();
        if(orderId?.includes(rowOrderId ?? '')){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    await page.pause();    

});