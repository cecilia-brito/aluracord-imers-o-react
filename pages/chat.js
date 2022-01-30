import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient} from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import {ButtonSendSticker} from '../src/components/stickers'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxNTkyMSwiZXhwIjoxOTU4OTkxOTIxfQ.b4ZDDcz0n_WuPBY__PJ4Lz3pPKSkoSK1twrh0KsUJtw'
const SUPABASE_URL = 'https://mbkhhjsklhiyswdszgix.supabase.co'
const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function deleteMessageOnDatabase(id){
    try{
        // console.log(messagesList.indexOf(id))
        // indexMessageDelete = messagesList.indexOf(id)
        const whatDelete = 
            await SUPABASE_CLIENT
                .from('messages')
                .delete().match({id: id})
        ;
    console.log('funcionou!')
    console.log(whatDelete)

    } catch(error){
        console.log('erro: ', error)
    }
    
 }

function listennerAddMessagesInRealTime(addMessage){
    return SUPABASE_CLIENT
            .from('messages')
            .on('INSERT', (dataOnDatabase) => {
                    console.log('o que veio, listenner', dataOnDatabase)
                    console.log('new', dataOnDatabase.new)
                    addMessage(dataOnDatabase.new)
                }
            ).subscribe()
}

function listennerRemoveMessagesInRealTime(removeMessage){
    return (
        SUPABASE_CLIENT
            .from('messages')
            .on('DELETE', (data) => {
                    console.log(data.new)
                    removeMessage(data.new)
                }
            )
            .subscribe()
    )
}

