// These are the function body that will be called by the API service
import {generateRandomUrl,generateRandomId,generateRandomName,getRandomStatus} from '../helpers/utils'
// Function to generate the request body for creating a new pet
const photoUrls = generateRandomUrl();
    const id = generateRandomId();
    const name = generateRandomName();
    const status = getRandomStatus();
export function constructNewPetRequestBody() {
    // const photoUrls = generateRandomUrl();
    // const id = generateRandomId();
    // const name = generateRandomName();
    // const status = getRandomStatus();
    return {
      id: id,
      category: {
        id: id,
        name: name
      },
      name: name,
      photoUrls: [photoUrls],
      tags: [{
        id: id,
        name: name
      }],
      status: status
    };
  }

  export function constructPetRequest() {
    // const id = generateRandomId();
    // const name = generateRandomName();
    // const status = getRandomStatus();
    return {
        petId : id,
        name: name,
        status: status
    };
  }

  export function constructPetInvalidRequest() {
    // const status = getRandomStatus();
    return [
        {}, 
        { status:status } 
    ];
  }
  