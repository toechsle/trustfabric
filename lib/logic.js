'use strict';


/**
 * transaction UpdateMasterDataOfClientAdministrator
 * @param {org.ifb.trustfabric.UpdateMasterDataOfClientAdministrator} transaction
 * @transaction
 */
async function updateMasterDataOfClientAdministrator(transaction) {
    
    // Save the old version of the administrator:
    const administratorOld = transaction.administrator;

    // Update the administrator with the new values:
    transaction.administrator.firstName = transaction.newFirstName;    
    transaction.administrator.lastName = transaction.newLastName;    
    transaction.administrator.email = transaction.newEmail;

    // Get the participant registry containing the client administrators:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.ClientAdministrator');
    
    // Update the administrator in the participant registry:
    await participantRegistry.update(transaction.administrator);

    // Emit an event for the modified administrator:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientAdministratorUpdated');
    event.administratorOld = administratorOld;
    event.administratorNew = transaction.administrator;
    emit(event);

}


/**
 * transaction UpdateMasterDataOfConsultantAdministrator
 * @param {org.ifb.trustfabric.UpdateMasterDataOfConsultantAdministrator} transaction
 * @transaction
 */
async function updateMasterDataOfConsultantAdministrator(transaction) {
    
    // Save the old version of the administrator:
    const administratorOld = transaction.administrator;

    // Update the administrator with the new values:
    transaction.administrator.firstName = transaction.newFirstName;    
    transaction.administrator.lastName = transaction.newLastName;    
    transaction.administrator.email = transaction.newEmail;

    // Get the participant registry containing the consultant administrators:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.ConsultantAdministrator');
    
    // Update the administrator in the participant registry:
    await participantRegistry.update(transaction.administrator);

    // Emit an event for the modified administrator:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantAdministratorUpdated');
    event.administratorOld = administratorOld;
    event.administratorNew = transaction.administrator;
    emit(event);

}


/**
 * transaction UpdateMasterDataOfClient
 * @param {org.ifb.trustfabric.UpdateMasterDataOfClient} transaction
 * @transaction
 */
