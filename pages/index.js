import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from "../config.json";


function GlobalStyle(props){
	return (
		<style global jsx>{`
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			list-style: none;
		  }
		  body {
			font-family: 'Open Sans', sans-serif;
		  }
		  /* App fit Height */ 
		  html, body, #__next {
			min-height: 100vh;
			display: flex;
			flex: 1;
		  }
		  #__next {
			flex: 1;
		  }
		  #__next > * {
			flex: 1;
		  }
		  /* ./App fit Height */ 
		`}</style>
	);
}


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
	const username = 'cecilia-brito';
  
	return (
	  <>
		<GlobalStyle />
		<Box
		  styleSheet={{
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			// backgroundColor: appConfig.theme.colors.primary[500],
			backgroundImage: 'url(https://i.imgur.com/tNAIOA8.png)',
			backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
		  }}
		>
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
			  borderRadius: '5px', padding: '32px', margin: '16px',
			  boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
			  backgroundColor: '#3F4273',
			}}
		  >
			{/* Formulário */}
			<Box
			  as="form"
			  styleSheet={{
				display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
				width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
			  }}
			>
			 <div>
			  		<div className='box-subtitle-title-and-img'>
						<MyTitle tag="h2">Hey Adora!</MyTitle> 
						<Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300], display: 'inline-block', gridArea: 'text2'}}>
							{appConfig.name}
						</Text>
						<img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/75eafe9f-a87c-45fa-b6bb-328c9e7b76f9/deyumur-34eb2502-488a-42a1-9ef3-3eedccf1fc63.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc1ZWFmZTlmLWE4N2MtNDVmYS1iNmJiLTMyOGM5ZTdiNzZmOVwvZGV5dW11ci0zNGViMjUwMi00ODhhLTQyYTEtOWVmMy0zZWVkY2NmMWZjNjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.n59I7aiRrOwTTZZPnXRTrrfXFNTt0sYOQwGugYwdkBM'/>
					</div>
				<style jsx>{`
					.box-subtitle-title-and-img{
						display: grid;
						grid-template-columns: 180px 90px;
						grid-template-rows: 40px 50px;
						grid-template-areas: "text img"
											 "text2 img";
						align-items: center;
					}
					img{
						display: inline; 
						width: 100%; 
						max-width: 100px;
						margin: 10px 0;
					}
				`}</style>
			  </div>

			  <TextField
				fullWidth
				textFieldColors={{
				  neutral: {
					textColor: appConfig.theme.colors.neutrals[200],
					mainColor: appConfig.theme.colors.neutrals[900],
					mainColorHighlight: '#F2C9CC',
					backgroundColor: '#242642',
				  },
				}}
				styleSheet={{
					marginBottom: '8px',
				}}
			  />
			  
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
			  />
			</Box>
			{/* Formulário */}
  
  
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
				borderRadius: '10px',
				flex: 1,
				minHeight: '240px',
			  }}
			>
			  <Image
				styleSheet={{
				  borderRadius: '50%',
				  marginBottom: '16px',
				}}
				src={`https://github.com/${username}.png`}
			  />
			  <Text
				variant="body4"
				styleSheet={{
				  color: appConfig.theme.colors.neutrals[200],
				  backgroundColor: '#161727',
				  padding: '3px 10px',
				  borderRadius: '1000px'
				}}
			  >
				{username}
			  </Text>
			</Box>
			{/* Photo Area */}
		  </Box>
		</Box>
	  </>
	);
  }