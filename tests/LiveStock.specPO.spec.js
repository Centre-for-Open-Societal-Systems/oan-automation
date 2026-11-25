import { test, expect } from '@playwright/test';
const PlaywrightUtils = require('../utils/PlaywrightUtils');
const StaffPortalLogin = require('../pageobjects/StaffPortalLogin');
const OpenG2P = require('../pageobjects/OpenG2P');
const LivestockRegistry = require('../pageobjects/LivestockRegistry');



test.only("Live stock", async ({ context, page }) => {
    let livestockRegistry = new LivestockRegistry(page);

    const staffportalLogin = new StaffPortalLogin(context, page);
    staffportalLogin.goTo();
    staffportalLogin.validLogin("admin", "admin");


    const newPage = await livestockRegistry.openLivestockRegistry();

    livestockRegistry = new LivestockRegistry(newPage);

    await PlaywrightUtils.proceedWithNewRecord(newPage);
    await livestockRegistry.verifyAllSection();
    await livestockRegistry.fillFarmerLookupDetails("FR-727021945409", "524211418956");
    await livestockRegistry.clickNext();
    await livestockRegistry.fillSurveyPersonnelDetail(PlaywrightUtils.generateCapitalLetters(8), "+251911223344", PlaywrightUtils.generateCapitalLetters(8), "+251911223355");
    await livestockRegistry.clickNext();
    await livestockRegistry.fillLocationDetail("ET", "ET14", "ET1401", "ET140101", "ET14010101");
    await livestockRegistry.clickNext();

    //Livestock Details fillup
    const earTag = "ET" + PlaywrightUtils.generateRandomNumber(10);
    await livestockRegistry.clickOnAddReocrd();
    await livestockRegistry.addLivestockDetails("CATTLE", "BREED_CATTLE_BORAN", earTag, "70", "10/03/2011", "SEX_FEMALE", "HEALTHY", "UP_TO_DATE", "10/03/2016");
    await livestockRegistry.clickOnSave();
    await livestockRegistry.clickNext();
  

    //Health Event Details
    await newPage.waitForTimeout(2000);
    await livestockRegistry.clickOnAddReocrd();
    await livestockRegistry.addHealthEventDetail("TREATMENT", "10/03/2017", PlaywrightUtils.generateCapitalLetters(8), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6), "HOME");
    await livestockRegistry.clickOnSave();
    await livestockRegistry.clickNext();
    


    // Vaccination Details
    await newPage.waitForTimeout(2000);
    await livestockRegistry.clickOnAddReocrd();
    await livestockRegistry.addVaccinationDetails("10/03/2018", "10/09/2018", PlaywrightUtils.generateRandomNumber(1), PlaywrightUtils.generateCapitalLetters(6), PlaywrightUtils.generateCapitalLetters(6));
    await livestockRegistry.clickOnSave();
    await livestockRegistry.clickNext();

   
    await newPage.waitForTimeout(2000);
    await livestockRegistry.clickOnAddReocrd();
    await livestockRegistry.addVitalEventDetails("BIRTH", "10/03/2017", "HOME", PlaywrightUtils.generateCapitalLetters(6), "4", "SEX_MIXED", "BREED_CATTLE_JERSEY_CROSS", PlaywrightUtils.generateRandomNumber(2), PlaywrightUtils.generateCapitalLetters(10), PlaywrightUtils.generateCapitalLetters(10));
    await livestockRegistry.clickOnSave();
    await livestockRegistry.clickNext();
    

    await newPage.waitForTimeout(2000);
    await livestockRegistry.clickOnAddReocrd();
    await livestockRegistry.addBreedingDetails( "10/03/2017", PlaywrightUtils.generateCapitalLetters(10), PlaywrightUtils.generateCapitalLetters(10), "10/03/2018", "10/04/2018", "SUCCESSFUL", PlaywrightUtils.generateRandomString(10));
    await livestockRegistry.clickOnSave();
    await livestockRegistry.clickNext();

    await newPage.waitForTimeout(2000);
    await newPage.getByRole('button', { name: 'Submit', exact: true }).click();
    await newPage.locator("(//button[normalize-space()='Cancel']/following-sibling::button)[2]").click();
    await expect(newPage.locator("//div/p/preceding-sibling::h2")).toHaveText("Submitted successfully");
    await newPage.locator("//button[normalize-space()='Close']").click();

    await livestockRegistry.approveRecord("FR-727021945409");
    await expect(newPage.locator("[title='Approval Status'] + span span")).toHaveText("Approved");


});