async function updateMasterDataOfClient(transaction) {
    
    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with the new values:
    transaction.client.firstName = transaction.newFirstName;    
    transaction.client.lastName = transaction.newLastName;    
    transaction.client.email = transaction.newEmail;
    transaction.client.company = transaction.newCompany;
    transaction.client.position = transaction.newPosition;
  
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
 * transaction AddToReadableConsultantsOfClient
 * @param {org.ifb.trustfabric.AddToReadableConsultantsOfClient} transaction
 * @transaction
 */
async function addToReadableConsultantsOfClient(transaction) {
    
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    if (transactionCreator.getFullyQualifiedType() == 'org.ifb.trustfabric.Consultant') {
        const registryConsultants = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
        for (consultantRef of transaction.newReadableConsultants) {
            let consultantId = consultantRef.getIdentifier();
            if (consultantId == transactionCreator.getIdentifier()) {
                continue;
            } 
            let consultant = await registryConsultants.get(consultantId);
            if (consultant.teamleaders) {
                if (!containsElement(consultant.teamleaders, transactionCreator)) {
                    throw new Error('Teamleaders can do this for members of their team only!');
                }             
            }
            else {
                throw new Error('Teamleaders can do this for members of their team only!');
            }       
        }
    }
    else {
        throw new Error('Access control rules prevent you from submitting this transaction!');
    }

   // Save the old version of the client:
   const clientOld = transaction.client;

   // Update the client with the new readableConsultants:
   if (!transaction.client.readableConsultants) {
       transaction.client.readableConsultants = transaction.newReadableConsultants;    
   }
   else {
       transaction.client.readableConsultants = transaction.client.readableConsultants.concat(transaction.newReadableConsultants);    
   }
 
   // Get the participant registry containing the clients:
   const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
   
   // Update the client in the participant registry:
   await participantRegistry.update(transaction.client);

   // Emit an event for the modified client:
   let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
   event.clientOld = clientOld;
   event.clientNew = transaction.client;
   emit(event);

}


/**
* transaction RemoveFromReadableConsultantsOfClient
* @param {org.ifb.trustfabric.RemoveFromReadableConsultantsOfClient} transaction
* @transaction
*/
async function removeFromReadableConsultantsOfClient(transaction) {

   // Save the old version of the client:
   const clientOld = transaction.client;

   // Update the client with respect to the readableConsultants:
   const consultantsToBeRemoved = transaction.readableConsultantsToBeRemoved
   for (consultantToBeRemoved of consultantsToBeRemoved) {
        remove(transaction.client.readableConsultants, consultantToBeRemoved);
   }

   // Get the participant registry containing the clients:
   const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
   
   // Update the client in the participant registry:
   await participantRegistry.update(transaction.client);

   // Emit an event for the modified client:
   let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
   event.clientOld = clientOld;
   event.clientNew = transaction.client;
   emit(event);

}


/**
* transaction AddToWritableConsultantsOfClient
* @param {org.ifb.trustfabric.AddToWritableConsultantsOfClient} transaction
* @transaction
*/
async function addToWritableConsultantsOfClient(transaction) {
   
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    if (transactionCreator.getFullyQualifiedType() == 'org.ifb.trustfabric.Consultant') {
        const registryConsultants = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
        for (consultantRef of transaction.newWritableConsultants) {
            let consultantId = consultantRef.getIdentifier();
            if (consultantId == transactionCreator.getIdentifier()) {
                continue;
            } 
            let consultant = await registryConsultants.get(consultantId);
            if (consultant.teamleaders) {
                if (!containsElement(consultant.teamleaders, transactionCreator)) {
                    throw new Error('Teamleaders can do this for members of their team only!');
                }             
            }
            else {
                throw new Error('Teamleaders can do this for members of their team only!');
            }       
        }
    }
    else {
        throw new Error('Access control rules prevent you from submitting this transaction!');
    }
 
    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with the new writableConsultants:
    if (!transaction.client.writableConsultants) {
        transaction.client.writableConsultants = transaction.newWritableConsultants;    
    }
    else {
        transaction.client.writableConsultants = transaction.client.writableConsultants.concat(transaction.newWritableConsultants);    
    }
    
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
* transaction RemoveFromWritableConsultantsOfClient
* @param {org.ifb.trustfabric.RemoveFromWritableConsultantsOfClient} transaction
* @transaction
*/
async function removeFromWritableConsultantsOfClient(transaction) {

   // Save the old version of the client:
   const clientOld = transaction.client;

   // Update the client with respect to the writableConsultants:
   const consultantsToBeRemoved = transaction.writableConsultantsToBeRemoved
   for (consultantToBeRemoved of consultantsToBeRemoved) {
        remove(transaction.client.writableConsultants, consultantToBeRemoved);
   }
  
   // Get the participant registry containing the clients:
   const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
   
   // Update the client in the participant registry:
   await participantRegistry.update(transaction.client);

   // Emit an event for the modified client:
   let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
   event.clientOld = clientOld;
   event.clientNew = transaction.client;
   emit(event);

}


/**
 * transaction AddToProposedProjectsOfClient
 * @param {org.ifb.trustfabric.AddToProposedProjectsOfClient} transaction
 * @transaction
 */
async function addToProposedProjectsOfClient(transaction) {
    
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const transactionCreatorIdentifier = transactionCreator.getIdentifier();
    const registryProjects = await getAssetRegistry('org.ifb.trustfabric.ProposedProject');
    for (proposedProjectRef of transaction.newProposedProjects) {
        let proposedProjectId = proposedProjectRef.getIdentifier();
        let proposedProject = await registryProjects.get(proposedProjectId);
        if (proposedProject.projectLeader.getIdentifier() !== transactionCreatorIdentifier) {
            throw new Error('Only the project owner can submit this transaction!');
        }             
    }

    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with the new proposed projects:
    if (!transaction.client.proposedProjects) {
        transaction.client.proposedProjects = transaction.newProposedProjects;    
    }
    else {
        transaction.client.proposedProjects = transaction.client.proposedProjects.concat(transaction.newProposedProjects);    
    }
  
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
 * transaction RemoveFromProposedProjectsOfClient
 * @param {org.ifb.trustfabric.RemoveFromProposedProjectsOfClient} transaction
 * @transaction
 */
async function removeFromProposedProjectsOfClient(transaction) {

    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const transactionCreatorIdentifier = transactionCreator.getIdentifier();
    const registryProjects = await getAssetRegistry('org.ifb.trustfabric.ProposedProject');

    let projectRef = transaction.proposedProjectToBeRemoved;
    let projectId = projectRef.getIdentifier();
    let project = await registryProjects.get(projectId);
    if (project.projectLeader.getIdentifier() !== transactionCreatorIdentifier) {
        throw new Error('Only the project owner can submit this transaction!');
    }

    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with respect to the proposed projects:
    const proposedProjectToBeRemoved = transaction.proposedProjectToBeRemoved;
    remove(transaction.client.proposedProjects, proposedProjectToBeRemoved);
  
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
 * transaction AddToAcceptedProjectsOfClient
 * @param {org.ifb.trustfabric.AddToAcceptedProjectsOfClient} transaction
 * @transaction
 */
async function addToAcceptedProjectsOfClient(transaction) {
    
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const transactionCreatorIdentifier = transactionCreator.getIdentifier();
    const registryProjects = await getAssetRegistry('org.ifb.trustfabric.AcceptedProject');
    for (acceptedProjectRef of transaction.newAcceptedProjects) {
        let acceptedProjectId = acceptedProjectRef.getIdentifier();
        let acceptedProject = await registryProjects.get(acceptedProjectId);
        if (acceptedProject.projectLeader.getIdentifier() !== transactionCreatorIdentifier) {
            throw new Error('Only the project owner can submit this transaction!');
        }             
    }

    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with the new accepted projects:
    if (!transaction.client.acceptedProjects) {
        transaction.client.acceptedProjects = transaction.newAcceptedProjects;    
    }
    else {
        transaction.client.acceptedProjects = transaction.client.acceptedProjects.concat(transaction.newAcceptedProjects);    
    }
  
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
 * transaction RemoveFromAcceptedProjectsOfClient
 * @param {org.ifb.trustfabric.RemoveFromAcceptedProjectsOfClient} transaction
 * @transaction
 */
async function removeFromAcceptedProjectsOfClient(transaction) {

    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const transactionCreatorIdentifier = transactionCreator.getIdentifier();
    const registryProjects = await getAssetRegistry('org.ifb.trustfabric.AcceptedProject');

    let projectRef = transaction.acceptedProjectToBeRemoved;
    let projectId = projectRef.getIdentifier();
    let project = await registryProjects.get(projectId);
    if (project.projectLeader.getIdentifier() !== transactionCreatorIdentifier) {
        throw new Error('Only the project owner can submit this transaction!');
    }
 
    // Save the old version of the client:
    const clientOld = transaction.client;

    // Update the client with respect to the accepted projects:
    const acceptedProjectToBeRemoved = transaction.acceptedProjectToBeRemoved;
    remove(transaction.client.acceptedProjects, acceptedProjectToBeRemoved);
  
    // Get the participant registry containing the clients:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Client');
    
    // Update the client in the participant registry:
    await participantRegistry.update(transaction.client);

    // Emit an event for the modified client:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ClientUpdated');
    event.clientOld = clientOld;
    event.clientNew = transaction.client;
    emit(event);

}


/**
 * transaction UpdateMasterDataOfConsultant
 * @param {org.ifb.trustfabric.UpdateMasterDataOfConsultant} transaction
 * @transaction
 */
async function updateMasterDataOfConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with the new values:
    transaction.consultant.firstName = transaction.newFirstName;    
    transaction.consultant.lastName = transaction.newLastName;    
    transaction.consultant.email = transaction.newEmail;
    transaction.consultant.company = transaction.newCompany;
    transaction.consultant.position = transaction.newPosition;

    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);

}


/**
 * transaction UpdateImageOfConsultant
 * @param {org.ifb.trustfabric.UpdateImageOfConsultant} transaction
 * @transaction
 */
async function updateImageOfConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with the new image:
    transaction.consultant.image = transaction.newImage;    

    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);

}


/**
 * transaction AddTeamleaderWithGivenEmailToConsultant
 * @param {org.ifb.trustfabric.AddTeamleaderWithGivenEmailToConsultant} transaction
 * @transaction
 */
async function addTeamleaderWithGivenEmailToConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;
    
    // Get the email of the consultant to be added as teamleader:
    const emailOfTeamleader = transaction.email;
    
    // Get the id of the consultant with the email address:
    const teamleaders = await query('selectConsultantsByEmail', {
        "email": emailOfTeamleader    
    });

    const factory = getFactory();
    let teamleaderString = factory.newRelationship('org.ifb.trustfabric', 'Consultant', teamleaders[0].id);

    // Update the consultant with the new teamleader:
    if (!transaction.consultant.teamleaders) {
        transaction.consultant.teamleaders = [teamleaderString];
    }
    else {
        transaction.consultant.teamleaders = transaction.consultant.teamleaders.concat(teamleaderString);
    }  

    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);

}


