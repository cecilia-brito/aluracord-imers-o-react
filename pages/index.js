import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json";
import React, { useContext } from 'react'
import { useRouter} from 'next/router'
import services from '../src/services'
import { context } from '../src/context';

function MyTitle(props) {
	const Tag = props.tag || 'h1';
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx>{`
			  ${Tag} {
				  color: ${appConfig.theme.colors.neutrals['000']};
				  font-size: 24px;
				  font-weight: 600;
				  display: inline-block;
				  grid-area: text;
			  }
		`}</style>
		</>
	);
}

export default function HomePage() {

	const ctx =  useContext(context);
	const ctxFriends = useContext(context)
	const [username, setUsername] = React.useState('Adora?');
	const routering = useRouter() 
	const [visibilityBox, setVisibilityBox] = React.useState('none');
	const [infoFriends, setInfoFriends] = React.useState({img_friends: ['', '', ''], link_friends: ['','',''], login_friends: ['', '', '']})
	console.log(infoFriends)
	const [visible, setVisible] = React.useState('hidden')
	const [link, setLink] = React.useState(`https://64.media.tumblr.com/3e5489aa15d4dbe40d3b3eace94b5747/fc1cee0b79687753-53/s1280x1920/0d305a36f63d4404dfdd574cc9b61d04c1ec5271.jpg`)

	async function getUserData(){
		console.log('fui clicado')
		console.log('api:', services)
		try{
			const response_user = await services.get(`/${username}`)
			const response_user_followers = await services.get(`/${username}/followers`)
			ctx.setUserData(response_user.data)
			ctxFriends.setUserFriends(response_user_followers.data)
			console.log(ctxFriends)
			console.log(ctx.userData)
			if(ctx.userData.followers == 0 || ctx.userData.followers== undefined || ctx.userData.followers == ''){
				setVisibilityBox('none')
			} else{
				setVisibilityBox('block')
				sorteioDasImagensFriends()
			}
		}catch(err){
			console.log(err)
		}
	}

	function sorteioDasImagensFriends(){
		const indexs = []

		for(let i = 0; i <= 2; i++){
			indexs.push(parseInt(Math.random() * 30))
			while(indexs[i] == indexs[i-1]){
				indexs[i] = (parseInt(Math.random() * 30))
			}
		}

		console.log(indexs)
		setInfoFriends(
			{	
				login_friends: [ctxFriends.userFriends[indexs[0]]?.login, ctxFriends.userFriends[indexs[1]]?.login, ctxFriends.userFriends[indexs[2]]?.login],
				img_friends: [`https://github.com/${ctxFriends.userFriends[indexs[0]]?.login}.png`,`https://github.com/${ctxFriends.userFriends[indexs[1]]?.login}.png`,`https://github.com/${ctxFriends.userFriends[indexs[2]]?.login}.png`],
				link_friends: [`https://github.com/${ctxFriends.userFriends[indexs[0]]?.login}`, `https://github.com/${ctxFriends.userFriends[indexs[1]]?.login}`, `https://github.com/${ctxFriends.userFriends[indexs[2]]?.login}`]
			}
		)

		console.log(infoFriends)
	}

	function SectionInfoUser(props){
		return(
			<>
				<div className='box'>
					<span>
						<p>Repos</p>
						<a href={`https://github.com/${username}?tab=repositories`}>{props.repos}</a>
					</span>
					<span>
						<p>Followers</p>
						<a href={`https://github.com/${username}?tab=followers`}>{props.followers}</a>
					</span>
					<span>
						<p>Followings</p>
						<a href={`https://github.com/${username}?tab=following`}>{props.following}</a>
					</span>
				</div>
				<style jsx>{`
					.box{
						margin: auto;
						width: 160px;
						display: flex;
						justify-content: space-between;
						align-itens: center;
						text-align: center;
						color: rgba(242, 201, 204, .9);
					}
					span p{
						font-size: 10px;
						font-weight: 600;
						opacity: 60%;
					}

					span a{
						text-decoration: none;
						font-size: 14px;
						font-weight: 600;
						opacity: 60%;
						color: white;
						text-align: center;
					}
				`}</style>
			</>
		)
	}

	function SetInvalidUserName(props) {
		return (
			<span>
				<p>Nome de usuário inválido, não é possível buscar a foto</p>
				<style jsx>{`
					p{
						font-family: sans-serif;
						font-size: 10.5px;
						visibility: ${props.visible};
						color: red;
						margin: 2px auto;
						opacity: 80%;
					}
				`}</style>
			</span>
		)
	}

	function ButtonSend(props){
		return(
			<>
				<span>
					<button type='button' onClick={getUserData}>{props.text}</button>
					<style jsx>{`
						button{
							border: none;
							background: transparent;
							cursor: pointer;
							padding: 5px;
							font-size: 24px;
						} 
						button:hover{
							transform: scale(1.2);
							opacity: 70%;
						}
					`}</style>
				</span>
			</>
		)
	}

	function SmallBox(props){
		return(
		<div className='smallBox'>
			<img src={props.image}/>
		<style jsx>{`
			.smallBox{
				width: 110px;
				height: 85px;
				border-radius: 20px;
				box-shadow: 0 2px 10px 0 rgba(36, 38, 66, 0.2);
				border-left: solid 4px rgba(242, 201, 204, .7);
				border-right: solid 4px rgba(242, 201, 204, .7);
				margin: 0 auto 10px auto;
				display: ${props.visibility};
			}

			.smallBox img{
				width: 102px;
				height: 85px;
				border-radius: 20px;
			}

		`}</style>
		</div>
		)
	}

	return (
		<>
			<Box
				styleSheet={{
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					backgroundImage: 'url(https://i.imgur.com/tNAIOA8.png)',
					backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundBlendMode: 'multiply',
				}}
			>
				<Box styleSheet={{display:'flex', alighItems:'center', display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: {
								xs: 'column',
								sm: 'row',
							},
							}}>
					<Box
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: {
								xs: 'column',
								sm: 'row',
							},
							width: '100%', maxWidth: '600px',
							borderRadius: '20px', padding: '32px', margin: '16px',
							boxShadow: '0 2px 10px 0 rgb(36, 38, 66 / 20%)',
							backgroundColor: '#3F4273',
							gridArea: 'box'
						}}
					>
						{/* Formulário */}
						<Box
							as="form"
							onSubmit={
								function clicked(event) {
									console.log('fui clicado')
									event.preventDefault()
									//mudando de página
									routering.push('/chat')
								}
							}
							styleSheet={{
								display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
								width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
							}}
						>
							<div>
								<div className='box-subtitle-title-and-img'>
									<MyTitle tag="h2">Hey Adora!</MyTitle>
									<Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], display: 'inline-block', gridArea: 'text2' }}>
										{appConfig.name}
									</Text>
									<img className='img-catra' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75eafe9f-a87c-45fa-b6bb-328c9e7b76f9/deyumur-e1981004-b918-4d23-a31a-2d100890d99e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc1ZWFmZTlmLWE4N2MtNDVmYS1iNmJiLTMyOGM5ZTdiNzZmOVwvZGV5dW11ci1lMTk4MTAwNC1iOTE4LTRkMjMtYTMxYS0yZDEwMDg5MGQ5OWUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VDKWvXzTLceHc_32HT_0gfKyB2t-eiSB5A7HML04cVs' />
								</div>
							</div>
							<div className='box-input'>
								<TextField 
								fullWidth
								placeholder='Type use, click on search'
									textFieldColors={{
										neutral: {
											textColor: appConfig.theme.colors.neutrals[200],
											mainColor: appConfig.theme.colors.neutrals[900],
											mainColorHighlight: '#F2C9CC',
											backgroundColor: '#242642',
										},
									}}
									styleSheet={{
										display:'flex',
										margin: 'auto',
										padding: '11px',
									}}
									onChange={function changeWhatItWasTyped(event) {
										const newInput = event.target.value
										if (newInput.length >= 2) {
											setUsername(newInput)
											setVisible('hidden')
											setLink(`https://github.com/${newInput}.png`)
											if(ctx.userData.followers == 0){
												setVisibilityBox('none')
											} else{
												setVisibilityBox('visible')
											}
										} else {
											setUsername('')
											setVisibilityBox('none')
											setVisible('visible')
											setLink('https://i.pinimg.com/originals/d3/82/6a/d3826a943b0d3a9d54ec3d3cba01d0ef.png')
											setInfoFriends({img_friends: ['https://i.pinimg.com/originals/d3/82/6a/d3826a943b0d3a9d54ec3d3cba01d0ef.png', 'https://i.pinimg.com/originals/d3/82/6a/d3826a943b0d3a9d54ec3d3cba01d0ef.png', 'https://i.pinimg.com/originals/d3/82/6a/d3826a943b0d3a9d54ec3d3cba01d0ef.png'], link_friends: ['', '', ''], login_friends: ['', '', '']})
										}
										console.log('visibility', visibilityBox)
									}
									}
								>	
								</TextField>
								<ButtonSend text='🔎'></ButtonSend>
							</div>
							<SetInvalidUserName visible={visible}></SetInvalidUserName>
							<Button
								type='submit'
								label='Entrar'
								fullWidth
								buttonColors={{
									contrastColor: appConfig.theme.colors.neutrals["000"],
									mainColor: '#2947A3',
									mainColorLight: appConfig.theme.colors.primary[400],
									mainColorStrong: '#101D41',
								}}
								styleSheet={{
									borderRadius: '15px',
									border: 'solid 2px rgb(36, 38, 66 / 20%)'
								}}
							/>
						</Box>

						{/* Photo Area */}
						<Box
							styleSheet={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								maxWidth: '200px',
								padding: '16px',
								backgroundColor: '#242642',
								border: '1px solid',
								borderColor: appConfig.theme.colors.neutrals[999],
								borderRadius: '20px',
								flex: 1,
								minHeight: '240px',
							}}
						>
							<Text
								variant="body4"
								styleSheet={{
									color: appConfig.theme.colors.neutrals[200],
									backgroundColor: '#161727',
									padding: '3px 10px',
									borderRadius: '1000px',
									marginBottom: '20px'
								}}
							>
								{username}
							</Text>
							<a href={`https://github.com/${username}`}><Image
								styleSheet={{
									borderRadius: '50%',
									marginBottom: '16px',
								}}
								src={link}
							/></a>
							<Box>
								<SectionInfoUser followers={ctx.userData?.followers} following={ctx.userData?.following } repos={ctx.userData?.public_repos}></SectionInfoUser>
							</Box>
						</Box>
					</Box>
					<Box styleSheet={{display: visibilityBox,maxWidth:'165px', maxHeight:'350px', width:'100%', height:'100%', backgroundColor: 'rgba(63, 66, 115, 0.9)', borderRadius: '20px'}}>
							<Box styleSheet={{display: 'flex', alignItems: 'center'}}>
								<Text styleSheet={{ color: 'white', fontSize: '20px', textAlign: 'center', marginLeft: '5px', marginRight: '10px', fontWeight:'600'}}>Friends</Text>
								<Image src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75eafe9f-a87c-45fa-b6bb-328c9e7b76f9/deyz32k-b7cccebd-be45-4423-8b80-b08287369d20.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc1ZWFmZTlmLWE4N2MtNDVmYS1iNmJiLTMyOGM5ZTdiNzZmOVwvZGV5ejMyay1iN2NjY2ViZC1iZTQ1LTQ0MjMtOGI4MC1iMDgyODczNjlkMjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5FXcf4DSnuSyfDluwZ2GRxh_qZ7Nw-Uooa8af4OKsaQ' width='65' height='55' />
							</Box>
							<Box >
								<a href={infoFriends.link_friends[0]} ><SmallBox image={infoFriends.img_friends[0]} visibility='block'></SmallBox></a>
								<a href={infoFriends.link_friends[1]} ><SmallBox image={infoFriends.img_friends[1]}  visibility='block'></SmallBox></a>
								<a href={infoFriends.link_friends[2]} ><SmallBox image={infoFriends.img_friends[2]}  visibility='block'></SmallBox></a>
							</Box>
					</Box>
			</Box>
		</Box>
		<style jsx>{`
			.box-input{
				background-color: #242642;
				display:flex;
				align-items:center;
				border-radius: 5px;
				justify-content:space-between;
				max-height: 40px;
				max-width: 268px;
				height: 100%;
				width: 100%;
			}
			.box-subtitle-title-and-img{
				display: grid;
				grid-template-columns: 180px 100px;
				grid-template-rows: 50px 50px;
				grid-template-areas: "text img"
									"text2 img";
				align-items: center;
			}
			.img-catra{
				display: inline; 
				width: 100%; 
				max-width: 70px;
				margin-top: 20px;
			}
		`}</style>
		</>
	);
}