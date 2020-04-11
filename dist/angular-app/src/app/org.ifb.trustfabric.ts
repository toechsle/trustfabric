import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ifb.trustfabric{
   export abstract class User extends Participant {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
   }
   export class ClientAdministrator extends User {
      company: string;
   }
   export class ConsultantAdministrator extends User {
      company: string;
   }
   export class Client extends User {
      company: string;
      position: string;
      readableConsultants: Consultant[];
      writableConsultants: Consultant[];
      proposedProjects: ProposedProject[];
      acceptedProjects: AcceptedProject[];
   }
   export class Consultant extends User {
      company: string;
      position: string;
      image: string;
      logItems: LogItem[];
      teamleaders: Consultant[];
      skills: Skill[];
      projects: Project[];
   }
   export class LogItem {
      creator: User;
      date: Date;
      text: string;
   }
   export class Skill extends Asset {
      id: string;
      name: string;
      proficiency: Proficiency;
   }
   export enum Proficiency {
      Beginner,
      Intermediate,
      Advanced,
   }
   export class Project extends Asset {
      id: string;
      name: string;
      beginning: Date;
      end: Date;
      duration: string;
      description: string;
      creator: Client;
   }
   export abstract class XProject extends Asset {
      id: string;
      name: string;
      projectLeader: Consultant;
      consultants: Consultant[];
   }
   export class ProposedProject extends XProject {
   }
   export class AcceptedProject extends XProject {
   }
   export class ConsultantCompany extends Asset {
      name: string;
   }
   export class ClientCompany extends Asset {
      name: string;
   }
   export class UpdateMasterDataOfClientAdministrator extends Transaction {
      administrator: ClientAdministrator;
      newFirstName: string;
      newLastName: string;
      newEmail: string;
   }
   export class ClientAdministratorUpdated extends Event {
      administratorOld: ClientAdministrator;
      administratorNew: ClientAdministrator;
   }
   export class UpdateMasterDataOfConsultantAdministrator extends Transaction {
      administrator: ConsultantAdministrator;
      newFirstName: string;
      newLastName: string;
      newEmail: string;
   }
   export class ConsultantAdministratorUpdated extends Event {
      administratorOld: ConsultantAdministrator;
      administratorNew: ConsultantAdministrator;
   }
   export class UpdateMasterDataOfClient extends Transaction {
      client: Client;
      newFirstName: string;
      newLastName: string;
      newEmail: string;
      newCompany: string;
      newPosition: string;
   }
   export class AddToReadableConsultantsOfClient extends Transaction {
      client: Client;
      newReadableConsultants: Consultant[];
   }
   export class RemoveFromReadableConsultantsOfClient extends Transaction {
      client: Client;
      readableConsultantsToBeRemoved: Consultant[];
   }
   export class AddToWritableConsultantsOfClient extends Transaction {
      client: Client;
      newWritableConsultants: Consultant[];
   }
   export class RemoveFromWritableConsultantsOfClient extends Transaction {
      client: Client;
      writableConsultantsToBeRemoved: Consultant[];
   }
   export class AddToProposedProjectsOfClient extends Transaction {
      client: Client;
      newProposedProjects: ProposedProject[];
   }
   export class RemoveFromProposedProjectsOfClient extends Transaction {
      client: Client;
      proposedProjectToBeRemoved: ProposedProject;
   }
   export class AddToAcceptedProjectsOfClient extends Transaction {
      client: Client;
      newAcceptedProjects: AcceptedProject[];
   }
   export class RemoveFromAcceptedProjectsOfClient extends Transaction {
      client: Client;
      acceptedProjectToBeRemoved: AcceptedProject;
   }
   export class ClientUpdated extends Event {
      clientOld: Client;
      clientNew: Client;
   }
   export class UpdateMasterDataOfConsultant extends Transaction {
      consultant: Consultant;
      newFirstName: string;
      newLastName: string;
      newEmail: string;
      newCompany: string;
      newPosition: string;
   }
   export class UpdateImageOfConsultant extends Transaction {
      consultant: Consultant;
      newImage: string;
   }
   export class AddTeamleaderWithGivenEmailToConsultant extends Transaction {
      consultant: Consultant;
      email: string;
   }
   export class AddTeamleaderToConsultant extends Transaction {
      consultant: Consultant;
      newTeamleader: Consultant[];
   }
   export class RemoveTeamleaderFromConsultant extends Transaction {
      consultant: Consultant;
      teamleaderToBeRemoved: Consultant;
   }
   export class UpdateSkillsOfConsultant extends Transaction {
      consultant: Consultant;
      newSkills: Skill[];
   }
   export class UpdateProjectsOfConsultant extends Transaction {
      consultant: Consultant;
      newProject: Project[];
   }
   export class AddLogItemToConsultant extends Transaction {
      consultant: Consultant;
      logItem: LogItem[];
   }
   export class ConsultantUpdated extends Event {
      consultantOld: Consultant;
      consultantNew: Consultant;
   }
   export class AddToConsultantsOfProposedProject extends Transaction {
      proposedProject: ProposedProject;
      newConsultants: Consultant[];
   }
   export class RemoveFromConsultantsOfProposedProject extends Transaction {
      proposedProject: ProposedProject;
      consultantsToBeRemoved: Consultant[];
   }
   export class ProposedProjectUpdated extends Event {
      proposedProjectOld: ProposedProject;
      proposedProjectNew: ProposedProject;
   }
   export class AddToConsultantsOfAcceptedProject extends Transaction {
      acceptedProject: AcceptedProject;
      newConsultants: Consultant[];
   }
   export class RemoveFromConsultantsOfAcceptedProject extends Transaction {
      acceptedProject: AcceptedProject;
      consultantsToBeRemoved: Consultant[];
   }
   export class AcceptedProjectUpdated extends Event {
      acceptedProjectOld: AcceptedProject;
      acceptedProjectNew: AcceptedProject;
   }
// }
