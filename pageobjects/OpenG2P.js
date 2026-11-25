class OpenG2P {
    constructor(page) {
        this.page = page;
        this.context = page.context();

        this.livestockRegistry =
            page.getByText("Livestock Registry");
    }

    async openLivestockRegistry() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.livestockRegistry.click(),
        ]);

        await newPage.waitForLoadState();

        return newPage;
    }
}

module.exports = OpenG2P;