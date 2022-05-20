import * as Mui from "@mui/material";
import CrownImage from 'assets/Icon awesome-crown@2x.png';
import TickImage from 'assets/Icon feather-check_sub@2x.png';
import SubscriptionImage from 'assets/subscription_illustration@2x.png';

const StyledTypography = Mui.styled(Mui.Typography)({
    fontFamily: "Haborosans-normal",
    fontSize: '0.85rem'
});

const ImageContainer = Mui.styled(Mui.Box)({
    width: '100%',
    height: '80%'
});

export const SubscriptionDetails = () => {
    return (
        <Mui.Paper elevation={0} sx={{ p: 2, border: "1px solid #CCBDE9" }}>
            <Mui.List sx={{ p: 0 }}>
                <Mui.ListItem sx={{ p: 0 }}>
                    <Mui.ListItemIcon><Mui.Box width={'50%'} component={'img'} src={CrownImage.src} /></Mui.ListItemIcon>
                    <Mui.ListItemText sx={{ ml: '-1rem', mt: '0.5rem' }} primary={<StyledTypography sx={{ fontWeight: 600, fontSize: '1rem' }}>Business Directory Listing Benefits</StyledTypography>} />
                </Mui.ListItem>
            </Mui.List>
            <Mui.Grid sx={{ mt: '1rem', height: '100%' }} container >
                <Mui.Grid item md={4} xs={12}>
                    <Mui.Box>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Complete business listing information.</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Creating a business landing page-like web design by choosing one of the professionally designed templates.</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Post your products or services at the exclusive Bazaar City section twice a week.</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Promotion at the Homepage section called Shout out!</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item md={4} xs={12}>
                    <Mui.Box>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Bazaar City Live presentation - just book your spot ahead of time.</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                        <Mui.List sx={{ p: 0 }}>
                            <Mui.ListItem sx={{ p: 0 }}>
                                <Mui.ListItemIcon><Mui.Box width={'30%'} component={'img'} src={TickImage.src} /></Mui.ListItemIcon>
                                <Mui.ListItemText sx={{ ml: '-1.8rem', mt: '0.5rem' }} primary={<StyledTypography>Advertising discount of 10% (except for ad spots on HomePage).</StyledTypography>} />
                            </Mui.ListItem>
                        </Mui.List>
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item md={4} xs={12}>
                    <ImageContainer>
                        <Mui.Box sx={{ ml: { md: '3rem', xs: "1rem" } }} component={'img'} src={SubscriptionImage.src} width='80%' height={'100%'} />
                    </ImageContainer>
                </Mui.Grid>
            </Mui.Grid>
        </Mui.Paper>
    );
};
