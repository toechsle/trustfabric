import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, 
  MatCheckboxModule, 
  MatIconModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { ConsultantsAdminComponent } from './admin-consultant/consultants-admin/consultants-admin.component';
import { ClientsAdminComponent } from './admin-client/clients-admin/clients-admin.component';
import { ValueListsAdminComponent } from './value-lists-admin/value-lists-admin.component';
import { ConsultantsListComponent } from './admin-consultant/consultants-admin/consultants-list/consultants-list.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { NoAccessComponent } from './auth/no-access/no-access.component';
import { AuthService } from './auth/auth.service';
import { ConsultantCompanyService } from './ConsultantCompany.service';
import { SkillService } from './skills.service';
import { SkillUpdateService } from './value-lists-admin/skills-admin.update.service';
import { ConsultantService } from './consultants.service';
import { NewConsultantMessageComponent } from './admin-consultant/consultants-admin/create-new-consultant/new-consultant-message/new-consultant-message.component';
import { ConsultantUpdateService } from './admin-consultant/consultants-admin/consultants-admin.update.service';
import { DeleteConsultantDialogComponent } from './admin-consultant/consultants-admin/consultants-list/delete-consultant-dialog/delete-consultant-dialog.component';
import { CreateNewConsultantComponent } from './admin-consultant/consultants-admin/create-new-consultant/create-new-consultant.component';
import { ClientsListComponent } from './admin-client/clients-admin/clients-list/clients-list.component';
import { CreateNewClientComponent } from './admin-client/clients-admin/create-new-client/create-new-client.component';
import { DeleteClientDialogComponent } from './admin-client/clients-admin/clients-list/delete-client-dialog/delete-client-dialog.component';
import { NewClientMessageComponent } from './admin-client/clients-admin/create-new-client/new-client-message/new-client-message.component';
import { ClientService } from './clients.service';
import { ClientUpdateService } from './admin-client/clients-admin/clients-admin.update.service';
import { ClientCompanyService } from './ClientCompany.service';
import { SkillsListComponent } from './value-lists-admin/skills-list/skills-list.component';
import { CreateNewSkillComponent } from './value-lists-admin/create-new-skill/create-new-skill.component';
import { DeleteSkillDialogComponent } from './value-lists-admin/skills-list/delete-skill-dialog/delete-skill-dialog.component';
import { NewSkillMessageComponent } from './value-lists-admin/create-new-skill/new-skill-message/new-skill-message.component';
import { ConsultantsDeleteTeamleaderDialogComponent } from './consultants/profile-consultants/consultants-delete-teamleader-dialog/consultants-delete-teamleader-dialog.component';
import { ConsultantsUpdatePersonalDataService } from './consultants/profile-consultants/consultants-update-personal-data.service';
import { UpdateMasterDataOfConsultantService } from './consultants/profile-consultants/UpdateMasterDataOfConsultant.service';
import { ProfileConsultantsComponent } from './consultants/profile-consultants/profile-consultants.component';
import { SecurityConsultantsComponent } from './consultants/security-consultants/security-consultants.component';
import { ConsultantsUpdatePersonalDataDialogComponent } from './consultants/profile-consultants/consultants-update-personal-data-dialog/consultants-update-personal-data-dialog.component';
import { RemoveTeamleaderFromConsultantService } from './consultants/profile-consultants/RemoveTeamleaderFromConsultant.service';
import { NewPasswordMessageConsultantsComponent } from './consultants/security-consultants/new-password-message-consultants/new-password-message-consultants.component';
import { EqualValidatorConsultantDirective } from './consultants/security-consultants/equal-validator-consultants.directive';
import { DataClientsComponent } from './clients/data-clients/data-clients.component';
import { SecurityClientsComponent } from './clients/security-clients/security-clients.component';
import { ClientsUpdatePersonalDataDialogComponent } from './clients/data-clients/clients-update-personal-data-dialog/clients-update-personal-data-dialog.component';
import { UpdateMasterDataOfClientService } from './clients/data-clients/UpdateMasterDataOfClient.service';
import { ClientsUpdatePersonalDataService } from './clients/data-clients/clients-update-personal-data.service';
import { NewPasswordMessageClientsComponent } from './clients/security-clients/new-password-message-clients/new-password-message-clients.component';
import { EqualValidatorClientsDirective } from './clients/security-clients/equal-validator-clients.directive';
import { CreateNewCompanyComponent } from './value-lists-admin/create-new-company/create-new-company.component';
import { ConsultantCompaniesListComponent } from './value-lists-admin/companies-list/companies-list.component';
import { NewCompanyMessageComponent } from './value-lists-admin/create-new-company/new-company-message/new-company-message.component';
import { DeleteCompanyDialogComponent } from './value-lists-admin/companies-list/delete-company-dialog/delete-company-dialog.component';
import { CreateNewClientCompanyComponent } from './value-lists-admin/create-new-client-company/create-new-client-company.component';
import { ClientCompaniesListComponent } from './value-lists-admin/client-companies-list/client-companies-list.component';
import { NewClientCompanyMessageComponent } from './value-lists-admin/create-new-client-company/new-client-company-message/new-client-company-message.component';
import { DeleteClientCompanyDialogComponent } from './value-lists-admin/client-companies-list/delete-client-company-dialog/delete-client-company-dialog.component';
import { ConsultantsUpdateImageDialogComponent } from './consultants/profile-consultants/consultants-update-image-dialog/consultants-update-image-dialog.component';
import { UpdateImageOfConsultantService } from './consultants/profile-consultants/UpdateImageOfConsultant.service';
import { QueriesService } from './queries.service';
import { ProjectsConsultantsComponent } from './consultants/projects-consultants/projects-consultants.component';
import { ProjectsListComponent } from './consultants/projects-consultants/projects-list/projects-list.component';
import { CreateNewProjectComponent } from './consultants/projects-consultants/create-new-project/create-new-project.component';
import { NewProposedProjectMessageComponent } from './consultants/projects-consultants/create-new-project/new-proposed-project-message/new-proposed-project-message.component';
import { DeleteProjectDialogComponent } from './consultants/projects-consultants/projects-list/delete-project-dialog/delete-project-dialog.component';
import { ProposedProjectService } from './ProposedProject.service';
import { ProposedProjectUpdateService } from './consultants/projects-consultants/projects-proposed.update.service';
import { GrantAccessDialogComponent } from './consultants/projects-consultants/projects-list/grant-access-dialog/grant-access-dialog.component';
import { AddConsultantsDialogComponent } from './consultants/projects-consultants/projects-list/add-consultants-dialog/add-consultants-dialog.component';
import { RemoveConsultantsDialogComponent } from './consultants/projects-consultants/projects-list/remove-consultants-dialog/remove-consultants-dialog.component';
import { AddToConsultantsOfProposedProjectService } from './consultants/projects-consultants/projects-list/add-consultants-dialog/AddToConsultantsOfProposedProject.service';
import { RemoveFromConsultantsOfProposedProjectService } from './consultants/projects-consultants/projects-list/remove-consultants-dialog/RemoveFromConsultantsOfProposedProject.service';
import { AddToProposedProjectsOfClientService } from './consultants/projects-consultants/projects-list/grant-access-dialog/AddToProposedProjectsOfClient.service';
import { RemoveAccessDialogComponent } from './consultants/projects-consultants/projects-list/remove-access-dialog/remove-access-dialog.component';
import { RemoveFromProposedProjectsOfClientService } from './consultants/projects-consultants/projects-list/RemoveFromProposedProjectsOfClient.service';
import { TransformProjectDialogComponent } from './consultants/projects-consultants/projects-list/transform-project-dialog/transform-project-dialog.component';
import { AcceptedProjectsListComponent } from './consultants/projects-consultants/accepted-projects-list/accepted-projects-list.component';
import { AddToAcceptedProjectsOfClientService } from './consultants/projects-consultants/AddToAcceptedProjectsOfClient.service';
import { AcceptedProjectService } from './consultants/projects-consultants/AcceptedProject.service';
import { AcceptedProjectUpdateService } from './consultants/projects-consultants/projects-accepted.update.service';
import { AddConsultantsDialogAcceptedComponent } from './consultants/projects-consultants/accepted-projects-list/add-consultants-dialog-accepted/add-consultants-dialog-accepted.component';
import { DeleteProjectDialogAcceptedComponent } from './consultants/projects-consultants/accepted-projects-list/delete-project-dialog-accepted/delete-project-dialog-accepted.component';
import { GrantAccessDialogAcceptedComponent } from './consultants/projects-consultants/accepted-projects-list/grant-access-dialog-accepted/grant-access-dialog-accepted.component';
import { RemoveAccessDialogAcceptedComponent } from './consultants/projects-consultants/accepted-projects-list/remove-access-dialog-accepted/remove-access-dialog-accepted.component';
import { RemoveConsultantsDialogAcceptedComponent } from './consultants/projects-consultants/accepted-projects-list/remove-consultants-dialog-accepted/remove-consultants-dialog-accepted.component';
import { AddToConsultantsOfAcceptedProjectService } from './consultants/projects-consultants/accepted-projects-list/add-consultants-dialog-accepted/AddToConsultantsOfAcceptedProject.service';
import { RemoveFromAcceptedProjectsOfClientService } from './consultants/projects-consultants/accepted-projects-list/RemoveFromAcceptedProjectsOfClient.service';
import { RemoveFromConsultantsOfAcceptedProjectService } from './consultants/projects-consultants/accepted-projects-list/remove-consultants-dialog-accepted/RemoveFromConsultantsOfAcceptedProject.service';
import { AddToReadableConsultantsOfClientService } from './consultants/projects-consultants/projects-list/add-consultants-dialog/AddToReadableConsultantsOfClient.service';
import { TeamMembersConsultantsComponent } from './consultants/team-members-consultants/team-members-consultants.component';
import { ViewTeamMemberProfileComponent } from './consultants/team-members-consultants/view-team-member-profile/view-team-member-profile.component';
import { AddTeamleaderWithGivenEmailToConsultantService } from './consultants/profile-consultants/AddTeamleaderWithGivenEmailToConsultant.service';
import { ViewProjectDescriptionComponent } from './consultants/profile-consultants/view-project-description/view-project-description.component';
import { ProposedProjectsClientsComponent } from './clients/proposed-projects-clients/proposed-projects-clients.component';
import { ViewProposedConsultantProfileComponent } from './clients/proposed-projects-clients/view-proposed-consultant-profile/view-proposed-consultant-profile.component';
import { AcceptedProjectsClientsComponent } from './clients/accepted-projects-clients/accepted-projects-clients.component';
import { ViewAcceptedConsultantProfileComponent } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile.component';
import { AddSkillsDialogComponent } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/add-skills-dialog/add-skills-dialog.component';
import { UpdateSkillsOfConsultantService } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/add-skills-dialog/UpdateSkillsOfConsultant.service';
import { SkillsUpdateClientService } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/skills-update-client.service';
import { ProjectService } from './Project.service';
import { AddProjectDialogComponent } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/add-project-dialog/add-project-dialog.component';
import { ProjectsUpdateClientService } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/projects-update-client.service';
import { UpdateProjectsOfConsultantService } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/add-project-dialog/UpdateProjectsOfConsultant.service';
import { AdminConsultantComponent } from './admin-consultant/admin-consultant.component';
import { AdminClientComponent } from './admin-client/admin-client.component';
import { DataAdminConsultantComponent } from './admin-consultant/data-admin-consultant/data-admin-consultant.component';
import { AdminConsultantUpdatePersonalDataDialogComponent } from './admin-consultant/data-admin-consultant/admin-consultant-update-personal-data-dialog/admin-consultant-update-personal-data-dialog.component';
import { SecurityAdminConsultantComponent } from './admin-consultant/security-admin-consultant/security-admin-consultant.component';
import { NewPasswordMessageAdminConsultantComponent } from './admin-consultant/security-admin-consultant/new-password-message-admin-consultant/new-password-message-admin-consultant.component';
import { EqualValidatorAdminConsultantDirective } from './admin-consultant/security-admin-consultant/equal-validator-admin-consultant.directive';
import { ConsultantAdministratorService } from  './admin-consultant/ConsultantAdministrator.service';
import { AdminNetworkComponent } from './admin-network/admin-network.component';
import { ConsultantAdministratorsComponent } from './admin-network/consultant-administrators/consultant-administrators.component';
import { ClientAdministratorsComponent } from './admin-network/client-administrators/client-administrators.component';
import { ConsultantAdministratorsListComponent } from './admin-network/consultant-administrators/consultant-administrators-list/consultant-administrators-list.component';
import { CreateNewConsultantAdministratorComponent } from './admin-network/consultant-administrators/create-new-consultant-administrator/create-new-consultant-administrator.component';
import { DeleteConsultantAdministratorDialogComponent } from './admin-network/consultant-administrators/consultant-administrators-list/delete-consultant-administrator-dialog/delete-consultant-administrator-dialog.component';
import { NewConsultantAdministratorMessageComponent } from './admin-network/consultant-administrators/create-new-consultant-administrator/new-consultant-administrator-message/new-consultant-administrator-message.component';
import { ConsultantAdministratorUpdateService } from './admin-network/consultant-administrators/consultant-administrator.update.service';
import { AdminConsultantUpdatePersonalDataService } from './admin-consultant/data-admin-consultant/admin-consultant-update-personal-data.service';
import { UpdateMasterDataOfConsultantAdministratorService } from './admin-consultant/data-admin-consultant/UpdateMasterDataOfConsultantAdministrator.service';
import { DataAdminClientComponent } from './admin-client/data-admin-client/data-admin-client.component';
import { SecurityAdminClientComponent } from './admin-client/security-admin-client/security-admin-client.component';
import { AdminClientUpdatePersonalDataDialogComponent } from './admin-client/data-admin-client/admin-client-update-personal-data-dialog/admin-client-update-personal-data-dialog.component';
import { ClientAdministratorService } from './admin-client/ClientAdministrator.service';
import { UpdateMasterDataOfClientAdministratorService } from './admin-client/data-admin-client/UpdateMasterDataOfClientAdministrator.service';
import { AdminClientUpdatePersonalDataService } from './admin-client/data-admin-client/admin-client-update-personal-data.service';
import { NewPasswordMessageAdminClientComponent } from './admin-client/security-admin-client/new-password-message-admin-client/new-password-message-admin-client.component';
import { EqualValidatorAdminClientDirective } from './admin-client/security-admin-client/equal-validator-admin-client.directive';
import { ClientAdministratorsListComponent } from './admin-network/client-administrators/client-administrators-list/client-administrators-list.component';
import { DeleteClientAdministratorDialogComponent } from './admin-network/client-administrators/client-administrators-list/delete-client-administrator-dialog/delete-client-administrator-dialog.component';
import { ClientAdministratorUpdateService } from './admin-network/client-administrators/client-administrator.update.service';
import { CreateNewClientAdministratorComponent } from './admin-network/client-administrators/create-new-client-administrator/create-new-client-administrator.component';
import { NewClientAdministratorMessageComponent } from './admin-network/client-administrators/create-new-client-administrator/new-client-administrator-message/new-client-administrator-message.component';
import { AccountSetUpMessageComponent } from './home/account-set-up-message/account-set-up-message.component';
import { RemoveFromReadableConsultantsOfClientService } from './consultants/projects-consultants/RemoveFromReadableConsultantsOfClient.service';
import { RemoveFromWritableConsultantsOfClientService } from './consultants/projects-consultants/accepted-projects-list/RemoveFromWritableConsultantsOfClient.service';
import { AddToWritableConsultantsOfClientService } from './consultants/projects-consultants/accepted-projects-list/add-consultants-dialog-accepted/AddToWritableConsultantsOfClient.service';
import { UIService } from './ui-service.service';
import { UIWindowService } from './ui-service-windows.service';
import { AddLogItemToConsultantService } from './AddLogItemToConsultant.service';
import { ActivityLogComponent } from './consultants/activity-log/activity-log.component';
import { ActivityLogClientsComponent } from './clients/activity-log-clients/activity-log-clients.component';
import { ViewAcceptedConsultantProfileFirstTabComponent } from './clients/accepted-projects-clients/view-accepted-consultant-profile/view-accepted-consultant-profile-first-tab/view-accepted-consultant-profile-first-tab.component';
import { ConsultantSelectedService } from './clients/consultant-selected.service';
import { ViewProposedConsultantProfileFirstTabComponent } from './clients/proposed-projects-clients/view-proposed-consultant-profile/view-proposed-consultant-profile-first-tab/view-proposed-consultant-profile-first-tab.component';


  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsultantsAdminComponent,
    ClientsAdminComponent,
    CreateNewSkillComponent,
    ValueListsAdminComponent,
    CreateNewConsultantComponent,
    CreateNewClientComponent,
    ConsultantsListComponent,
    ConsultantsComponent,
    ClientsComponent,
    HeaderComponent,
    SidenavComponent,
    NoAccessComponent,
    NewConsultantMessageComponent,
    DeleteConsultantDialogComponent,
    ClientsListComponent,
    DeleteClientDialogComponent,
    NewClientMessageComponent,
    SkillsListComponent,
    DeleteSkillDialogComponent,
    NewSkillMessageComponent,
    ConsultantsDeleteTeamleaderDialogComponent,
    ProfileConsultantsComponent,
    SecurityConsultantsComponent,
    ConsultantsUpdatePersonalDataDialogComponent,
    NewPasswordMessageConsultantsComponent,
    EqualValidatorConsultantDirective,
    DataClientsComponent,
    SecurityClientsComponent,
    ClientsUpdatePersonalDataDialogComponent,
    NewPasswordMessageClientsComponent,
    EqualValidatorClientsDirective,
    CreateNewCompanyComponent,
    ConsultantCompaniesListComponent,
    NewCompanyMessageComponent,
    CreateNewClientCompanyComponent,
    ClientCompaniesListComponent,
    NewClientCompanyMessageComponent,
    DeleteClientCompanyDialogComponent,
    DeleteCompanyDialogComponent,
    ConsultantsUpdateImageDialogComponent,
    ProjectsConsultantsComponent,
    ProjectsListComponent,
    CreateNewProjectComponent,
    NewProposedProjectMessageComponent,
    DeleteProjectDialogComponent,
    GrantAccessDialogComponent,
    AddConsultantsDialogComponent,
    RemoveConsultantsDialogComponent,
    RemoveAccessDialogComponent,
    TransformProjectDialogComponent,
    AcceptedProjectsListComponent,
    AddConsultantsDialogAcceptedComponent,
    DeleteProjectDialogAcceptedComponent,
    GrantAccessDialogAcceptedComponent,
    RemoveAccessDialogAcceptedComponent,
    RemoveConsultantsDialogAcceptedComponent,
    TeamMembersConsultantsComponent,
    ViewTeamMemberProfileComponent,
    ViewProjectDescriptionComponent,
    ProposedProjectsClientsComponent,
    ViewProposedConsultantProfileComponent,
    AcceptedProjectsClientsComponent,
    ViewAcceptedConsultantProfileComponent,
    AddSkillsDialogComponent,
    AddProjectDialogComponent,
    AdminConsultantComponent,
    AdminClientComponent,
    DataAdminConsultantComponent,
    AdminConsultantUpdatePersonalDataDialogComponent,
    SecurityAdminConsultantComponent,
    NewPasswordMessageAdminConsultantComponent,
    EqualValidatorAdminConsultantDirective,
    AdminNetworkComponent,
    ConsultantAdministratorsComponent,
    ClientAdministratorsComponent,
    ConsultantAdministratorsListComponent,
    CreateNewConsultantAdministratorComponent,
    DeleteConsultantAdministratorDialogComponent,
    NewConsultantAdministratorMessageComponent,
    DataAdminClientComponent,
    SecurityAdminClientComponent,
    AdminClientUpdatePersonalDataDialogComponent,
    NewPasswordMessageAdminClientComponent,
    EqualValidatorAdminClientDirective,
    ClientAdministratorsListComponent,
    DeleteClientAdministratorDialogComponent,
    CreateNewClientAdministratorComponent,
    NewClientAdministratorMessageComponent,
    AccountSetUpMessageComponent,
    ActivityLogComponent,
    ActivityLogClientsComponent,
    ViewAcceptedConsultantProfileFirstTabComponent,
    ViewProposedConsultantProfileFirstTabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase, {timestampsInSnapshots: true}),
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DataService,
    AuthService,
    ConsultantCompanyService,
    ClientCompanyService,
    SkillService,
    SkillUpdateService,
    ConsultantService,
    ConsultantUpdateService,
    ClientService,
    ClientUpdateService,
    UpdateMasterDataOfConsultantService,
    ConsultantsUpdatePersonalDataService,
    RemoveTeamleaderFromConsultantService,
    UpdateMasterDataOfClientService,
    ClientsUpdatePersonalDataService,
    UpdateImageOfConsultantService,
    QueriesService,
    ProposedProjectService,
    ProposedProjectUpdateService,
    AddToConsultantsOfProposedProjectService,
    RemoveFromConsultantsOfProposedProjectService,
    AddToProposedProjectsOfClientService,
    RemoveFromProposedProjectsOfClientService,
    AddToAcceptedProjectsOfClientService,
    AcceptedProjectService,
    AcceptedProjectUpdateService,
    AddToConsultantsOfAcceptedProjectService,
    RemoveFromAcceptedProjectsOfClientService,
    RemoveFromConsultantsOfAcceptedProjectService,
    AddToReadableConsultantsOfClientService,
    AddTeamleaderWithGivenEmailToConsultantService,
    UpdateSkillsOfConsultantService,
    SkillsUpdateClientService,
    ProjectService,
    ProjectsUpdateClientService,
    UpdateProjectsOfConsultantService,
    ConsultantAdministratorService,
    ConsultantAdministratorUpdateService,
    AdminConsultantUpdatePersonalDataService,
    UpdateMasterDataOfConsultantAdministratorService,
    ClientAdministratorService,
    UpdateMasterDataOfClientAdministratorService,
    AdminClientUpdatePersonalDataService,
    ClientAdministratorUpdateService,
    RemoveFromReadableConsultantsOfClientService,
    RemoveFromWritableConsultantsOfClientService,
    AddToWritableConsultantsOfClientService,
    UIService,
    UIWindowService,
    AddLogItemToConsultantService,
    ConsultantSelectedService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewConsultantMessageComponent, 
    DeleteConsultantDialogComponent,
    NewClientMessageComponent,
    DeleteClientDialogComponent,
    NewSkillMessageComponent, 
    DeleteSkillDialogComponent,
    ConsultantsDeleteTeamleaderDialogComponent,
    ConsultantsUpdatePersonalDataDialogComponent,
    NewPasswordMessageConsultantsComponent,
    ClientsUpdatePersonalDataDialogComponent,
    NewPasswordMessageClientsComponent,
    NewCompanyMessageComponent,
    DeleteClientCompanyDialogComponent,
    DeleteCompanyDialogComponent,
    NewClientCompanyMessageComponent,
    ConsultantsUpdateImageDialogComponent,
    DeleteProjectDialogComponent,
    NewProposedProjectMessageComponent,
    AddConsultantsDialogComponent,
    GrantAccessDialogComponent,
    RemoveConsultantsDialogComponent,
    RemoveAccessDialogComponent,
    TransformProjectDialogComponent,
    AddConsultantsDialogAcceptedComponent,
    DeleteProjectDialogAcceptedComponent,
    GrantAccessDialogAcceptedComponent,
    RemoveAccessDialogAcceptedComponent,
    RemoveConsultantsDialogAcceptedComponent,
    ViewTeamMemberProfileComponent,
    ViewProjectDescriptionComponent,
    ViewProposedConsultantProfileComponent,
    ViewAcceptedConsultantProfileComponent,
    AddSkillsDialogComponent,
    AddProjectDialogComponent,
    AdminConsultantUpdatePersonalDataDialogComponent,
    NewPasswordMessageAdminConsultantComponent,
    DeleteConsultantAdministratorDialogComponent,
    NewConsultantAdministratorMessageComponent,
    AdminClientUpdatePersonalDataDialogComponent,
    NewPasswordMessageAdminClientComponent,
    DeleteClientAdministratorDialogComponent,
    NewClientAdministratorMessageComponent,
    AccountSetUpMessageComponent
  ]
})
export class AppModule { }