/**
 * transaction RemoveTeamleaderFromConsultant
 * @param {org.ifb.trustfabric.RemoveTeamleaderFromConsultant} transaction
 * @transaction
 */
async function removeTeamleaderFromConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with respect to the teamleaders:
    remove(transaction.consultant.teamleaders, transaction.teamleaderToBeRemoved);
       
    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);


}


/**
 * transaction UpdateSkillsOfConsultant
 * @param {org.ifb.trustfabric.UpdateSkillsOfConsultant} transaction
 * @transaction
 */
async function updateSkillsOfConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with the new skills:
    const existingSkills = consultantOld.skills;
    for (newSkill of transaction.newSkills) {
        let existingSkill = findSkill(existingSkills, newSkill.name);
        if (existingSkill == null) {
          	if (!transaction.consultant.skills) {
        		transaction.consultant.skills = [newSkill];
    		}
    		else {
        		transaction.consultant.skills = transaction.consultant.skills.concat(newSkill);
    		}  
        }
        else {
            if (newSkill.proficiency == "Beginner") {
                //do nothing
            }
            else if (newSkill.proficiency == "Intermediate") {
                if (existingSkill.proficiency == "Beginner") {
                    if (!transaction.consultant.skills) {
        				transaction.consultant.skills = [newSkill];
    				}
    				else {
        				transaction.consultant.skills = transaction.consultant.skills.concat(newSkill);
    				}  
                    remove(transaction.consultant.skills, existingSkill);
                }
            }
            else {
                if (existingSkill.proficiency == "Beginner" || existingSkill.proficiency == "Intermediate") {
                    if (!transaction.consultant.skills) {
        				transaction.consultant.skills = [newSkill];
    				}
    				else {
        				transaction.consultant.skills = transaction.consultant.skills.concat(newSkill);
    				}  
                    remove(transaction.consultant.skills, existingSkill);
                }
            }
        }
    }   
  
    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);

    
}


