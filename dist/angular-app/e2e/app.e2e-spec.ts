/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('network-name should be trustfabric-perfect@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('trustfabric-perfect@0.0.1.bna');
    });
  });

  it('navbar-brand should be angular-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('angular-app');
    });
  });

  
    it('Skill component should be loadable',() => {
      page.navigateTo('/Skill');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Skill');
      });
    });

    it('Skill table should have 4 columns',() => {
      page.navigateTo('/Skill');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Project component should be loadable',() => {
      page.navigateTo('/Project');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Project');
      });
    });

    it('Project table should have 8 columns',() => {
      page.navigateTo('/Project');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('ProposedProject component should be loadable',() => {
      page.navigateTo('/ProposedProject');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProposedProject');
      });
    });

    it('ProposedProject table should have 5 columns',() => {
      page.navigateTo('/ProposedProject');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('AcceptedProject component should be loadable',() => {
      page.navigateTo('/AcceptedProject');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AcceptedProject');
      });
    });

    it('AcceptedProject table should have 5 columns',() => {
      page.navigateTo('/AcceptedProject');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('ConsultantCompany component should be loadable',() => {
      page.navigateTo('/ConsultantCompany');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ConsultantCompany');
      });
    });

    it('ConsultantCompany table should have 2 columns',() => {
      page.navigateTo('/ConsultantCompany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  
    it('ClientCompany component should be loadable',() => {
      page.navigateTo('/ClientCompany');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ClientCompany');
      });
    });

    it('ClientCompany table should have 2 columns',() => {
      page.navigateTo('/ClientCompany');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ClientAdministrator component should be loadable',() => {
      page.navigateTo('/ClientAdministrator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ClientAdministrator');
      });
    });

    it('ClientAdministrator table should have 6 columns',() => {
      page.navigateTo('/ClientAdministrator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('ConsultantAdministrator component should be loadable',() => {
      page.navigateTo('/ConsultantAdministrator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ConsultantAdministrator');
      });
    });

    it('ConsultantAdministrator table should have 6 columns',() => {
      page.navigateTo('/ConsultantAdministrator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  
    it('Client component should be loadable',() => {
      page.navigateTo('/Client');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Client');
      });
    });

    it('Client table should have 11 columns',() => {
      page.navigateTo('/Client');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  
    it('Consultant component should be loadable',() => {
      page.navigateTo('/Consultant');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Consultant');
      });
    });

    it('Consultant table should have 12 columns',() => {
      page.navigateTo('/Consultant');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('UpdateMasterDataOfClientAdministrator component should be loadable',() => {
      page.navigateTo('/UpdateMasterDataOfClientAdministrator');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMasterDataOfClientAdministrator');
      });
    });
  
    it('UpdateMasterDataOfConsultantAdministrator component should be loadable',() => {
      page.navigateTo('/UpdateMasterDataOfConsultantAdministrator');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMasterDataOfConsultantAdministrator');
      });
    });
  
    it('UpdateMasterDataOfClient component should be loadable',() => {
      page.navigateTo('/UpdateMasterDataOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMasterDataOfClient');
      });
    });
  
    it('AddToReadableConsultantsOfClient component should be loadable',() => {
      page.navigateTo('/AddToReadableConsultantsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToReadableConsultantsOfClient');
      });
    });
  
    it('RemoveFromReadableConsultantsOfClient component should be loadable',() => {
      page.navigateTo('/RemoveFromReadableConsultantsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromReadableConsultantsOfClient');
      });
    });
  
    it('AddToWritableConsultantsOfClient component should be loadable',() => {
      page.navigateTo('/AddToWritableConsultantsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToWritableConsultantsOfClient');
      });
    });
  
    it('RemoveFromWritableConsultantsOfClient component should be loadable',() => {
      page.navigateTo('/RemoveFromWritableConsultantsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromWritableConsultantsOfClient');
      });
    });
  
    it('AddToProposedProjectsOfClient component should be loadable',() => {
      page.navigateTo('/AddToProposedProjectsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToProposedProjectsOfClient');
      });
    });
  
    it('RemoveFromProposedProjectsOfClient component should be loadable',() => {
      page.navigateTo('/RemoveFromProposedProjectsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromProposedProjectsOfClient');
      });
    });
  
    it('AddToAcceptedProjectsOfClient component should be loadable',() => {
      page.navigateTo('/AddToAcceptedProjectsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToAcceptedProjectsOfClient');
      });
    });
  
    it('RemoveFromAcceptedProjectsOfClient component should be loadable',() => {
      page.navigateTo('/RemoveFromAcceptedProjectsOfClient');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromAcceptedProjectsOfClient');
      });
    });
  
    it('UpdateMasterDataOfConsultant component should be loadable',() => {
      page.navigateTo('/UpdateMasterDataOfConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateMasterDataOfConsultant');
      });
    });
  
    it('UpdateImageOfConsultant component should be loadable',() => {
      page.navigateTo('/UpdateImageOfConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateImageOfConsultant');
      });
    });
  
    it('AddTeamleaderWithGivenEmailToConsultant component should be loadable',() => {
      page.navigateTo('/AddTeamleaderWithGivenEmailToConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddTeamleaderWithGivenEmailToConsultant');
      });
    });
  
    it('AddTeamleaderToConsultant component should be loadable',() => {
      page.navigateTo('/AddTeamleaderToConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddTeamleaderToConsultant');
      });
    });
  
    it('RemoveTeamleaderFromConsultant component should be loadable',() => {
      page.navigateTo('/RemoveTeamleaderFromConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveTeamleaderFromConsultant');
      });
    });
  
    it('UpdateSkillsOfConsultant component should be loadable',() => {
      page.navigateTo('/UpdateSkillsOfConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateSkillsOfConsultant');
      });
    });
  
    it('UpdateProjectsOfConsultant component should be loadable',() => {
      page.navigateTo('/UpdateProjectsOfConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateProjectsOfConsultant');
      });
    });
  
    it('AddLogItemToConsultant component should be loadable',() => {
      page.navigateTo('/AddLogItemToConsultant');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddLogItemToConsultant');
      });
    });
  
    it('AddToConsultantsOfProposedProject component should be loadable',() => {
      page.navigateTo('/AddToConsultantsOfProposedProject');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToConsultantsOfProposedProject');
      });
    });
  
    it('RemoveFromConsultantsOfProposedProject component should be loadable',() => {
      page.navigateTo('/RemoveFromConsultantsOfProposedProject');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromConsultantsOfProposedProject');
      });
    });
  
    it('AddToConsultantsOfAcceptedProject component should be loadable',() => {
      page.navigateTo('/AddToConsultantsOfAcceptedProject');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AddToConsultantsOfAcceptedProject');
      });
    });
  
    it('RemoveFromConsultantsOfAcceptedProject component should be loadable',() => {
      page.navigateTo('/RemoveFromConsultantsOfAcceptedProject');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RemoveFromConsultantsOfAcceptedProject');
      });
    });
  

});