let Telegram = require('telegram-bot-api')
let TelegramBot = require('node-telegram-bot-api')
let bot = new TelegramBot("997016886:AAHuAZuDRoLgediIaZz8gXNe2m1LqNpXKpw", {polling: true})

 
bot.on('message', msg=>{
    console.log(msg)
    switch(msg.text){
        case '/start start':
            bot.sendMessage(msg.chat.id,"Welcome to DAIWallet_bot",{reply_markup:{ keyboard: [
                [
                    {
                        text: 'Send To Telegram User',
                    },
                    {
                        text: 'Send to ETH Address',
                    }
                ],
                [
                    {
                        text: 'Check Balance',
                    }
                ]
            ],one_time_keyboard: true,
            resize_keyboard: true}
        })
            break;
        
        case 'Send To Telegram User':
            bot.sendMessage(msg.chat.id,"Enter receiver's Telegram userName. example: @HarryPotter")/*, {reply_markup:{ keyboard: [
                [
                    {
                        text: 'Send To Telegram User',
                    }
                ],
                [
                    {
                        text: 'Check Balance',
                    }
                ]
            ],one_time_keyboard: true,
            resize_keyboard: true}
        } )*/
        break;

      
    }
    if( msg.entities != undefined && msg.entities[0].type == "mention"){
        bot.sendMessage(msg.chat.id,"Enter the Amount to Send and click send")
    }
})

bot.on('inline_query', (msg) => {
    let query = encodeURIComponent(msg.query.trim());
    console.log(msg)

    //bot.getChatMember(msg.id, msg.from.id).then(console.log)
   /*  bot.sendMessage(msg.id,"test",{"reply_markup": {
        "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
        }
    }) */
    bot.answerInlineQuery(msg.id, [{
        type: 'article', //change it to show qr
        id: msg.from.id+"ReceiveDai"+new Date().getTime(),// + '_google',
        title: 'Receive DAI',
        input_message_content: {
            message_text: ' TO receive DAI, share your userName with your friends. \n userName: @'+ msg.from.username,
        },
        //reply_markup: inlineKeyboard,
    },
    {
        type: 'article',
        id:  msg.from.id+"RequestDai"+new Date().getTime(),
        title: 'Request DAI',
        input_message_content: {
            message_text: msg.from.username + 'is requesting Funds. \n Send Dai to @' + msg.from.username,
        }
    }],{
        switch_pm_text :"Send DAI",
        switch_pm_parameter:"start"
    });
}); 


// let telegramApi = new Telegram({
//     token: "997016886:AAHuAZuDRoLgediIaZz8gXNe2m1LqNpXKpw",
//     updates:{
//         enabled: true
//     }
// })

// telegramApi.getMe().then(console.log)

// telegramApi.on('inline.query', message=>{
//     console.log(message)
//     if(message.query == "send"){
//         telegramApi.answerInlineQuery(
//              message.id,
//             [{
//                 type: 'article',
//                 id: "query1" + '_google',
//                 title: 'Google',
//                 input_message_content: {
//                     message_text: '12',// + query,
//                 },
//                 reply_markup: JSON.stringify(inlineKeyboard),
//                 notify:15
//             },
//             {
//                 type: 'article',
//                 id: "query" + '_bing',
//                 title: 'Bing',
//                 input_message_content: {
//                     message_text: '23',// + query,
//                 }
//             },
//             {
//                 type: 'article',
//                 id: "query" + '_yahoo',
//                 title: 'Yahoo',
//                 input_message_content: {
//                     message_text: '32',// + query,
//                 }
//             }]
//         )
//        /*  telegramApi.sendMessage({
//             chat_id:message.from.id,
//             text: "test Inline",
//             reply_markup: JSON.stringify(inlineKeyboard)
//         }).then(console.log).catch(console.log) */
//     }
// })

// telegramApi.on('inline.callback.query', query=>{
//     console.log(query)
// })
var inlineKeyboard = {
    keyboard: [
        [
            {
                text: 'Send To Telegram User',
            },
            {
                text: 'Send to ETH address',
            }
        ],
        [
            {
                text: 'Check Balance',
            }
        ]
    ]
}

// telegramApi.on