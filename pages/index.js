import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json";
import React, { useContext } from 'react'
import { useRouter} from 'next/router'
import api from '../src/services'
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
	const [isValidUser, setValidUser] = React.useState(false)
	const ctx =  useContext(context);
	const [username, setUsername] = React.useState('Adora?');
	const routering = useRouter() 
	const [visibilityBox, setVisibilityBox] = React.useState('none');
	const [infoFriends, setInfoFriends] = React.useState({img_friends: ['', '', ''], link_friends: ['','',''], login_friends: ['', '', '']})
	const [visible, setVisible] = React.useState('none')
	const [link, setLink] = React.useState(`https://64.media.tumblr.com/3e5489aa15d4dbe40d3b3eace94b5747/fc1cee0b79687753-53/s1280x1920/0d305a36f63d4404dfdd574cc9b61d04c1ec5271.jpg`)
	
	async function getUserData(){
		console.log('username',username)
			let value;
			try{
			const response_user = await api.get(`/${username}`)
			ctx.setUserData(response_user.data)
			ctx.setUserData((actualvalue) =>{ 
				value = actualvalue
				return actualvalue})
			console.log('dados do usuario no inicio', ctx.userData)
			if(value.message !== undefined){
				setValidUser(false)
				setVisible('visible')
				setVisibilityBox('none')
			} else{
				setValidUser(true)
				console.log('ctxuser: ', ctx.userData)
			}
			console.log('dados do usuario no final ', ctx.userData)
			}catch(error){
				console.log(error)
			setVisible('block')
			setVisibilityBox('none')
			return
			}
	}

	async function getUserFriends(){
		console.log('username',username)
		try{
			const response_user_followers = await api.get(`/${username}/followers`)
			ctx.setUserFriends(response_user_followers.data)
			console.log('dados userFriends no inio', response_user_followers.data)
				if(ctx.userData.followers === 0 || ctx.userFriends.message !== undefined){
					setVisible('block')
					setVisibilityBox('none')
				} else{
					sorteioDasImagensFriends(response_user_followers.data)
					console.log(ctx.userFriends)
					setVisibilityBox('block')
				}
			console.log('dados dos amigos no final', ctx.userFriends)
			console.log('get user friends rodou')
		} catch(error){
			console.log(error)
			setVisible('block')
			setVisibilityBox('none')
			return
		}
	}

	function sorteioDasImagensFriends(value){
		const indexs = []

		for(let i = 0; i <= 2; i++){
			indexs.push(parseInt(Math.random() * 30))
			while(indexs[i] == indexs[i-1] || indexs[i] == indexs[i+1])
			indexs[i] = (parseInt(Math.random() * 30))
		}
		
		setInfoFriends(
			{	
				img_friends: [`https://github.com/${value[indexs[0]]?.login}.png`,`https://github.com/${value[indexs[1]]?.login}.png`,`https://github.com/${value[indexs[2]]?.login}.png`],
				link_friends: [`https://github.com/${value[indexs[0]]?.login}`, `https://github.com/${value[indexs[1]]?.login}`, `https://github.com/${value[indexs[2]]?.login}`]
			}
		)
		console.log('objeto com as imagens e links depois da função de sorteio',infoFriends)
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
				<p>Invalid username, cant't find photo</p>
				<style jsx>{`
					p{
						display: ${props.visible};
						font-family: sans-serif;
						font-size: 10.5px;
						color: red;
						margin: 2px auto;
						opacity: 80%;
					}
				`}</style>
			</span>
		)
	}

	function ButtonSearch(props){
		return(
			<>
				<span>
					<button type='button' className='button_serch' onClick={
																				() =>{	
																					getUserData()
																					getUserFriends()
																				}
																			}
					>
						{props.text}
					</button>
					<style jsx>{`
						.button_serch{
							border: none;
							background: transparent;
							cursor: pointer;
							padding: 5px;
							font-size: 24px;
						} 
						.button_serch:hover{
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
				max-width: 80%;
				height: 85.5px;
				border-radius: 20px;
				box-shadow: 0 2px 10px 0 rgba(36, 38, 66, 0.2);
				border-left: solid 4px rgba(242, 201, 204, .7);
				border-right: solid 4px rgba(242, 201, 204, .7);
				margin: 0 auto 10px auto;
				display: ${props.visibility};
			}

			.smallBox img{
				width: 100%;
				height: 100%;
				border-radius: 20px;
			}
			@media (max-width: 600px){
				.smallBox{
					max-width: 70px;
					display: inline-block;
					margin:0 20px
				}

				.smallBox img{
					max-width: 65px
				}
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
					backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'
				}}
			>
					<Box styleSheet={{display:'flex', alignItems:'center',
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
										routering.push(`/chat?username=${username}`)
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
											
											if (newInput.length >= 2)  {
												setUsername(newInput)
												setVisible('none')
												setLink(`https://github.com/${newInput}.png`)
											} else {
												setValidUser(false)
												setUsername('')
												setVisibilityBox('none')
												setVisible('block')
												setLink('https://i.pinimg.com/originals/d3/82/6a/d3826a943b0d3a9d54ec3d3cba01d0ef.png')
											}
										}
										}
									>	
									</TextField>
									<ButtonSearch text='🔎'></ButtonSearch>
								</div>
								{isValidUser === false ? <SetInvalidUserName visible={visible}></SetInvalidUserName> : ''}
								{isValidUser === false ?
									<Button
										type='submit'
										label='Entrar'
										fullWidth
										disabled
										buttonColors={{
											contrastColor: appConfig.theme.colors.neutrals["000"],
											mainColor: '#2947A3',
											mainColorLight: appConfig.theme.colors.primary[400],
											mainColorStrong: '#101D41',
										}}
										styleSheet={{
											borderRadius: '15px',
											border: 'solid 2px rgb(36, 38, 66 / 20%)',
											maxWidth: '240px',
											width: '100%'
										}}
									/>
									:
									<Button
										type='submit'
										label='Sign In'
										fullWidth
										buttonColors={{
											contrastColor: appConfig.theme.colors.neutrals["000"],
											mainColor: '#2947A3',
											mainColorLight: appConfig.theme.colors.primary[400],
											mainColorStrong: '#101D41',
										}}
										styleSheet={{
											borderRadius: '15px',
											border: 'solid 2px rgb(36, 38, 66 / 20%)',
											maxWidth: '240px',
											width: '100%'
										}}
									/>
								}
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
						<Box styleSheet={{display: visibilityBox, backgroundColor: 'rgba(63, 66, 115, 1)', borderRadius: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
									width: { xs: '100%', sm: '50%' }}}>
								<Box styleSheet={{display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent:'center'}}>
									<Text styleSheet={{ color: 'white', fontSize: '20px', textAlign: 'center', marginLeft: '5px', marginRight: '10px', fontWeight:'600'}}>Friends</Text>
									<Image src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75eafe9f-a87c-45fa-b6bb-328c9e7b76f9/deyz32k-b7cccebd-be45-4423-8b80-b08287369d20.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc1ZWFmZTlmLWE4N2MtNDVmYS1iNmJiLTMyOGM5ZTdiNzZmOVwvZGV5ejMyay1iN2NjY2ViZC1iZTQ1LTQ0MjMtOGI4MC1iMDgyODczNjlkMjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5FXcf4DSnuSyfDluwZ2GRxh_qZ7Nw-Uooa8af4OKsaQ' width='65' height='55' />
								</Box>
								<Box className='box-friends'>
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
				max-width: 235px;
				height: 100%;
				width: 100%;
				margin-bottom: 20px;
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