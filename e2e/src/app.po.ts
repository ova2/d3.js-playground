import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class AppPage {
  public navigateTo(): any {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getTitleText(): promise.Promise<string> {
    return element(by.css('ssp-editor-root h1')).getText() as Promise<string>;
  }
}
