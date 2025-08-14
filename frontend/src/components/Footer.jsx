import { Box, Grid, Typography, Link, Divider, useTheme } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';


const socialMedias = [
  { icon: <Facebook />, href: 'https://facebook.com' },
  { icon: <Twitter />, href: 'https://twitter.com' },
  { icon: <Instagram />, href: 'https://instagram.com' }
]

const links = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy' }
]

const Footer = () => {

  return (
    <Box
      sx={{ backgroundColor: '#A47864', color: ' white', py: 5, }} >
      <Box sx={{ px: 2, paddingBottom: 4 }}>
        <Grid container spacing={2}>
          <Grid size={4} paddingLeft={5}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'white' }} >
              BookTown
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              BookTown is the perfect place where you can discover new books, buy the ones you love, and share your thoughts by writing reviews
            </Typography>
          </Grid>


          <Grid size={4} paddingLeft={5}>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'white', textDecoration: 'underline' }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid size={4} paddingLeft={5}>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
              Connect With Us
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              PhoneNo: 0112322123
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
              Email: booktown@gmail.com
            </Typography>
            <Box display="flex" gap={2}>
              {socialMedias.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)', '&:hover': { color: 'white' }
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      <Typography align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)', paddingTop: 4 }}>
        &copy; {new Date().getFullYear()} BookTown. All rights reserved.
      </Typography>

    </Box>
  );
};

export default Footer;