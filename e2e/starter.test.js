describe('View lists and create new one', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have Home screen with Stubs button', async () => {
    await expect(element(by.id('StubsBtn'))).toBeVisible();
  });

  it('should show Stubs screen after Stubs button tap', async () => {
    await element(by.id('StubsBtn')).tap();
    await expect(element(by.id('ListsBtn'))).toBeVisible();
  });

  it('should show My Lists screen after List button tap', async () => {
    await element(by.id('ListsBtn')).tap();
    await expect(element(by.id('AddBtn'))).toBeVisible();
    await element(by.id('Flatlist')).scroll(100, 'down', NaN, 0.85);
  });

  it('should show Create list screen after Add button tap', async () => {
    await element(by.id('AddBtn')).tap();
    await expect(element(by.id('NameInput'))).toBeVisible();
  });

  it('should show Error while creating a list', async () => {
    await element(by.id('NameInput')).typeText('name!!!!');
    await element(by.id('DescriptionInput')).typeText('description');
    await element(by.id('SubmitButton')).tap();
    await expect(element(by.id('NameError'))).toBeVisible();
  });

  it('should create a new list', async () => {
    await element(by.id('NameInput')).clearText();
    await element(by.id('NameInput')).typeText('newlist19');
    await element(by.id('DescriptionInput')).clearText();
    await element(by.id('DescriptionInput')).typeText('description');
    await element(by.id('SubmitButton')).tap();
    await element(by.text('OK')).tap();
    await element(by.id('Flatlist')).scroll(300, 'up');
    await expect(element(by.text('newlist19'))).toBeVisible();
  });
});
