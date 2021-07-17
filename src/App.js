
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NavBar } from './Components/NavBar';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div">
          <NavBar />
        </Typography>
      </Container>
    </>
  );
}

export default App;