/**
 * transaction UpdateProjectsOfConsultant
 * @param {org.ifb.trustfabric.UpdateProjectsOfConsultant} transaction
 * @transaction
 */
async function updateProjectsOfConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with the new project:
    if (!transaction.consultant.projects) {
        transaction.consultant.projects = transaction.newProject;
    }
    else {
        transaction.consultant.projects = transaction.consultant.projects.concat(transaction.newProject);
    }     
  
    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);


}


/**
 * transaction AddLogItemToConsultant
 * @param {org.ifb.trustfabric.AddLogItemToConsultant} transaction
 * @transaction
 */
async function addLogItemToConsultant(transaction) {
    
    // Save the old version of the consultant:
    const consultantOld = transaction.consultant;

    // Update the consultant with the new log item:
    if (!transaction.consultant.logItems) {
        transaction.consultant.logItems = transaction.logItem;
    }
    else {
        transaction.consultant.logItems = transaction.consultant.logItems.concat(transaction.logItem);
    }     
  
    // Get the participant registry containing the consultants:
    const participantRegistry = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    
    // Update the consultant in the participant registry:
    await participantRegistry.update(transaction.consultant);

    // Emit an event for the modified consultant:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ConsultantUpdated');
    event.consultantOld = consultantOld;
    event.consultantNew = transaction.consultant;
    emit(event);


}


/**
 * transaction AddToConsultantsOfProposedProject
 * @param {org.ifb.trustfabric.AddToConsultantsOfProposedProject} transaction
 * @transaction
 */
async function addToConsultantsOfProposedProject(transaction) {
    
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const registryConsultants = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    for (consultantRef of transaction.newConsultants) {
        let consultantId = consultantRef.getIdentifier();
        if (consultantId == transactionCreator.getIdentifier()) {
            continue;
        } 
        let consultant = await registryConsultants.get(consultantId);
        if (consultant.teamleaders) {
            if (!containsElement(consultant.teamleaders, transactionCreator)) {
                throw new Error('Teamleaders can do this for members of their team only!');
            }             
        }
        else {
            throw new Error('Teamleaders can do this for members of their team only!');
        }           
    }
    
    // Save the old version of the proposed project:
    const proposedProjectOld = transaction.proposedProject;

    // Update the proposed project with the new consultants:
    if (!transaction.proposedProject.consultants) {
        transaction.proposedProject.consultants = transaction.newConsultants;    
    }
    else {
        transaction.proposedProject.consultants = transaction.proposedProject.consultants.concat(transaction.newConsultants);    
    }
    
    // Get the asset registry containing the proposed projects:
    const assetRegistry = await getAssetRegistry('org.ifb.trustfabric.ProposedProject');
    
    // Update the proposed project in the asset registry:
    await assetRegistry.update(transaction.proposedProject);

    // Emit an event for the modified proposed project:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ProposedProjectUpdated');
    event.proposedProjectOld = proposedProjectOld;
    event.proposedProjectNew = transaction.proposedProject;
    emit(event);

}


