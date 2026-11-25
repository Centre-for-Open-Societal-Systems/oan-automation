class LivestockRegistry {


    constructor(page) {
        this.page = page;
        this.context = page.context();


        this.livestockRegistry =
            page.getByText("Livestock Registry");

        this.detailsSection = page.locator('h2');
        this.headings = page.locator("//h2");

        this.nextButton = page.locator("//button[normalize-space()='Next']");
        this.addRecordButton = page.locator("//button[normalize-space()='Add Record']");
        this.saveButton = page.locator("//button[normalize-space()='Save']");

        this.farmerId = page.locator("//span[normalize-space()='Farmer ID']/parent::label/following-sibling::div/div/input");
        this.faydaId = page.locator("//span[normalize-space()='Fayda ID (FAN or FIN)']/parent::label/following-sibling::div/div/input");

        this.DAname = page.locator("//span[normalize-space()='DA name']/parent::label/following-sibling::div/div/input");
        this.DAMobileNumber = page.locator("//span[normalize-space()='DA mobile number']/parent::label/following-sibling::div/div/input");
        this.supervisorName = page.locator("//span[normalize-space()='Supervisor name']/parent::label/following-sibling::div/div/input");
        this.supervisorMobileNumber = page.locator("//span[normalize-space()='Supervisor mobile number']/parent::label/following-sibling::div/div/input");

        this.country = page.locator("//span[normalize-space()='Country']/parent::label/following-sibling::div/select");
        this.region = page.locator("//span[normalize-space()='Region']/parent::label/following-sibling::div/select");
        this.zone = page.locator("//span[normalize-space()='Zone']/parent::label/following-sibling::div/select");
        this.woreda = page.locator("//span[normalize-space()='Woreda']/parent::label/following-sibling::div/select");
        this.kebele = page.locator("//span[normalize-space()='Kebele']/parent::label/following-sibling::div/select");

        this.selectSpecies = page.locator("//span[normalize-space()='Species']/parent::label/following-sibling::div/select");
        this.selectBreed = page.locator("//span[normalize-space()='Breed']/parent::label/following-sibling::div/select");
        this.earTag = page.locator("//span[normalize-space()='Ear tag']/parent::label/following-sibling::div/div/input");
        this.weight = page.locator("//span[normalize-space()='Weight (kg)']/parent::label/following-sibling::div/div/input");
        this.dateOfBirth = page.locator("//span[normalize-space()='Date of birth']/parent::label/following-sibling::div/div/button");
        this.selectSex = page.locator("//span[normalize-space()='Sex']/parent::label/following-sibling::div/select");
        this.selectHealthStatus = page.locator("//span[normalize-space()='Health status']/parent::label/following-sibling::div/select");
        this.selectVaccinationStatus = page.locator("//span[normalize-space()='Vaccination status']/parent::label/following-sibling::div/select");
        this.registrationDate = page.locator("//span[normalize-space()='Registration date']/parent::label/following-sibling::div/div/button");

        this.selectEarTag = page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select");
        this.selectEventType = page.locator("//span[normalize-space()='Event type']/parent::label/following-sibling::div/select");
        this.dateOfOnset = page.locator("//span[normalize-space()='Date of onset']/parent::label/following-sibling::div/div/button");
        this.treatmentAdministered = page.locator("//span[normalize-space()='Treatment administered']/parent::label/following-sibling::div/div/input");
        this.veterinarian = page.locator("//span[normalize-space()='Veterinarian / officer']/parent::label/following-sibling::div/div/input");
        this.locationDetails = page.locator("//span[normalize-space()='Location details']/parent::label/following-sibling::div/div/input");
        this.notes = page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input");
        this.location = page.locator("//span[normalize-space()='Location']/parent::label/following-sibling::div/select");

        this.selectEarTag = page.locator("//span[normalize-space()='Ear tag / secondary identifier']/parent::label/following-sibling::div/select");
        this.selectVaccine = page.locator("//span[normalize-space()='Vaccine']/parent::label/following-sibling::div/select");
        this.vaccinationDate = page.locator("//span[normalize-space()='Vaccination date']/parent::label/following-sibling::div/div/button");
        this.nextDueDate = page.locator("//span[normalize-space()='Next due date']/parent::label/following-sibling::div/div/button");
        this.batchNumber = page.locator("//span[normalize-space()='Batch / lot number']/parent::label/following-sibling::div/div/input");
        this.administeredBy = page.locator("//span[normalize-space()='Administered by']/parent::label/following-sibling::div/div/input");
        this.notes = page.locator("//span[normalize-space()='Notes']/parent::label/following-sibling::div/div/input");

        this.eventDate = page.locator("//span[normalize-space()='Event date']/parent::label/following-sibling::div/div/button");
        this.numberOfOffSpring = page.locator("//span[normalize-space()='Number of offspring']/parent::label/following-sibling::div/div/input");
        this.sexOfOffspring = page.locator("//span[normalize-space()='Sex of offspring']/parent::label/following-sibling::div/select");
        this.breedOfOffspring = page.locator("//span[normalize-space()='Breed of Offspring']/parent::label/following-sibling::div/select");
        this.birthWeight = page.locator("//span[normalize-space()='Birth Weight (kg)']/parent::label/following-sibling::div/div/input");
        this.reportingOfficer = page.locator("//span[normalize-space()='Reporting officer']/parent::label/following-sibling::div/div/input");

        this.breedingType = page.locator("//span[normalize-space()='Breeding type']/parent::label/following-sibling::div/select");
        this.breedingDate = page.locator("//span[normalize-space()='Breeding date']/parent::label/following-sibling::div/div/button");
        this.sireSource = page.locator("//span[normalize-space()='Sire / semen source']/parent::label/following-sibling::div/div/input");
        this.expectedCalvingDate = page.locator("//span[normalize-space()='Expected calving date']/parent::label/following-sibling::div/div/button");
        this.isConfirmed = page.locator(".cursor-pointer input");
        this.pregnancyConfirmationDate = page.locator("//span[normalize-space()='Pregnancy confirmation date']/parent::label/following-sibling::div/div/button");
        this.outcome = page.locator("//span[normalize-space()='Outcome']/parent::label/following-sibling::div/select");


        this.searchLivestockRecords = page.locator("[placeholder='Search']");
        this.searchBotton = page.locator("//div/input[@placeholder='Search']/following-sibling::button");
        this.viewDetails = page.locator("//button[normalize-space()='View details']");
        this.approvalMessage = page.locator("[placeholder='Type your message here...']");
        this.approveButton = page.locator("//button[normalize-space()='Approve']");


    }

    async openLivestockRegistry() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.livestockRegistry.click(),
        ]);

        await newPage.waitForLoadState();

        return newPage;
    }

    async verifyAllSection() {
        await this.detailsSection.first().waitFor({ state: 'visible' });
        const allTexts = await this.headings.allTextContents();

        console.log(allTexts);
    }

    async fillFarmerLookupDetails(farmerID, faydaID) {
        await this.farmerId.fill(farmerID);
        await this.faydaId.fill(faydaID);
    }

    async fillSurveyPersonnelDetail(daName, daMobile, supervisorName, supervisorMobile) {
        await this.DAname.fill(daName);
        await this.DAMobileNumber.fill(daMobile);
        await this.supervisorName.fill(supervisorName);
        await this.supervisorMobileNumber.fill(supervisorMobile);
    }

    async fillLocationDetail(country, region, zone, woreda, kebele) {
        await this.country.selectOption(country);
        await this.region.selectOption(region);
        await this.zone.selectOption(zone);
        await this.woreda.selectOption(woreda);
        await this.kebele.selectOption(kebele);
    }

    async addLivestockDetails(species, breed, earTag, weight, dob, sex, healthStatus, vaccinationStatus, registrationDate) {
        await this.selectSpecies.selectOption(species);
        await this.selectBreed.selectOption(breed);
        await this.earTag.fill(earTag);
        await this.weight.fill(weight);
        await LivestockRegistry.selectEthiopianDate(this.dateOfBirth, dob);
        await this.selectSex.selectOption(sex);
        await this.selectHealthStatus.selectOption(healthStatus);
        await this.selectVaccinationStatus.selectOption(vaccinationStatus);
        await LivestockRegistry.selectEthiopianDate(this.registrationDate, registrationDate);
    }

    async addHealthEventDetail(eventType, dateOfOnset, treatment, veterinarian, locationDetails, notes, location) {
        await this.selectEarTag.selectOption({ index: 1 });
        await this.selectEventType.selectOption(eventType);
        await LivestockRegistry.selectEthiopianDate(this.dateOfOnset, dateOfOnset);
        await this.treatmentAdministered.fill(treatment);
        await this.veterinarian.fill(veterinarian);
        await this.locationDetails.fill(locationDetails);
        await this.notes.fill(notes);
        await this.location.selectOption(location);
    }

    async addVaccinationDetails(dateOfOnset, nextDueDate, batchNumber, administeredBy, notes) {

        await this.selectEarTag.selectOption({ index: 1 });
        await this.selectVaccine.selectOption({ index: 1 });
        await LivestockRegistry.selectEthiopianDate(this.vaccinationDate, dateOfOnset);
        await LivestockRegistry.selectEthiopianDate(this.nextDueDate, nextDueDate);
        await this.batchNumber.fill(batchNumber);
        await this.administeredBy.fill(administeredBy);
        await this.notes.fill(notes);


    }

    async addVitalEventDetails(eventType, eventDate, location, locationDetails, numberOfOffspring, sexOfOffspring, breedOfOffspring, birthWeight, reportingOfficer, notes) {
        await this.selectEarTag.selectOption({ index: 1 });
        await this.selectEventType.selectOption(eventType);
        await LivestockRegistry.selectEthiopianDate(this.eventDate, eventDate);
        await this.location.selectOption(location);
        await this.locationDetails.fill(locationDetails);
        await this.numberOfOffSpring.fill(String(numberOfOffspring));
        await this.sexOfOffspring.selectOption(sexOfOffspring);
        await this.breedOfOffspring.selectOption(breedOfOffspring);
        await this.birthWeight.fill(String(birthWeight));
        await this.reportingOfficer.fill(reportingOfficer);
        await this.notes.fill(notes);


    }


    async addBreedingDetails(breedingDate, sireSource, locationDetails, expectedCalvingDate, pregnancyConfirmationDate, outcome, notes) {
        await this.selectEarTag.selectOption({ index: 1 });
        await this.breedingType.selectOption({ index: 1 });
        await LivestockRegistry.selectEthiopianDate(this.breedingDate, breedingDate);
        await this.sireSource.fill(sireSource);
        await this.location.selectOption({ index: 1 });
        await this.locationDetails.fill(locationDetails);
        await LivestockRegistry.selectEthiopianDate(this.expectedCalvingDate, expectedCalvingDate);
        await this.isConfirmed.first().click();
        await LivestockRegistry.selectEthiopianDate(this.pregnancyConfirmationDate, pregnancyConfirmationDate);
        await this.outcome.selectOption(outcome);
        await this.notes.fill(notes);
    }

    async approveRecord(farmerID) {
        await this.searchLivestockRecords.fill(farmerID);
        await this.searchBotton.click();
        await this.viewDetails.first().click();
        await this.approvalMessage.fill("Approved");
        await this.approveButton.click();
        await this.page.waitForTimeout(2000);
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.approvalMessage.fill("Approved");
        await this.approveButton.click();
        await this.page.reload();
        await this.page.waitForTimeout(2000);
        await this.page.reload();


    }




    async clickNext() {

        await this.nextButton.click();
    }

    async clickOnAddReocrd() {
        // await this.page.waitForTimeout(2000);
        await this.addRecordButton.click();
    }

    async clickOnSave() {
        await this.saveButton.click();
    }


    static async selectEthiopianDate(dateInputLocator, date) {

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

module.exports = LivestockRegistry;