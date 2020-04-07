//const list = [];
const Model = require('./model');

//mongodb+srv://user:user1234@cluster0-uxxfr.mongodb.net/test?retryWrites=true&w=majority

function addMessage(message) {
    //list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser) {
    //return list;
    return new Promise((resolve, reject) => {
        let filter = {};
        if  (filterUser !== null) {
            filter = { user: filterUser }
        } 
        const messages = Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            })
            /*.catch(e => {
                reject(e)
            });*/ //Por el parseo de errores del exec ya no se ocupa
        //resolve(messages);
    })
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    })
}

module.exports ={
    add: addMessage,
    list: getMessages,
    update: updateText,
    remove: removeMessage,
}