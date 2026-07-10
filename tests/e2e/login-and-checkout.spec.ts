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
    
    // Wait for either the dashboard or products to load
    // The page may navigate or stay on the same URL but load content
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
    
    // Wait for cart to update
    await page.waitForTimeout(1000);
    
    // Click on the checkout button (cart icon or checkout link)
    await page.locator('a.nav-link.btn.btn-primary').click();
    
    
    // Verify iPhone X is in the cart
    const cartItems = await page.locator('h4');
    let productFound = false;
    
    for (let i = 0; i < await cartItems.count(); i++) {
      const text = await cartItems.nth(i).textContent();
      const cleanText = text?.trim().toLowerCase() || '';
      if (cleanText.includes('iphone x')) {
        productFound = true;
        console.log('iPhone X found in cart');
        break;
      }
    }
    
    expect(productFound).toBeTruthy();
    
    // Click Checkout button
    await page.locator('button.btn-success').click();
    
    // Wait for checkout completion
    await page.waitForTimeout(2000);
    
    // Check for success message
    const bodyText = await page.locator('strong:has-text("Success!")').textContent();
    console.log('Page text after checkout:', bodyText);
    expect(bodyText).toBe('Success!');
  });
});
