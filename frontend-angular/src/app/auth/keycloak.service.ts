import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://devops.local/auth',//'http://localhost:8081',
  realm: 'devops-realm',
  clientId: 'angular-client'
});

export default keycloak;


