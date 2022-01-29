import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxNTkyMSwiZXhwIjoxOTU4OTkxOTIxfQ.b4ZDDcz0n_WuPBY__PJ4Lz3pPKSkoSK1twrh0KsUJtw'
const SUPABASE_URL = 'https://mbkhhjsklhiyswdszgix.supabase.co'
const SUPABASE_CLIENT = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    const [message, setMessage] = React.useState('');
    const [messagesList, setMessagesList] = React.useState([]);
    React.useEffect(() => { 
        SUPABASE_CLIENT
            .from('messages')
            .select('*')
            .order('id', {ascending: false})
            .then(({data})=>{
                console.log('dados', data)
                setMessagesList(data)
            }) 
        },[])

    function ButtonSend(){
        return(
            <>
                <button type='button' onClick={
                            () => {
                                handleNewMessage(message)
                            }
                        }>
                    <img src='https://icons.veryicon.com/png/o/object/lucq-backstage/send-out.png' width='50' height='50'/>
                </button>
                <style jsx>{`
                    button{
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
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
            // id: messagesList.length + 1,
            text: newMessage,
            whoSended: 'cecilia-brito'
        }

    SUPABASE_CLIENT
        .from('messages')
        .insert([message])
        .then((data) =>{
            console.log('criando mensagem', data)
            // setMessagesList([
            //     data[0], ...messagesList])
        })

    if(message.text !== ''){
        setMessagesList([message, ...messagesList])
        setMessage('')
    }
        
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
                    borderRadius: '5px',
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
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                <MessageList messages = {messagesList} set={setMessagesList} />

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
                        borderRadius: '5px',
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
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: '#424676',
                                marginRight: '12px',
                                color: 'rgba(255, 255, 255, 0.7)',
                            }}
                        >
                        </TextField>
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
    function DeleteButton(){
        return (
            <div>
                <button onClick={
                 deleteMessage
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

function deleteMessage(){
    console.log('fui clicado')
    if(props.messages !== undefined){
        console.log('fui clicado e mensagens não é undefined')
        props.messages.filter(
         () => {
             if(props.messages.id == event.target.parentElement.parentElement.key){
                const newListMessage = props.messages;
                const index = props.messages.indexOf(newListMessage)
                newListMessage.splice(index)
                event.target.parentElement.parentElement.remove()
                props.set(newListMessage)
                console.log(props.messages)
             }
         }
     )
    }
}
    return (
        <Box
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
                            hover: {
                                backgroundColor: '#161727'
                            },
                            marginBottom: '12px',
                        }}>
                            <Text
                                key= {actualMessage.id}
                                tag="li"
                                styleSheet={{
                                    borderRadius: '5px',
                                    padding: '6px'
                                }}
                            >
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
                                {actualMessage.text}
                                {console.log(actualMessage.text)}
                            </Text>
                            <DeleteButton></DeleteButton>
                     </Box>
                    )
                })
            }
        </Box>
    )
}