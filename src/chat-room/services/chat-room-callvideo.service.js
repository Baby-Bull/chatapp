const USer = require("../../user/entities/user");
const { userRepository } = require("../../user/repositories/user.repository");

const call = (sender_id, receiver_id) => {
    const receiver = new userRepository.findOneByOption({ _id: receiver_id });
    if (receiver) 
        var callerWs = null;
    else {
        return "User not found."
    }

}

const incomingCallResponse = ()=>{
    
} 