export default function ChatPage() {
    const userLogged = useRouter().query.username
    const [message, setMessage] = React.useState('');
    const [messagesList, setMessagesList] = React.useState([]);
    const [visibilityLoading, setVisibilityLoading] = React.useState('flex');

    React.useEffect(() => { 
        SUPABASE_CLIENT
            .from('messages')
            .select('*')
            .order('id', {ascending: false})
            .then(({data})=>{
                console.log('dados', data)
                setMessagesList(data)
            });

            listennerAddMessagesInRealTime(
                (newMessage) => {
                    console.log('novamensagem')
                    console.log('lista de mensagens', messagesList)
                    setMessagesList(
                        (actualValueList) => {
                            return [newMessage, ...actualValueList]
                        }
                    );
                }
            ); 
    }, []);

    // React.useEffect(() => {
    //     SUPABASE_CLIENT
    //         .from('messages')
    //         .select('*')
    //         .order('id', {ascending: false})
    //         .then(({data})=>{
    //             console.log('dados', data)
    //             setMessagesList(data)
    //         });

    //     listennerRemoveMessagesInRealTime((deleteMessage) => {
    //         const newListMessage = messagesList;
    //         console.log('new list message', newListMessage)
    //         const index = messagesList.indexOf(deleteMessage)
    //         console.log('index: ', index)
    //         // console.log(`new list message[${i}]: ${newListMessage[i]}`)
    //         newListMessage.splice(index)
    //         console.log('new list de message depois do slice:', newListMessage)
    //         setMessagesList(newListMessage)
    //     })
    // }, []);

    function LoadingChat(props){
        setTimeout(() =>{
            setVisibilityLoading('none')
        }, 6000)
            return(
                <>
                    <div className='box'>
                            <div className='box-img-text'>
                                <div className='box-text'>
                                    <h4>Estamos carregando o coração de etéria, aguarde</h4>
                                </div>
                                <div className='box-img'>
                                <   img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75eafe9f-a87c-45fa-b6bb-328c9e7b76f9/dez0ntn-bd3a805f-5b7a-4fc2-ae48-8779319b4e0b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc1ZWFmZTlmLWE4N2MtNDVmYS1iNmJiLTMyOGM5ZTdiNzZmOVwvZGV6MG50bi1iZDNhODA1Zi01YjdhLTRmYzItYWU0OC04Nzc5MzE5YjRlMGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mxNGTGzkb8VBmMvVkRYVzDbDRIKUzq6aVGsDZDTkvkw' width='20' height='80'/>
                                </div>
                            </div>
                    </div>
                    <style jsx>{`
                        .box{
                            width: 100%;
                            height: 100%;
                            background-color: #242642; 
                            z-index: 1000;
                            position: absolute
                            margin: auto;
                            text-align: center;
                            display: ${props.visible};
                            align-items: center;
                            justify-content: center;
                        }

                        .box-text{
                            display:block
                            color: white;
                        }
                        .box-img-text{
                            width: 200px;
                            font-size: 12px;
                            font-weight: 600;
                            opacity: 60%;
                        }

                        @keyframes sword{
                            from{
                                transform: rotate(0deg);
                            } to{
                                transform: rotate(360deg)
                            }
                        }

                        img{
                            margin: 10px auto;
                            filter: grayscale(50%);
                            animation-name: sword;
                            animation-duration: 6s;
                            animation-delay: 0.5s
                        }
                    `}</style>
                </>
            )
    }

    function ButtonSend(){
        return(
            <>
                <button type='button' onClick={
                            () => {
                                handleNewMessage(message)
                            }
                        }>
                    <img src='https://icons.veryicon.com/png/o/object/lucq-backstage/send-out.png' width='40' height='40'/>
                </button>
                <style jsx>{`
                    button{
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        margin-bottom: 8px;
                        margin-right: 10px;
                        transition: 0.05s all;
                    }
                    button:hover{
                        transform: scale(1.05);
                        opacity: 70%;
                    }
                    button img{
                        filter: invert(100%);
                        opacity: 90%;
                    }
		        `}</style>
            </>
        )
    }

    function handleNewMessage(newMessage) {
        const message = {
            text: newMessage,
            whoSended: userLogged
        }

        SUPABASE_CLIENT
            .from('messages')
            .insert([message])
            .then(({data}) =>{ 
                console.log('criando mensagem', data)
            })

        // if(message.text !== ''){
        //     setMessagesList([message, ...messagesList])
            setMessage('')
        // }
        
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://i.imgur.com/tNAIOA8.png)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '20px',
                    backgroundColor: '#161727',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: '#242642',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        padding: '16px',
                    }}
                >
                  <LoadingChat visible={visibilityLoading}></LoadingChat>
                <MessageList userLogged={userLogged} messages ={messagesList} set={setMessagesList} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                    <Box styleSheet={{
                        backgroundColor: '#424676',
                        width: '100%',
                        display: 'flex',
                        borderRadius: '20px',
                        padding: '2px'
                    }}>
                        <TextField
                            value = {message}
                            onChange={
                                function changeMessage(event) {
                                    const value = event.target.value
                                    setMessage(value)
                                }
                            }
                            onKeyPress={
                                (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault()
                                        handleNewMessage(message)
                                    }
                                }
                            }
                            placeholder="Insira sua messagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '20px',
                                padding: '6px 8px',
                                backgroundColor: '#424676',
                                marginRight: '12px',
                                color: 'rgba(255, 255, 255, 0.7)',
                            }}
                        >
                        </TextField>
                        <ButtonSendSticker onStickerClick={
                            (sticker) => {
                                handleNewMessage(':sticker:'+ sticker)
                            }
                        }/>
                        <ButtonSend></ButtonSend>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    const [isHover, setIsHover] = React.useState(false)

    function DeleteButton(actualMessage){    
        return (
            <div>
                {/* deleta a mensagem no front-end */}
                <button onClick={   
                    (event) => {
                        let i  = 0
                                props.messages.map(
                                    () => {
                                        if(props.messages[i].id == actualMessage.id){
                                            console.log('uhuuuu!') 
                                            if(props.messages.lenght > 1){
                                                deleteMessageOnDatabase(props.messages[i].id)  
                                            } else{
                                                console.log(props.messages[i])
                                                console.log(props.messages[i].id)
                                                deleteMessageOnDatabase(props.messages[i].id)  
                                            }
                                            const newListMessage = props.messages;
                                            console.log('new list message', newListMessage)
                                            const index = props.messages.indexOf(newListMessage[i])
                                            console.log('index: ', index)
                                            console.log(`new list message[${i}]: ${newListMessage[i]}`)
                                            newListMessage.splice(index)
                                            console.log('new list de message depois do slice:', newListMessage)
                                            event.target.parentElement.parentElement.remove()
                                            props.set(newListMessage)
                                        }    
                                        i++
                                    }
                                )
                            }
                        }> 
                    x
                </button>
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');
                    div{
                        display: inline-block;
                        margin: 10px;
                    }
                    button{
                        border: none;
                        background: transparent;
                        font-family: 'Dongle', sans-serif;
                        color: rgba(255, 255, 255, 0.5);
                        font-size: 32px;
                        display: inline-block;
                    }
                    button:hover{
                        transform: scale(1.2);
                    }
                `}</style>
            </div>
        )
        
}

    return (
        <Box className='big-box'
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >

            {props.messages.map(
                (actualMessage) => {
                    return (
                        <Box styleSheet={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            borderRadius: '5px',
                            hover: {
                                backgroundColor: '#161727'
                            },
                            marginBottom: '12px',
                        }} onMouseEnter ={ () => { setIsHover(true)} }
                            onMouseLeave = {() => {setIsHover(false)}}
                        >
                            <Text
                                key = {actualMessage.id}
                                tag="li"
                                styleSheet={{
                                    borderRadius: '5px',
                                    padding: '6px'
                                }}
                            >
                                <a href={`https://github.com/${actualMessage.whoSended}`}>
                                    <Box
                                        styleSheet={{
                                            marginBottom: '8px',
                                        }}
                                    >
                                    <div>
                                        <Image
                                            styleSheet={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                marginRight: '8px',
                                            }}
                                            src={`https://github.com/${actualMessage.whoSended}.png`}
                                        />
                                        <Text tag="strong" styleSheet={{
                                            display: 'inline-block'
                                        }}>
                                            {actualMessage.whoSended}
                                        </Text>
                                        <Text
                                            styleSheet={{
                                                fontSize: '10px',
                                                marginLeft: '8px',
                                                color: appConfig.theme.colors.neutrals[300],
                                                display: 'inline-block'
                                            }}
                                            tag="span"
                                        >
                                            {(new Date().toLocaleDateString() + ' - ' + new Date().getHours() + ' : ' + new Date().getMinutes())}
                                        </Text>
                                    </div>
                                    </Box>
                                </a>

                                {actualMessage.text.startsWith(':sticker:') 
                                ?
                                (
                                    <Image src={actualMessage.text.replace(':sticker:', '')} styleSheet={{
                                        maxWidth:'200px', width: '100%'
                                    }}></Image>
                                ):
                                   
                                actualMessage.text}
                            </Text>
                        {actualMessage.whoSended === props.userLogged && isHover ? 
                        <DeleteButton id={actualMessage.id}></DeleteButton>
                        : '' }
                     </Box>
                    )
                })
            }
            <style jsx>{`
                a, a:visited, a:hover, a:active{
                    color: white;
                }
            `}</style>
        </Box>
    )
}