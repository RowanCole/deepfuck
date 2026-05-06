// import dify_api from './axios'

// let buffer = "";
// let think = "";
// let isThink = true;



// export const chatMessages = async (message, func) => {
//     return dify_api.post('/chat-messages', {
//         query: message,
//         user: "local-user",
//         response_mode: "streaming",
//         inputs: {},
//         files: []
//     }, {
//         onDownloadProgress: (data) => {

//             const response = data.event.target.response

//             const strMessages = response.split('\n')
//             for (let line of strMessages) {
//                 if (line.startsWith("data: ")) {
//                     const jsonStr = line.replace("data: ","").trim()
//                     const json = JSON.parse(jsonStr)
//                     if(json.event != "message") continue
//                     const answer = json.answer

//                     // if(answer.indexOf("</think>") != -1){
//                     //     isThink = false
//                     //     const fuck = answer.split("</think>")
//                     //     buffer = fuck.length == 1 ? "" : fuck[1]

//                     //     continue
//                     // }
//                     // if(isThink){
//                     //     think = think + answer
//                     //     continue
//                     // }
//                     console.log("answer:"+answer)
//                     func(answer)
//                 }
//             }


//         }
//     })
// }


const api_key = import.meta.env.VITE_DIFY_API_KEY

export const chatMessages = (message) => {
       return fetch("/dify/chat-messages", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + api_key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: message,
            user: "local-user",
            response_mode: "streaming",
            inputs: {},
            files: []
        })
    })
}



