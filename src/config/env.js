import { IP_COMPUTER } from '@env';

const devEnvironmentVariables = {
    IP_COMPUTER
}

const proEnvironmentVariables = {
    
}

export default __DEV__?devEnvironmentVariables:proEnvironmentVariables