const {test, expect} = require('@playwright/test');
//const { expect } = require('.../playwright.config');


test('Browser Context Error login following the correct login in the same test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.type("rahulshetty");
    await page.locator("[type='password']").type('learning');
    await signIn.click();
    console.log (await page.locator("[style*=block]").textContent());
    await expect(page.locator("[style*=block]")).toContainText('Incorrect');

    await userName.type("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    //To access the fist element it can work eith those two lines of code
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});

test.only('Check if the page finds all the products', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.type("rahulshetty");
    await page.locator("[type='password']").type('learning');
    await signIn.click();
    console.log (await page.locator("[style*=block]").textContent());
    await expect(page.locator("[style*=block]")).toContainText('Incorrect');

    await userName.type("");
    await userName.fill("rahulshettyacademy");

//race condition
    await Promise.all(
        [
            await page.waitForNavigation(),
                await signIn.click(),
        ]
    );


    //To access the fist element it can work eith those two lines of code
//    console.log(await page.locator(".card-body a").first().textContent());
//    console.log(await page.locator(".card-body a").nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({page}) =>
{
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});