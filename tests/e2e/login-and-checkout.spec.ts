import { test, expect } from '@playwright/test';

test.describe('Login and Checkout Flow', () => {
  test('should log in, add iPhone X to cart, and verify checkout', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // Verify page loaded
    await expect(page).toHaveTitle(/LoginPage|Practise/);
    
    // Fill login credentials
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    
    // Select checkbox for "User agrees to our terms"
    await page.locator('#terms').check();
    
    // Click sign in button
    await page.locator('#signInBtn').click();
    
    // Wait for products to load
    await page.waitForSelector('.card-title', { timeout: 20000 });
    
    // Wait a moment for the page to fully render
    await page.waitForTimeout(2000);
    
    // Find and click the iPhone X add to cart button
    const cards = await page.locator('.card');
    const cardCount = await cards.count();
    console.log(`Found ${cardCount} product cards`);
    
    let iphoneXFound = false;
    
    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      const title = await card.locator('.card-title').textContent();
      const cleanTitle = title?.trim().toLowerCase() || '';
      console.log(`Card ${i}: ${cleanTitle}`);
      
      if (cleanTitle.includes('iphone x')) {
        iphoneXFound = true;
        console.log('Found iPhone X, adding to cart');
        // Click the "Add" button for iPhone X
        await card.locator('button').click();
        break;
      }
    }
    
    expect(iphoneXFound).toBeTruthy();
    
    // Click on the Checkout button (cart icon or checkout button)
    // First, navigate to cart page
    await page.locator('a.nav-link.btn.btn-primary').click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Click the "Checkout" button on the cart page
    const checkoutButton = page.locator('button.btn-success:has-text("Checkout")');
    await checkoutButton.click();
    console.log('Clicked Checkout button');
    
    // Wait for checkout form to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Select delivery location - look for the select dropdown or other location selector
    await page.locator('#country').pressSequentially('Ind');
    await page.locator('.suggestions a').first().highlight();
    await page.locator('.suggestions a').first().click();
    await page.locator('#checkbox2').waitFor({ state: 'visible' })
    await page.locator("label[for='checkbox2']").check();

    // Verify Success message after placing the order

    await page.locator("//input[@value='Purchase']").click();
    await page.waitForSelector('.alert-success');
    const successMessage = await page.locator('.alert-success').textContent();
    console.log(`Success message: ${successMessage}`);
    expect(successMessage).toContain('Success');

  });
});

test('Special Playwright Locators', async({page})=>{
    test.setTimeout(60000);
    await page.goto('https://www.rahulshettyacademy.com/angularpractice');
    await page.getByPlaceholder('Password').waitFor({state:'visible'});
    await page.getByPlaceholder('Password').fill('Learning@830$3mK2');
    await expect(page.getByPlaceholder('Password')).toHaveValue('Learning@830$3mK2');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await expect(page.getByLabel('Check me out if you Love IceCreams!')).toBeChecked();
    await page.locator('#exampleFormControlSelect1').selectOption('Female');
    await expect(page.locator('#exampleFormControlSelect1')).toHaveValue('Female');
    await page.getByLabel('Student').check();
    await expect(page.getByLabel('Student')).toBeChecked();
    await page.locator('input[name="bday"]').fill('2024-06-10');
    await page.getAttribute('input[name="bday"]','value').then((value)=>{
        console.log(value);
    })
    await page.getByRole('button',{name:'Submit'}).click();
    await page.locator('.alert-success').waitFor({state:'visible'});
    await expect(page.locator('.alert-success')).toContainText('Success'); 
    await page.getByRole('link',({name:'Shop'})).click();
    await page.locator('app-card').filter({hasText:'Samsung Note 8'}).getByRole('button',{name:'Add '}).click();
    await page.locator(".nav-link.btn.btn-primary").waitFor();
    await page.locator(".nav-link.btn.btn-primary").textContent().then((value)=>{
        console.log(value);
    })  
    await page.pause();
 
})