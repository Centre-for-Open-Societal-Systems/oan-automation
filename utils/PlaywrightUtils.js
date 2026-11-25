
const { randomInt } = require('crypto');

class PlaywrightUtils {


     // Generate random alphanumeric sequence
    static generateRandomString(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(randomInt(characters.length));
        }

        return result;
    }

    // Generate random numeric sequence
    static generateRandomNumber(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        let result = '';

        for (let i = 0; i < length; i++) {
            result += randomInt(0, 10).toString();
        }

        return result;
    }

    // Generate random capital letters
    static generateCapitalLetters(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(randomInt(characters.length));
        }

        return result;
    }


    static async selectEthiopianDate(page, dateInputLocator, date) {

        // Expected format: dd/mm/yyyy
        const [day, month, year] = date.split('/').map(Number);

        if (
            !Number.isInteger(day) ||
            !Number.isInteger(month) ||
            !Number.isInteger(year) ||
            day < 1 || day > 30 ||
            month < 1 || month > 13
        ) {
            throw new Error('Invalid Ethiopian date. Use dd/mm/yyyy');
        }

        // Open date picker
        await page.locator(dateInputLocator).click();

        const calendar = page.getByRole('dialog', { name: 'Calendar' });

        await calendar.waitFor({ state: 'visible', timeout: 10000 });

        // Select Ethiopian month
        await calendar.locator('select[aria-label="Month"]')
            .selectOption(String(month));

        // Select Ethiopian year
        await calendar.locator('select[aria-label="Year"]')
            .selectOption(String(year));

        // Select the required day
        const dayButton = calendar.locator('button:not([disabled])')
            .filter({ hasText: new RegExp(`^${day}$`) });

        await dayButton.waitFor({ state: 'visible', timeout: 10000 });
        await dayButton.click();
    }


    static async selectEthiopianDate1(dateInputLocator, date) {

        // Expected format: dd/mm/yyyy
        const [day, month, year] = date.split('/').map(Number);

        if (
            !Number.isInteger(day) ||
            !Number.isInteger(month) ||
            !Number.isInteger(year) ||
            day < 1 || day > 30 ||
            month < 1 || month > 13
        ) {
            throw new Error('Invalid Ethiopian date. Use dd/mm/yyyy');
        }

        // Open date picker
        await dateInputLocator.click();

        const calendar = dateInputLocator.page().getByRole('dialog', {
            name: 'Calendar'
        });

        await calendar.waitFor({ state: 'visible', timeout: 10000 });

        // Select Ethiopian month
        await calendar.locator('select[aria-label="Month"]')
            .selectOption(String(month));

        // Select Ethiopian year
        await calendar.locator('select[aria-label="Year"]')
            .selectOption(String(year));

        // Select required day
        const dayButton = calendar.locator('button:not([disabled])')
            .filter({ hasText: new RegExp(`^${day}$`) });

        await dayButton.waitFor({ state: 'visible', timeout: 10000 });
        await dayButton.click();
    }






    static async launchAndLogin(browser, username, password) {

        const context = await browser.newContext();
        const page = await context.newPage();

        // const page = await launchBrowser();

        await page.goto("https://staff-portal.qa.oanstaging.com/en");

        await page.locator("#username").fill(username);
        await page.locator("#password").fill(password);

        await page.locator("[class='login-btn']").click();

        return { context, page };
    }


    static async fillSurveyPersonnelDetails(page, daName, daMobile, supervisorName, supervisorMobile) {

        await page.locator("//span[normalize-space()='DA name']/parent::label/following-sibling::div/div/input")
            .fill(daName);

        await page.locator("//span[normalize-space()='DA mobile number']/parent::label/following-sibling::div/div/input")
            .fill(daMobile);

        await page.locator("//span[normalize-space()='Supervisor name']/parent::label/following-sibling::div/div/input")
            .fill(supervisorName);

        await page.locator("//span[normalize-space()='Supervisor mobile number']/parent::label/following-sibling::div/div/input")
            .fill(supervisorMobile);

        await page.locator("//button[normalize-space()='Next']").click();
    }


    static async fillLocationDetails(page, country, region, zone, woreda, kebele) {

        await page.locator("//span[normalize-space()='Country']/parent::label/following-sibling::div/select")
            .selectOption(country);

        await page.locator("//span[normalize-space()='Region']/parent::label/following-sibling::div/select")
            .selectOption(region);

        await page.locator("//span[normalize-space()='Zone']/parent::label/following-sibling::div/select")
            .selectOption(zone);

        await page.locator("//span[normalize-space()='Woreda']/parent::label/following-sibling::div/select")
            .selectOption(woreda);

        await page.locator("//span[normalize-space()='Kebele']/parent::label/following-sibling::div/select")
            .selectOption(kebele);

        await page.locator("//button[normalize-space()='Next']").click();
    }




    static async proceedWithNewRecord(page) {

        await page.waitForLoadState();

        // Open Form Submissions
        await page.locator("h3[title='Form Submissions']").click();

        // Open search/filter dropdown
        await page.locator("//input[@placeholder='Search in Form Submissions']/parent::div/preceding-sibling::div").click();

        // Select Livestock records
        await page.locator("//button[text()='Livestock records']").click();

        // Search and proceed
        await page.locator("//input[@placeholder='Search in Form Submissions']").click();
        await page.keyboard.press("Enter");

        // Click Create New Submission
        await page.locator("span[title='Create New Submission']").click();

        // Select Livestock intake under Intake Forms
        const livestockOption = page.locator(
            "//div[normalize-space()='Intake Forms']/following-sibling::div[1]//*[normalize-space()='Livestock intake']"
        );

        await livestockOption.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await livestockOption.click();

        await page.waitForLoadState();

    }


    static async fillLivestockDetails(
        page,
        species,
        breed,
        weight,
        dateOfBirth,
        sex,
        healthStatus,
        vaccinationStatus,
        registrationDate
    ) {

        // Add new livestock record
        await page.locator("//button[normalize-space()='Add Record']").click();

        // Select species and breed
        await page.locator("//span[normalize-space()='Species']/parent::label/following-sibling::div/select")
            .selectOption(species);

        await page.locator("//span[normalize-space()='Breed']/parent::label/following-sibling::div/select")
            .selectOption(breed);

        // Generate unique ear tag
        const earTag = "ET" + this.generateRandomNumber(10);

        await page.locator("//span[normalize-space()='Ear tag']/parent::label/following-sibling::div/div/input")
            .fill(earTag);

        // Enter weight
        await page.locator("//span[normalize-space()='Weight (kg)']/parent::label/following-sibling::div/div/input")
            .fill(String(weight));

        // Select date of birth
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Date of birth']/parent::label/following-sibling::div/div/button",
            dateOfBirth
        );

        // Select sex
        await page.locator("//span[normalize-space()='Sex']/parent::label/following-sibling::div/select")
            .selectOption(sex);

        // Select health status
        await page.locator("//span[normalize-space()='Health status']/parent::label/following-sibling::div/select")
            .selectOption(healthStatus);

        // Select vaccination status
        await page.locator("//span[normalize-space()='Vaccination status']/parent::label/following-sibling::div/select")
            .selectOption(vaccinationStatus);

        // Select registration date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Registration date']/parent::label/following-sibling::div/div/button",
            registrationDate
        );

        // Save livestock record
        await page.locator("//button[normalize-space()='Save']").click();

        // Proceed to next section
        await page.locator("//button[normalize-space()='Next']").click();

        return earTag;
    }


    static async fillHealthEventDetails(
        page,
        eventType,
        dateOfOnset,
        treatment,
        veterinarian,
        locationDetails,
        notes,
        location
    ) {

        await page.waitForTimeout(2000);

        // Add new health event record
        await page.locator("//button[normalize-space()='Add Record']").click();

        // Select livestock ear tag / secondary identifier
        await page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select event type
        await page.locator("//span[normalize-space()='Event type']/parent::label/following-sibling::div/select")
            .selectOption(eventType);

        // Select date of onset
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Date of onset']/parent::label/following-sibling::div/div/button",
            dateOfOnset
        );

        // Enter treatment administered
        await page.locator("//span[normalize-space()='Treatment administered']/parent::label/following-sibling::div/div/input")
            .fill(treatment);

        // Enter veterinarian / officer
        await page.locator("//span[normalize-space()='Veterinarian / officer']/parent::label/following-sibling::div/div/input")
            .fill(veterinarian);

        // Enter location details
        await page.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input")
            .fill(locationDetails);

        // Enter notes
        await page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input")
            .fill(notes);

        // Select location
        await page.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select")
            .selectOption(location);

        // Save health event record
        await page.locator("//button[normalize-space()='Save']").click();

        // Proceed to next section
        await page.locator("//button[normalize-space()='Next']").click();
    }


    static async fillVaccinationDetails(
        page,
        vaccinationDate,
        nextDueDate,
        batchNumber,
        administeredBy,
        notes
    ) {
        await page.waitForTimeout(2000);

        // Add vaccination record
        await page.locator("//button[normalize-space()='Add Record']").click();

        // Select ear tag / secondary identifier
        await page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select vaccine
        await page.locator("//span[normalize-space()='Vaccine']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select vaccination date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Vaccination date']/parent::label/following-sibling::div/div/button",
            vaccinationDate
        );

        // Select next due date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Next due date']/parent::label/following-sibling::div/div/button",
            nextDueDate
        );

        // Enter batch / lot number
        await page.locator("//span[normalize-space()='Batch / lot number']/parent::label/following-sibling::div/div/input")
            .fill(batchNumber);

        // Enter administered by
        await page.locator("//span[normalize-space()='Administered by']/parent::label/following-sibling::div/div/input")
            .fill(administeredBy);

        // Enter notes
        await page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input")
            .fill(notes);

        // Save and proceed
        await page.locator("//button[normalize-space()='Save']").click();
        await page.locator("//button[normalize-space()='Next']").click();
    }



    static async fillVitalEventDetails(
        page,
        eventType,
        eventDate,
        location,
        locationDetails,
        numberOfOffspring,
        sexOfOffspring,
        breedOfOffspring,
        birthWeight,
        reportingOfficer,
        notes
    ) {
        await page.waitForTimeout(2000);

        // Add vital event record
        await page.locator("//button[normalize-space()='Add Record']").click();

        // Select ear tag / secondary identifier
        await page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select event type
        await page.locator("//span[normalize-space()='Event type']/parent::label/following-sibling::div/select")
            .selectOption(eventType);

        // Select event date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Event date']/parent::label/following-sibling::div/div/button",
            eventDate
        );

        // Select location
        await page.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select")
            .selectOption(location);

        // Enter location details
        await page.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input")
            .fill(locationDetails);

        // Enter number of offspring
        await page.locator("//span[normalize-space()='Number of offspring']/parent::label/following-sibling::div/div/input")
            .fill(String(numberOfOffspring));

        // Select sex of offspring
        await page.locator("//span[normalize-space()='Sex of offspring']/parent::label/following-sibling::div/select")
            .selectOption(sexOfOffspring);

        // Select breed of offspring
        await page.locator("//span[normalize-space()='Breed of Offspring']/parent::label/following-sibling::div/select")
            .selectOption(breedOfOffspring);

        // Enter birth weight
        await page.locator("//span[normalize-space()='Birth Weight (kg)']/parent::label/following-sibling::div/div/input")
            .fill(String(birthWeight));

        // Enter reporting officer
        await page.locator("//span[normalize-space()='Reporting officer']/parent::label/following-sibling::div/div/input")
            .fill(reportingOfficer);

        // Enter notes
        await page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input")
            .fill(notes);

        // Save and proceed
        await page.locator("//button[normalize-space()='Save']").click();
        await page.locator("//button[normalize-space()='Next']").click();
    }


    static async fillBreedingDetails(
        page,
        breedingDate,
        sireSource,
        locationDetails,
        expectedCalvingDate,
        pregnancyConfirmationDate,
        outcome,
        notes
    ) {
        await page.waitForTimeout(2000);

        // Add breeding record
        await page.locator("//button[normalize-space()='Add Record']").click();

        // Select ear tag / secondary identifier
        await page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select breeding type
        await page.locator("//span[normalize-space()='Breeding type']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Select breeding date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Breeding date']/parent::label/following-sibling::div/div/button",
            breedingDate
        );

        // Enter sire / semen source
        await page.locator("//span[normalize-space()='Sire / semen source']/parent::label/following-sibling::div/div/input")
            .fill(sireSource);

        // Select location
        await page.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select")
            .selectOption({ index: 1 });

        // Enter location details
        await page.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input")
            .fill(locationDetails);

        // Select expected calving date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Expected calving date']/parent::label/following-sibling::div/div/button",
            expectedCalvingDate
        );

        // Select pregnancy confirmation checkbox
        await page.locator(".cursor-pointer input").first().click();

        // Select pregnancy confirmation date
        await this.selectEthiopianDate(
            page,
            "//span[normalize-space()='Pregnancy confirmation date']/parent::label/following-sibling::div/div/button",
            pregnancyConfirmationDate
        );

        // Select outcome
        await page.locator("//span[normalize-space()='Outcome']/parent::label/following-sibling::div/select")
            .selectOption(outcome);

        // Enter notes
        await page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input")
            .fill(notes);

        // Save and proceed
        await page.locator("//button[normalize-space()='Save']").click();
        await page.locator("//button[normalize-space()='Next']").click();
    }







    // Generate random alphanumeric sequence
    static generateRandomString(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(randomInt(characters.length));
        }

        return result;
    }

    // Generate random numeric sequence
    static generateRandomNumber(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        let result = '';

        for (let i = 0; i < length; i++) {
            result += randomInt(0, 10).toString();
        }

        return result;
    }

    // Generate random capital letters
    static generateCapitalLetters(length) {
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error("Length must be a positive integer");
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(randomInt(characters.length));
        }

        return result;
    }


    static async selectEthiopianDate(page, dateInputLocator, date) {

        // Expected format: dd/mm/yyyy
        const [day, month, year] = date.split('/').map(Number);

        if (
            !Number.isInteger(day) ||
            !Number.isInteger(month) ||
            !Number.isInteger(year) ||
            day < 1 || day > 30 ||
            month < 1 || month > 13
        ) {
            throw new Error('Invalid Ethiopian date. Use dd/mm/yyyy');
        }

        // Open date picker
        await page.locator(dateInputLocator).click();

        const calendar = page.getByRole('dialog', { name: 'Calendar' });

        await calendar.waitFor({ state: 'visible', timeout: 10000 });

        // Select Ethiopian month
        await calendar.locator('select[aria-label="Month"]')
            .selectOption(String(month));

        // Select Ethiopian year
        await calendar.locator('select[aria-label="Year"]')
            .selectOption(String(year));

        // Select the required day
        const dayButton = calendar.locator('button:not([disabled])')
            .filter({ hasText: new RegExp(`^${day}$`) });

        await dayButton.waitFor({ state: 'visible', timeout: 10000 });
        await dayButton.click();
    }


    static async selectEthiopianDate1(dateInputLocator, date) {

        // Expected format: dd/mm/yyyy
        const [day, month, year] = date.split('/').map(Number);

        if (
            !Number.isInteger(day) ||
            !Number.isInteger(month) ||
            !Number.isInteger(year) ||
            day < 1 || day > 30 ||
            month < 1 || month > 13
        ) {
            throw new Error('Invalid Ethiopian date. Use dd/mm/yyyy');
        }

        // Open date picker
        await dateInputLocator.click();

        const calendar = dateInputLocator.page().getByRole('dialog', {
            name: 'Calendar'
        });

        await calendar.waitFor({ state: 'visible', timeout: 10000 });

        // Select Ethiopian month
        await calendar.locator('select[aria-label="Month"]')
            .selectOption(String(month));

        // Select Ethiopian year
        await calendar.locator('select[aria-label="Year"]')
            .selectOption(String(year));

        // Select required day
        const dayButton = calendar.locator('button:not([disabled])')
            .filter({ hasText: new RegExp(`^${day}$`) });

        await dayButton.waitFor({ state: 'visible', timeout: 10000 });
        await dayButton.click();
    }


}




module.exports = PlaywrightUtils;

