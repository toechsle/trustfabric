# trustfabric

Using Blockchain Technology to Create a System for Verifying Experience and Know-how of Consultants

1. Install the pre-requisites: https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html
2. Install the development environment: https://hyperledger.github.io/composer/latest/installing/development-tools.html
3. Enable authentication for the REST server using passport-github: https://hyperledger.github.io/composer/v0.19/integrating/enabling-rest-authentication
   -> Application name: trustfabric
   -> Homepage URL: http://localhost:3000/
   -> Authorization callback URL: http://localhost:3000/auth/github/callback
4. Configure Firebase
   -> Go to https://console.firebase.google.com/u/0/project/_/overview and create a new Firebase project.
   -> Under Database -> Data click on "Start collection" to create a new collection with Collection ID "users". 
   -> Under Project Overview -> Project Settings -> General -> Your Apps click on the </> button to create a web app. Replace the placeholder values in file dist/angular-app/src/environments/environment.ts with the values displayed.
   -> Replace the placeholder value "YourProjectId" in file dist/angular-app/.firebaserc with the project ID (i.e. the value for key "default" in file .firebaserc equals the value for key "projectId" in file environment.ts).
   -> Install the Firebase CLI (see https://firebase.google.com/docs/functions/get-started).
   -> In folder dist/angular-app/functions run the following command to deploy the Cloud Function resizeImage(): 
      firebase deploy --only functions
5. Run the following commands in order to start Hyperledger Fabric and deploy the application trustfabric on it:

   -> in folder "fabric-dev-servers" run the following commands:
   
   ./startFabric.sh
   ./createPeerAdminCard.sh
   

   -> in folder "dist" run the following commands: 
   
   composer network install --archiveFile trustfabric-perfect@0.0.35.bna --card PeerAdmin@hlfv1
   
   composer network start --networkName trustfabric-perfect --networkVersion 0.0.35 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw 
   
   composer card import -f admin@trustfabric-perfect.card
   
   -> in folder "dist" paste the following into the terminal, then press 'Enter': 
   
   export COMPOSER_PROVIDERS='{
     "github": {
       "provider": "github",
       "module": "passport-github",
       "clientID": "YourClientID (see step 3 above)",
       "clientSecret": "YourClientSecret (see step 3 above)",
       "authPath": "/auth/github",
       "callbackURL": "/auth/github/callback",
       "successRedirect": "http://localhost:4200?authenticated=true",
       "failureRedirect": "/"
     }
   }'
   
   
   -> in folder "dist" run the following commands: 
   
   composer-rest-server -c admin@trustfabric-perfect -m true
   
   -> ... in a new terminal window:
   
   composer card export -c admin@trustfabric-perfect -f admin-plus-cert.card
   
   
   -> in browser window go to the following address to authenticate: http://localhost:3000/auth/github
   (Sign in to your GitHub account. Since the application has not been started yet, a message will appear informing you that a connection to the server at localhost:4200 was not possible.)
   
   -> in browser window go to the following address: http://localhost:3000
   -> click on "Wallet: Business network cards for the authenticated user"
   -> click on "POST /wallet/import"
   -> import file "admin-plus-cert.card" from folder "dist"
   
   
   -> in folder "dist/angular-app" run the following command to start trustfabric at http://localhost:4200: 
   
   npm start


******************************************************************************************************************************************************
For a video presentation of the application see files trustfabric_video_1.mov, trustfabric_video_2.mov, trustfabric_video_3.mov, trustfabric_video_4.mov, trustfabric_video_5.mov and trustfabric_video_6.mov. 