/**
 * transaction RemoveFromConsultantsOfProposedProject
 * @param {org.ifb.trustfabric.RemoveFromConsultantsOfProposedProject} transaction
 * @transaction
 */
async function removeFromConsultantsOfProposedProject(transaction) {
    
    // Save the old version of the proposed project:
    const proposedProjectOld = transaction.proposedProject;

    // Update the proposed project with respect to the consultants:
    const consultantsToBeRemoved = transaction.consultantsToBeRemoved;
    for (consultantToBeRemoved of consultantsToBeRemoved) {
        remove(transaction.proposedProject.consultants, consultantToBeRemoved);
    }
    
    // Get the asset registry containing the proposed projects:
    const assetRegistry = await getAssetRegistry('org.ifb.trustfabric.ProposedProject');
    
    // Update the proposed project in the asset registry:
    await assetRegistry.update(transaction.proposedProject);

    // Emit an event for the modified proposed project:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'ProposedProjectUpdated');
    event.proposedProjectOld = proposedProjectOld;
    event.proposedProjectNew = transaction.proposedProject;
    emit(event);

}


/**
 * transaction AddToConsultantsOfAcceptedProject
 * @param {org.ifb.trustfabric.AddToConsultantsOfAcceptedProject} transaction
 * @transaction
 */
async function addToConsultantsOfAcceptedProject(transaction) {
    
    // Programmatic Access Control:
    const transactionCreator = getCurrentParticipant();
    const registryConsultants = await getParticipantRegistry('org.ifb.trustfabric.Consultant');
    for (consultantRef of transaction.newConsultants) {
        let consultantId = consultantRef.getIdentifier();
        if (consultantId == transactionCreator.getIdentifier()) {
            continue;
        } 
        let consultant = await registryConsultants.get(consultantId);
        if (consultant.teamleaders) {
            if (!containsElement(consultant.teamleaders, transactionCreator)) {
                throw new Error('Teamleaders can do this for members of their team only!');
            }             
        }
        else {
            throw new Error('Teamleaders can do this for members of their team only!');
        }         
    }
    
    // Save the old version of the accepted project:
    const acceptedProjectOld = transaction.acceptedProject;

    // Update the accepted project with the new consultants:
    if (!transaction.acceptedProject.consultants) {
        transaction.acceptedProject.consultants = transaction.newConsultants;    
    }
    else {
        transaction.acceptedProject.consultants = transaction.acceptedProject.consultants.concat(transaction.newConsultants);    
    }
    
    // Get the asset registry containing the accepted projects:
    const assetRegistry = await getAssetRegistry('org.ifb.trustfabric.AcceptedProject');
    
    // Update the accepted project in the asset registry:
    await assetRegistry.update(transaction.acceptedProject);

    // Emit an event for the modified accepted project:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'AcceptedProjectUpdated');
    event.acceptedProjectOld = acceptedProjectOld;
    event.acceptedProjectNew = transaction.acceptedProject;
    emit(event);

}


/**
 * transaction RemoveFromConsultantsOfAcceptedProject
 * @param {org.ifb.trustfabric.RemoveFromConsultantsOfAcceptedProject} transaction
 * @transaction
 */
async function removeFromConsultantsOfAcceptedProject(transaction) {
    
    // Save the old version of the accepted project:
    const acceptedProjectOld = transaction.acceptedProject;

    // Update the accepted project with respect to the consultants:
    const consultantsToBeRemoved = transaction.consultantsToBeRemoved;
    for (consultantToBeRemoved of consultantsToBeRemoved) {
        remove(transaction.acceptedProject.consultants, consultantToBeRemoved);
    }
    
    // Get the asset registry containing the accepted projects:
    const assetRegistry = await getAssetRegistry('org.ifb.trustfabric.AcceptedProject');
    
    // Update the accepted project in the asset registry:
    await assetRegistry.update(transaction.acceptedProject);

    // Emit an event for the modified accepted project:
    let event = getFactory().newEvent('org.ifb.trustfabric', 'AcceptedProjectUpdated');
    event.acceptedProjectOld = acceptedProjectOld;
    event.acceptedProjectNew = transaction.acceptedProject;
    emit(event);

}




//helper functions:

function findSkill(array, name) {
    if(array) {
        for (let i=0; i<array.length; i++) {
            if (array[i].name == name) {
                return array[i];
            }
        }
    }
    return null;
}

function containsElement(array, element) {
    for (let i=0; i<array.length; i++) {
        if (array[i].getIdentifier() == element.getIdentifier()) {
            return true;
        }
    }
    return false;
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}




