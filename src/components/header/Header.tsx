import { Box, Button, Stack, Tooltip } from '@mui/material'
// import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <>
            <Stack spacing={2} direction={'row'} sx={{
                mx:0, my:0, px:'30px', py:'10px', bgcolor:"#79A1D4", textAlign:'center', alignItems:'center',
                display:{xs: 'none', sm: 'flex'}, justifyContent:'space-between'
                }}>
                <Box sx={{ width: 150, height: 'auto'  }}>
                    <img src={logo} alt="ささみまぐろペットクリニック" style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Stack direction={'row'} spacing={2}>
                    <Tooltip title="HOME" arrow>
                        <Button sx={{color: "white"}}>HOME</Button>
                    </Tooltip>
                    <Tooltip title="院長からの挨拶" arrow>
                        <Button sx={{color: "white"}}>院長からの挨拶</Button>
                    </Tooltip>
                    <Tooltip title="診療時間" arrow>
                        <Button sx={{color: "white"}}>診療時間</Button>
                    </Tooltip>
                    <Tooltip title="Web順番予約" arrow>
                        <Button sx={{color: "#454545", backgroundColor: '#eee', borderRadius: '15px'}}>Web順番予約</Button>
                    </Tooltip>
                    <Tooltip title="アクセス" arrow>
                        <Button sx={{color: "white"}}>アクセス</Button>
                    </Tooltip>
                </Stack>
            </Stack>
            <Stack spacing={2} direction={'row'} sx={{
                mx:0, my:0, padding:'10px', bgcolor:"#79A1D4", textAlign:'center', alignItems:'center',
                display:{xs: 'flex', sm: 'none'}, justifyContent:'space-between'
                }}>
                <Box sx={{ width: 150, height: 'auto'  }}>
                    <img src={logo} alt="ささみまぐろペットクリニック" style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{marginRight: '20px'}}>
                    <MenuIcon fontSize='large' />
                </Box>
            </Stack>
        </>
    )
}

export default Header