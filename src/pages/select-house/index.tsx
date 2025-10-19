import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import Header from '../../components/Header';
import useHousesByProvider from '../../hooks/useHousesByProvider';
import {useNavigate, useParams} from 'react-router-dom';
import {CREATE_COMMUNICATION_REQUEST_PATH} from '@routes';

export default function SelectHousePage() {
  const {providerId} = useParams();
  const {data: houses} = useHousesByProvider(providerId || '');
  const navigate = useNavigate();

  const handleSelectHouse = async (houseId: string) => {
    localStorage.setItem('houseId', houseId);
    navigate(CREATE_COMMUNICATION_REQUEST_PATH);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f6f0',
      }}
    >
      <Header title="Selecionar Casa" />

      <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: 960,
          px: 2,
          py: 4,
        }}
      >
        {houses?.map((house: any) => (
          <Grid key={house.id} size={{xs: 12, sm: 6, md: 4}}>
            <Card
              onClick={() => handleSelectHouse(house.id)}
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: '#fff',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea sx={{height: '100%'}}>
                <CardContent
                  sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}
                >
                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <HomeRoundedIcon color="primary" />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary.dark"
                    >
                      {house.name}
                    </Typography>
                  </Box>

                  <Divider sx={{my: 1}} />

                  <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <LocationOnRoundedIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {house.address}
                    </Typography>
                  </Box>

                  {house.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1.5,
                        fontStyle: 'italic',
                      }}
                    >
                      {house.description}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
