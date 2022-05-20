import * as Mui from '@mui/material';

const Container = Mui.styled(Mui.Box)({
    width:'100%',
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
})

export const Loader = () => {
    return (
        <Container>
            <Mui.CircularProgress color={'primary'} />
        </Container>
    )
}