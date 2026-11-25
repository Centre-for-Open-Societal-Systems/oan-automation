import { test, expect } from '@playwright/test';
const PlaywrightUtils = require('../utils/PlaywrightUtils');

test("Live stock", async ({ browser }) => {

    const { context, page } = await PlaywrightUtils.launchAndLogin(browser, "admin", "admin");

    await expect(page).toHaveTitle("Openg2p");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByText("Livestock Registry").click(),
    ]);
    // await page.pause();
    await PlaywrightUtils.proceedWithNewRecord(newPage);

    await newPage.waitForLoadState();
    await newPage.locator('h2').first().waitFor({ state: 'visible' });
    const allTexts = await newPage.locator("//h2").allTextContents();

    console.log(allTexts);
    await newPage.locator("//span[normalize-space()='Farmer ID']/parent::label/following-sibling::div/div/input").fill("FR-727021945409");
    await newPage.locator("//span[normalize-space()='Fayda ID (FAN or FIN)']/parent::label/following-sibling::div/div/input").fill("524211418956");

    await newPage.locator("//button[normalize-space()='Next']").click();

    await PlaywrightUtils.fillSurveyPersonnelDetails(newPage, PlaywrightUtils.generateCapitalLetters(8), "+251911223344", PlaywrightUtils.generateCapitalLetters(8), "+251911223355");

    await PlaywrightUtils.fillLocationDetails(newPage, "ET", "ET14", "ET1401", "ET140101", "ET14010101");

    await PlaywrightUtils.fillLivestockDetails(newPage, "CATTLE", "BREED_CATTLE_BORAN", "40", "10/03/2011", "SEX_FEMALE", "HEALTHY", "UP_TO_DATE", "10/03/2016");

    await PlaywrightUtils.fillHealthEventDetails(newPage, "TREATMENT", "10/03/2017", PlaywrightUtils.generateCapitalLetters(8), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6), "HOME");

    await PlaywrightUtils.fillVaccinationDetails(newPage, "10/03/2018", "10/09/2018", PlaywrightUtils.generateRandomNumber(1), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6));

    await PlaywrightUtils.fillVitalEventDetails(newPage, "BIRTH", "10/03/2017", "HOME", PlaywrightUtils.generateCapitalLetters(6), "4", "SEX_MIXED", "BREED_CATTLE_JERSEY_CROSS", PlaywrightUtils.generateRandomNumber(2), PlaywrightUtils.generateCapitalLetters(10), PlaywrightUtils.generateCapitalLetters(10));

    await PlaywrightUtils.fillBreedingDetails(
        newPage,
        "10/03/2017",
        PlaywrightUtils.generateCapitalLetters(10),
        PlaywrightUtils.generateCapitalLetters(10),
        "10/03/2018",
        "10/04/2018",
        "SUCCESSFUL",
        PlaywrightUtils.generateRandomString(10)
    );

    // await page.pause();
    await newPage.waitForTimeout(2000);
    await newPage.getByRole('button', { name: 'Submit', exact: true }).click();
    await newPage.locator("(//button[normalize-space()='Cancel']/following-sibling::button)[2]").click();
    // await newPage.pause();
    expect(newPage.locator("//div/p/preceding-sibling::h2")).toHaveText("Submitted successfully");
    await newPage.locator("//button[normalize-space()='Close']").click();


    // await newPage.waitForLoadState();
    // await newPage.locator("h3[title='Form Submissions']").click();
    // await newPage.locator("//input[@placeholder='Search in Form Submissions']/parent::div/preceding-sibling::div").click();
    // await newPage.locator("//button[text()='Livestock records']").click();
    // await newPage.locator("//input[@placeholder='Search in Form Submissions']").click();
    // await newPage.keyboard.press("Enter");
    // await newPage.locator("span[title='Create New Submission']").click();
    // const livestockOption = newPage.locator(
    //     "//div[normalize-space()='Intake Forms']/following-sibling::div[1]//*[normalize-space()='Livestock intake']"
    // );

    // newPage.locator("//span[normalize-space()='DA name']/parent::label/following-sibling::div/div/input").fill("DA Test");
    // await newPage.locator("//span[normalize-space()='DA mobile number']/parent::label/following-sibling::div/div/input").fill("+251911223344");
    // await newPage.locator("//span[normalize-space()='Supervisor name']/parent::label/following-sibling::div/div/input").fill("S Test");
    // await newPage.locator("//span[normalize-space()='Supervisor mobile number']/parent::label/following-sibling::div/div/input").fill("+251911223355");
    // await newPage.locator("//button[normalize-space()='Next']").click();

    //  await newPage.locator("//span[normalize-space()='Country']/parent::label/following-sibling::div/select").selectOption("ET");
    // await newPage.locator("//span[normalize-space()='Region']/parent::label/following-sibling::div/select").selectOption("ET14");
    // await newPage.locator("//span[normalize-space()='Zone']/parent::label/following-sibling::div/select").selectOption("ET1401");
    // await newPage.locator("//span[normalize-space()='Woreda']/parent::label/following-sibling::div/select").selectOption("ET140101");
    // await newPage.locator("//span[normalize-space()='Kebele']/parent::label/following-sibling::div/select").selectOption("ET14010101");

    //  await newPage.locator("//button[normalize-space()='Add Record']").click();
    // await newPage.locator("//span[normalize-space()='Species']/parent::label/following-sibling::div/select").selectOption("CATTLE");
    // await newPage.locator("//span[normalize-space()='Breed']/parent::label/following-sibling::div/select").selectOption("BREED_CATTLE_BORAN");
    // await newPage.locator("//span[normalize-space()='Ear tag']/parent::label/following-sibling::div/div/input").fill("ET" + PlaywrightUtils.generateRandomNumber(10));
    // await newPage.locator("//span[normalize-space()='Weight (kg)']/parent::label/following-sibling::div/div/input").fill("40");
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Date of birth']/parent::label/following-sibling::div/div/button", "10/03/2011");
    // await newPage.locator("//span[normalize-space()='Sex']/parent::label/following-sibling::div/select").selectOption("SEX_FEMALE");
    // await newPage.locator("//span[normalize-space()='Health status']/parent::label/following-sibling::div/select").selectOption("HEALTHY");
    // await newPage.locator("//span[normalize-space()='Vaccination status']/parent::label/following-sibling::div/select").selectOption("UP_TO_DATE");
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Registration date']/parent::label/following-sibling::div/div/button", "10/03/2016");
    // await newPage.locator("//button[normalize-space()='Save']").click();
    // await newPage.locator("//button[normalize-space()='Next']").click();

    //Health Event Details
    // await newPage.waitForTimeout(2000);

    // await newPage.locator("//button[normalize-space()='Add Record']").click();
    // // await newPage.pause();
    // await newPage.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await newPage.locator("//span[normalize-space()='Event type']/parent::label/following-sibling::div/select").selectOption("TREATMENT");
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Date of onset']/parent::label/following-sibling::div/div/button", "10/03/2017");
    // // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Date of resolution']/parent::label/following-sibling::div/div/button", "15/03/2017");
    // await newPage.locator("//span[normalize-space()='Treatment administered']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(6));
    // await newPage.locator("//span[normalize-space()='Veterinarian / officer']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(6));
    // await newPage.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(6));
    // await newPage.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(6));
    // await newPage.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select").selectOption("HOME");
    // await newPage.locator("//button[normalize-space()='Save']").click();
    // await newPage.locator("//button[normalize-space()='Next']").click();

    //Vaccination Details
    //  await newPage.waitForTimeout(2000);
    // await newPage.locator("//button[normalize-space()='Add Record']").click();
    // await newPage.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await newPage.locator("//span[normalize-space()='Vaccine']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Vaccination date']/parent::label/following-sibling::div/div/button", "10/03/2018");
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Next due date']/parent::label/following-sibling::div/div/button", "10/09/2018");
    // await newPage.locator("//span[normalize-space()='Batch / lot number']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateRandomNumber(1));
    // await newPage.locator("//span[normalize-space()='Administered by']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(8));
    // await newPage.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateRandomNumber(20));
    // await newPage.locator("//button[normalize-space()='Save']").click();
    // await newPage.locator("//button[normalize-space()='Next']").click();
    //  await newPage.waitForTimeout(2000);
    // await newPage.locator("//button[normalize-space()='Add Record']").click();
    // await newPage.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await newPage.locator("//span[normalize-space()='Event type']/parent::label/following-sibling::div/select").selectOption("BIRTH");
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Event date']/parent::label/following-sibling::div/div/button", "10/03/2017");
    // await newPage.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select").selectOption("HOME");
    // await newPage.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(10));
    // await newPage.locator("//span[normalize-space()='Number of offspring']/parent::label/following-sibling::div/div/input").fill("12");
    // await newPage.locator("//span[normalize-space()='Sex of offspring']/parent::label/following-sibling::div/select").selectOption("SEX_MIXED");
    // await newPage.locator("//span[normalize-space()='Breed of Offspring']/parent::label/following-sibling::div/select").selectOption("BREED_CATTLE_JERSEY_CROSS");
    // await newPage.locator("//span[normalize-space()='Birth Weight (kg)']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateRandomNumber(2));
    // await newPage.locator("//span[normalize-space()='Reporting officer']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(10));
    // await newPage.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(10));

    // await newPage.locator("//button[normalize-space()='Save']").click();
    // await newPage.locator("//button[normalize-space()='Next']").click();
    // await newPage.waitForTimeout(2000);
    // await newPage.locator("//button[normalize-space()='Add Record']").click();

    // await newPage.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await newPage.locator("//span[normalize-space()='Breeding type']/parent::label/following-sibling::div/select").selectOption({ index: 1 });

    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Breeding date']/parent::label/following-sibling::div/div/button", "10/03/2017");
    // await newPage.locator("//span[normalize-space()='Sire / semen source']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(10));
    // await newPage.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select").selectOption({ index: 1 });
    // await newPage.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateCapitalLetters(10));
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Expected calving date']/parent::label/following-sibling::div/div/button", "10/03/2018");
    // await newPage.locator(".cursor-pointer input").first().click();
    // await PlaywrightUtils.selectEthiopianDate(newPage, "//span[normalize-space()='Pregnancy confirmation date']/parent::label/following-sibling::div/div/button", "10/04/2018");
    // await newPage.locator("//span[normalize-space()='Outcome']/parent::label/following-sibling::div/select").selectOption("SUCCESSFUL");
    // await newPage.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input").fill(PlaywrightUtils.generateRandomString(10));
    // await newPage.locator("//button[normalize-space()='Save']").click();
    // await newPage.locator("//button[normalize-space()='Next']").click();

    // await page.pause();

    // await page.close();

});